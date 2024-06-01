import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import bcrypt from 'bcryptjs';



export async function POST(req){    //รับค่าที่ยิงมา และแปรงออกเป็น json
    try {
        
        const { password, email } = await req.json();
       
        await connectMongoDB();
        const exitngUser = await User.findOne({email});
        const hashedPassword = await bcrypt.hash(password, 10);
        exitngUser.password = hashedPassword;
        
        console.log(exitngUser);

        exitngUser.resetToken = undefined;
        exitngUser.resetTokenExpiry = undefined;
      
        try {
            await exitngUser.save();
            return new NextResponse("User a password is update", {status200});

        }catch(err){
            return new NextResponse(err, {status:500});
        }
        return new NextResponse(JSON.stringify(user), {status: 200})
            
    }
    catch (error){
       console.log(error);
    }
} 