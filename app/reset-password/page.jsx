"use client"
import Link from 'next/link'
import React, { useState }from 'react'
import Navbar from '../components/Navbar'
import { signIn } from 'next-auth/react'
import {useRouter} from 'next/navigation'
import emailjs from '@emailjs/browser'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
function registerPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();
  const {data: session } = useSession("");
    if ( session ) router.replace("booking");
    
 
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    



    const IsValidEmail = (e) => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailRegex.test(email);
    };
    if ( !IsValidEmail(email) ){
        setError("Email is not invalid, Example : admin145@domain.org");
        return;

    }
    try{                                       // API เป็นการยิง ข้อมูลไปที่ api/register/route
      
      
        const res = await fetch("api/forget-password",{
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                email
            })
        })

        
        const serviceId = 'service_x1gxzek';
        const templeteId = 'template_89b5tlt';
        const publicKey = 'EKTWbI9COdZ2EtyX9';

        const templateParams = {
            
            from_email: email,
            message: ''
            
         }

         emailjs.send(serviceId, templeteId, templateParams, publicKey)
         .then((response) => {
             console.log("Email sent successfully", response);
             setSuccess("Send to Reset");

          })
         .catch((error) => {
            console.log('Error sending email',error)
            setError("Reset  failed");
         })


        if (res.ok) {
            const form = e.target;
            setError("");
         
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
                <input onChange={(e) => setEmail(e.target.value)}  className='block bg-gray-300 p-2 my-2 mx-auto rounded-md ' type="email" placeholder='Enter your Email' />
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