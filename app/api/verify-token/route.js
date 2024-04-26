import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";


export async function POST(req){    //รับค่าที่ยิงมา และแปรงออกเป็น json
    try {
        
        const { token } = await req.json();
        
        await connectMongoDB();
        const hashedToken = crypto.createHash("sha256".update(token).digest("hex"));

        const user = await User.findOne({
            resetToken:hashedToken,
            resetTokenExpiry: { $gt: Date.now()}
        })

        if(user)
        {
            return new NextResponse("Invaid token or has expire", {status: 400})
        }
        console.log("User", user);

        return new NextResponse(JSON.stringify(user), {status: 200})
            
    }
    catch (error){
       console.log(error);
    }
} 