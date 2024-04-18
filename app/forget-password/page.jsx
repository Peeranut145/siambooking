"use client"
import Link from 'next/link'
import React, { useState }from 'react'
import Navbar from '../components/Navbar'
import { signIn } from 'next-auth/react'
import {useRouter} from 'next/navigation'


import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
function registerPage() {

  const [email, setEmail] = useState("");
  
  const [error, setError] = useState("");

  const router = useRouter();
  const {data: session } = useSession("");
    if ( session ) router.replace("booking");
    
 
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    
        router.replace("welcome")  //link page
        
    } catch(error){
      console.log(error)
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
                        <div className='bg-red-500 w-fit text-sm text-white py-1 px-3 rounded-md mt-2'>{error}</div>
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