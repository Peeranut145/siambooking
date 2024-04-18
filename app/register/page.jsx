"use client"
import Link from 'next/link'
import React, { useState }from 'react'
import Navbar from '../components/Navbar'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
function registerPage() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [numbers, setNumbers] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const {data: session } = useSession("");
    if ( session ) redirect("/booking");
    
    
    const handleSubmit = async (e) => {
        
        e.preventDefault();

        if(password != confirmPassword){
            setError("Password is not macth !");
            return;
        }
        if (!name || !email || !password || !confirmPassword || !numbers){
            setError("Please complete all inputs !");
            return;
        }
        try{                                       // API เป็นการยิง ข้อมูลไปที่ api/register/route
            const resCheckUser = await fetch("http://localhost:3000/api/checkUsers",{  //ประกาศตัวแปลมารับค่าเพื่อ รองรับค่ารีเทรินที่ส่งไป
                method: "POST",
                headers: {
                    "Content-Type" : "application/json" 
                },
                body: JSON.stringify ({ email })
             })
             
            const { user } = await resCheckUser.json();

            if (user) {
                setError("User already exits !");
                return;
            }
            const res = await fetch("http://localhost:3000/api/register",{
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({
                    name, email, password, numbers
                })
            })

            if (res.ok) {
                const form = e.target;
                setError("");
                setSuccess("Success Fully");
                form.reset();
           

            } else {
                console.log("User registration failed")
                setError("User registration failed");
            }

        }catch(error){
            console.log("Error during registration", error);
        }
    }   
    



  return (
    <div>
        <Navbar/>
        <div className='container mx-auto py-5'>
            <div className=' px-50 '>
                <h3>Register Page</h3>
                <hr className='my-3' />
                <form onSubmit={handleSubmit}>

                    {error && ( 
                        <div className='bg-red-500 w-fit text-sm text-white py-1 px-3 rounded-md mt-2'>{error}</div>
                    )}
                    {success && ( 
                        <div className='bg-green-300 w-fit text-sm text-white py-1 px-3 rounded-md mt-2'>{success}</div>
                    )}
                    <input onChange={(e) => setName(e.target.value)} className='block bg-gray-300 p-2 my-2 rounded-md' type="text" placeholder='Enter your name' />
                    <input onChange={(e) => setEmail(e.target.value)} className='block bg-gray-300 p-2 my-2 rounded-md' type="email" placeholder='Enter your Email' />
                    <input onChange={(e) => setPassword(e.target.value)}className='block bg-gray-300 p-2 my-2 rounded-md' type="password" placeholder='Enter your Password' />
                    <input onChange={(e) => setconfirmPassword(e.target.value)}className='block bg-gray-300 p-2 my-2 rounded-md' type="password" placeholder='Confirm  your Password' />
                    <input onChange={(e) => setNumbers(e.target.value)}className='block bg-gray-300 p-2 my-2 rounded-md' type="text" placeholder='Confirm  your Numbers' />
                    
                    <button type='submit' className='bg-green-500 p-2 rounded-md text-white'>Sign Up</button>
                </form>
                <hr className='my-3' />
                <p>Do not  have an accout ? go to <Link href="/login" className='text-blue-500 hover:underline'>login page</Link> </p>
            </div>            
        </div>

    </div>
  )
}

export default registerPage