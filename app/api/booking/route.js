import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import Booking from "@/models/booking";
import bcrypt from 'bcryptjs'


export async function POST(req){    //รับค่าที่ยิงมา และแปรงออกเป็น json
    try {
        const {day, adult, child} = await req.json();   //ประกาศค่าตัวแปล โดย รับค่าจาก req ที่ยิงมาเป็นไฟลื json


        await connectMongoDB();
        await Booking.create ({ day, adult, child });
       

        return NextResponse.json ({ message: "Booking registered."}, { status:201});
        
    }
    catch (error){
        return NextResponse.json ({ message : "An error occured while registrating the Booking"}, { status :500 });
    }
} 