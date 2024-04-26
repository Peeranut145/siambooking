"use client"
import Link from 'next/link'
import React, { useState , useEffect }from 'react'
import Navbar from '../components/Navbar'
import { signIn } from 'next-auth/react'
import {useRouter} from 'next/navigation'
import emailjs from '@emailjs/browser'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

function registerPage() {
  const [password, setPassword] = useState("");
  
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [verifyToken, setVerifyToken] = useState("");

  const router = useRouter();
  const {data: session } = useSession("");
    if ( session ) router.replace("booking");


    useEffect (() => {
    const verifyToken = async () =>{
        try{
            const res = await fetch("api/verify-token", {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({
                    token: param.token,
                })

            })
            if (res.ok) {
                const form = e.target;
                setError("");
                setVerifyToken("Token complete")
                const userData = await res.json();
                form.reset();
           
    
            } else {
                console.log("Token  failed")
              
            }
        }catch(error){
            console.log("Error during reset", error);
        }
      }
    })
   
    
 
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!password || !confirmPassword){
        setError("Please complete all inputs !");
        return;
    }

    if(password != confirmPassword){
        setError("Password is not macth !");
        return;
    }



   
    try{                                       // API เป็นการยิง ข้อมูลไปที่ api/register/route
      
      
        const res = await fetch("api/reset-password",{
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                password, email
            })
        })

        
     
        if (res.ok) {
            const form = e.target;
            setError("");
            setSuccess("Reset complete")
            form.reset();
       

        } else {
            console.log("Reset  failed")
          
        }

    }catch(error){
        console.log("Error during reset", error);
    }
  }



  return (
    <div>
        <Navbar/>
        <div className='container mx-auto py-10 items-center flex-col'>
          <div className='text-center items-center'>
             <h2 className='text-4xl' >Reset Password</h2>
            <hr />
            <form onSubmit={handleSubmit}>

                {error && ( 
                        <div className='bg-red-500 w-fit text-sm text-white py-1 px-3 rounded-md mt-2 mx-auto'>{error}</div>
                )}
                 {success && ( 
                        <div className='bg-green-300 w-fit text-sm text-white py-1 px-3 rounded-md mt-2 mx-auto'>{success}</div>
                    )}
                <input onChange={(e) => setPassword(e.target.value)}  className='block bg-gray-300 p-2 my-2 mx-auto rounded-md ' type="password" placeholder='Enter your new password' />
                <input onChange={(e) => setConfirmPassword(e.target.value)}  className='block bg-gray-300 p-2 my-2 mx-auto rounded-md ' type="password" placeholder='Enter your confirm new password' />
              
                <div >
                  <button type='submit' className='bg-green-500 p-2 rounded-md text-white'>Confirm</button>
                </div>
            </form>
            <hr className='my-3' />
            <p>Already go to <Link href="/login" className='text-blue-500 hover:underline'>login page</Link> </p>
          </div> 
        </div>

    </div>
  )
}

export default registerPage