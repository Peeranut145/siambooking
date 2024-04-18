"use client"
import Link from 'next/link'
import React, { useState }from 'react'
import Navbar from '../components/Navbar'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

function registerPage() {
    const [count, setCount] = useState("");
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
        
        if (!name || !email || !password || !confirmPassword || !numbers){
            setError("Please complete all inputs !");
            return;
        }

        if(password != confirmPassword){
            setError("Password is not macth !");
            return;
        }

        if(name.length < 5 ){
            setError("Name is not long !");
            return;
        }

        if(password.length < 8 ){
            setError("Password is not long !");
            return;
        }

        const IsValidEmail = (e) => {
            const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
            return emailRegex.test(email);
        };
        if ( !IsValidEmail(email) ){
            setError("Email is not invalid, Example : admin145@domain.org");
            return;

        }

     
        try{                                       // API เป็นการยิง ข้อมูลไปที่ api/register/route
            const resCheckUser = await fetch("api/checkUsers",{  //ประกาศตัวแปลมารับค่าเพื่อ รองรับค่ารีเทรินที่ส่งไป
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
            const res = await fetch("api/register",{
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
            <div className='text-center items-center'>
                <h3 className='text-4xl'>Register Page</h3>
                <hr className='my-3' />
                <form onSubmit={handleSubmit}>

                    {error && ( 
                        <div className='bg-red-500 w-fit text-sm text-white py-1 px-3 rounded-md mt-2 mx-auto'>{error}</div>
                    )}
                    {success && ( 
                        <div className='bg-green-300 w-fit text-sm text-white py-1 px-3 rounded-md mt-2 mx-auto'>{success}</div>
                    )}
                    <input onChange={(e) => setName(e.target.value)} className='block bg-gray-300 p-2 my-2 rounded-md mx-auto' type="text" placeholder='Enter your name' />
                    <input onChange={(e) => setEmail(e.target.value)} className='block bg-gray-300 p-2 my-2 rounded-md mx-auto' type="email" placeholder='Enter your Email' />
                    <p className=' text-xs text-red-500'>***Example : admin145@domain.org </p>
                    <input onChange={(e) => setPassword(e.target.value)}className='block bg-gray-300 p-2 my-2 rounded-md mx-auto' type="password" placeholder='Enter your Password' />
                    <p className=' text-xs text-red-500'>***Password is lenght more 8 charactor*** </p>
                    <input onChange={(e) => setconfirmPassword(e.target.value)}className='block bg-gray-300 p-2 my-2 rounded-md mx-auto' type="password" placeholder='Confirm  your Password' />
                    <input onChange={(e) => setNumbers(e.target.value)}className='block bg-gray-300 p-2 my-2 rounded-md mx-auto' type="text" placeholder='Confirm  your Numbers' />
                    
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