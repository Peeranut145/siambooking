import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import bcrypt from 'bcryptjs'

export async function POST(req){    //รับค่าที่ยิงมา และแปรงออกเป็น json
    try {
        const {name, email, password} = await req.json();
        const hashedPassword = await bcrypt.hash(password, 10);

        await connectMongoDB();
        await User.create ({ name, email, password: hashedPassword });


        return NextResponse.json ({ message: "User registered."}, { status:201});
        
    }
    catch (error){
        return NextResponse.json ({ message : "An error occured while registrating the user"}, { status :500 });
    }
} 