import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import bcrypt from 'bcryptjs';
import CountModel from "@/models/count";
import crypto from "crypto";
import emailjs from '@emailjs/browser'

export async function POST(req) {
    
    try {
        const { email } = await req.json(); //ประกาศค่าตัวแปล โดย รับค่าจาก req ที่ยิงมาเป็นไฟลื json
        
   

        await connectMongoDB();
        
        

       
        const existingUser = await User.findOne({ email });
        if ( !existingUser ){
            return NextResponse.json({ message: "Email Don't exist." }, { status: 201 });
        }
        existingUser.resetToken = crypto.randomBytes(20).toString("hex");
        existingUser.resetTokenExpiry =  Date.now() + 3600000;
        console.log(existingUser);

        const token = await User.findOne({email}).select(resetToken);
        const serviceId = 'service_x1gxzek';
        const templeteId = 'template_89b5tlt';
        const publicKey = 'EKTWbI9COdZ2EtyX9';

        const templateParams = {
            
            from_email: email,existingUser,token,
            message: ''
            
         }

         emailjs.send(serviceId, templeteId, templateParams, publicKey)
         .then((response) => {
             console.log("Email sent successfully", response);
             setSuccess("Send to Reset");

          })
         .catch((error) => {
            console.log('Error sending email',error)
            setError("Reset  failed");
         })


       await   existingUser.save();
         return NextResponse.json({ message: "User registered." }, { status: 201 });
    }
    catch (error) {
        return NextResponse.json({ message: "An error occured while registrating the user" }, { status: 500 });
    }
}
