import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import bcrypt from 'bcryptjs';
import CountModel from "@/models/count";
import crypto from "crypto";
import emailjs from '@emailjs/browser'

export async function POST(req) {
    
    try {
        const { password , email} = await req.json(); //ประกาศค่าตัวแปล โดย รับค่าจาก req ที่ยิงมาเป็นไฟลื json
        
        const hashedPassword = await bcrypt.hash(password, 10);
        
        await connectMongoDB();
       
       
        const user = await User.findOne({ password });
        if ( !user ){
            return NextResponse.json({ message: "Email Don't exist." }, { status: 201 });
        }
        console.log(user);
        user.password = hashedPassword;
        user.resetToken = undefined;
        user.resetTokenExpiry =  undefined;
    
       
       await   user.save();
         return NextResponse.json({ message: "User registered." }, { status: 201 });
    }
    catch (error) {
        return NextResponse.json({ message: "An error occured while registrating the user" }, { status: 500 });
    }
}
