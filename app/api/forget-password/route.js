import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import bcrypt from 'bcryptjs';
import CountModel from "@/models/count";
import crypto from "crypto";
import emailjs from '@emailjs/browser'

export async function POST(req) {
    
    try {
        const { email , resetToken} = await req.json(); //ประกาศค่าตัวแปล โดย รับค่าจาก req ที่ยิงมาเป็นไฟลื json
        
   

        await connectMongoDB();
        
        const reToken = await User.findOne({email}).select(resetToken);
        if(!reToken){
            return NextResponse.json({message: "Token error" }, {status: 201});
        }

        const user = await User.findOne({ email }).select("_id");
        console.log("User", user);

        

       
        const existingUser = await User.findOne({ email });
        if ( !existingUser ){
            return NextResponse.json({ message: "Email Don't exist." }, { status: 201 });
        }
        existingUser.resetToken = crypto.randomBytes(20).toString("hex");
        existingUser.resetTokenExpiry =  Date.now() + 3600000;
        console.log(existingUser);


       
        const resetUrl = `https://siambooking.vercel.app/reset-password/${existingUser.resetToken}`;
        console.log(resetUrl);
      

         await   existingUser.save();
         
       
    
     
         return NextResponse.json({ message: "User registered.", user }, { status: 201 });
         
    }
    catch (error) {
        existingUser.resetToken = undefined;
        existingUser.resetTokenExpiry =  undefined;
        await existingUser.save();
        
        return NextResponse.json({ message: "An error occured while registrating the user" }, { status: 500 });
    }
}
