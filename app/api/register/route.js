import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import bcrypt from 'bcryptjs';

import { data } from "autoprefixer";


export async function POST(req) {
    
    try {
        const {   name, email, password, numbers } = await req.json(); //ประกาศค่าตัวแปล โดย รับค่าจาก req ที่ยิงมาเป็นไฟลื json
        
        const hashedPassword = await bcrypt.hash(password, 10);
        await connectMongoDB();
       
        
        
        console.log(name);
        console.log(email);
        console.log(password);
        console.log(numbers);
        await User.create({   name, email, password: hashedPassword, numbers });


        return NextResponse.json({ message: "User registered." }, { status: 201 });

    }
    catch (error) {
        return NextResponse.json({ message: "An error occured while registrating the user" }, { status: 500 });
    }
}
