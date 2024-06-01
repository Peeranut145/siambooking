
import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import bcrypt from 'bcryptjs';
import CountModel from "@/models/count";
import crypto from "crypto";
import emailjs from '@emailjs/browser'
import {useRouter} from 'next/navigation'

export async function POST(req) {
    
    try {
        const { email } = await req.json(); //ประกาศค่าตัวแปล โดย รับค่าจาก req ที่ยิงมาเป็นไฟลื json
        
   

        await connectMongoDB();
        
       
        const existUser = await User.findOne({ email })
        if ( !existUser ){
            return NextResponse.json({ message: "Email Don't exist." }, { status: 201 });
        }
      
        existUser.resetToken = crypto.randomBytes(20).toString("hex");
        existUser.resetTokenExpiry =  Date.now() + 3600000;
       

       
        
        await   existUser.save();
        console.log(existUser.resetToken);
        // const reToken = await User.findOne({email}).select(resetToken);
        // if(!reToken){
        //     return NextResponse.json({message: "Token error" }, {status: 201});
        // }
        // console.log(reToken);
        // const user = await User.findOne({ email }).select("resetToken");
        // console.log("User", user);
 
   
    
     
         return NextResponse.json({ existUser }, { status: 201 });
         
    }
    catch (error) {
        existUser.resetToken = undefined;
        existUser.resetTokenExpiry =  undefined;
        await existUser.save();
        
        return NextResponse.json({ message: "An error occured while registrating the user" }, { status: 500 });
    }
}
