import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import bcrypt from 'bcryptjs';
import CountModel from "@/models/count";
import crypto from "crypto";


export async function POST(req) {
    
    try {
        const { email } = await req.json(); //ประกาศค่าตัวแปล โดย รับค่าจาก req ที่ยิงมาเป็นไฟลื json
        
   

        await connectMongoDB();
       
       
        const existingUser = await User.findOne({ email }).select("email");
        if ( !existingUser ){
            return NextResponse.json({ message: "Email Don't exist." }, { status: 201 });
        }

        console.log(existingUser);
        const resetToken = crypto.randomBytes(20).toString("hex");
        const passwordResetToken = crypto
            .createHash("sha256")
            .update(resetToken)
            .digest("hex")

        const passwordResetExpires = Data.new() + 3600000;

        existingUser.resetToken = passwordResetToken;
        existingUser.resetTokenExpiry = passwordResetExpires;
        const resetUrl = 'localhost:3000/reset-password/${resetToken}';

        console.log(resetUrl);
        return NextResponse.json({ message: "User registered." }, { status: 201 });
    }
    catch (error) {
        return NextResponse.json({ message: "An error occured while registrating the user" }, { status: 500 });
    }
}
