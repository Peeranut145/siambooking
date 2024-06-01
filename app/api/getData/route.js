import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";


export async function handler(req,res){    //รับค่าที่ยิงมา และแปรงออกเป็น json
       await connectMongoDB();
       const data = await  User.findOne({}, {resetToken:1});
       res.json(data);
       console.log(data);
       
       return NextResponse.json({ message: "User registered." }, { status: 201 });

} 