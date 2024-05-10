import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";


export async function POST(req){    //รับค่าที่ยิงมา และแปรงออกเป็น json
    try {
        await connectMongoDB();
        const { email } = await req.json();
        const user = await User.findOne({ email }).select("_id");
        console.log("User", user);
        console.log(email);
        return NextResponse.json({ user });
        
    }
    catch (error){
       console.log(error);
    }
} 