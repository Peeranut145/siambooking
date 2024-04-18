import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import bcrypt from 'bcryptjs';
import CountModel from "@/models/count";
import { data } from "autoprefixer";


export async function POST(req) {
    
    try {
        const {   name, email, password, numbers } = await req.json(); //ประกาศค่าตัวแปล โดย รับค่าจาก req ที่ยิงมาเป็นไฟลื json
        
        const hashedPassword = await bcrypt.hash(password, 10);
        await connectMongoDB();
        // async function createUser() {
        //     let countDoc = await CountModel.findOne();

        //     if ( !countDoc ) {
        //         countDoc = new CountModel();
        //     }
        //     countDoc.count++;
        //     await countDoc.save();

        //     let countUser = new User({ ...data,id: countDoc.count });
        //     await countUser.save();
        //     return countUser;
        // }   
       
       
      
       
        await User.create({   name, email, password: hashedPassword, numbers });


        return NextResponse.json({ message: "User registered." }, { status: 201 });

    }
    catch (error) {
        return NextResponse.json({ message: "An error occured while registrating the user" }, { status: 500 });
    }
}
