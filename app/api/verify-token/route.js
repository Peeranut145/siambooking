import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import bcrypt from 'bcryptjs';
import CountModel from "@/models/count";
import crypto from "crypto";
import emailjs from '@emailjs/browser'

export async function POST(req) {
    
    try {
        const { token } = await req.json(); //ประกาศค่าตัวแปล โดย รับค่าจาก req ที่ยิงมาเป็นไฟลื json
        
   

        await connectMongoDB();
        const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

       
        const user = await User.findOne({ 
            resetToken: hashedToken,
            resetTokenExpiry: { $gt: Date.now()}
         });
        if ( !user ){
            return NextResponse.json({ message: "Invalid Token." }, { status: 201 });
        }
      
 }
    catch (error) {
        return NextResponse.json({ message: "An error occured while registrating the user" }, { status: 500 });
    }
}
