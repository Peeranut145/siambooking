"use client"


import Navbar from '@/app/components/Navbar'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useState }from 'react'
import { redirect } from 'next/navigation'



export default function BookingPage() {



  const [id, setId] = useState("");
  const [day, setDay] = useState("date");
  const [status, setStatus] = useState("");
  const [adult, setAdult] = useState("");
  const [child, setChild] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  const { data: session } = useSession();
  console.log(session);
  if ( !session ) redirect("/login");

  const handleSubmit = async (e) => {
        
    e.preventDefault();




      try{                                       // API เป็นการยิง ข้อมูลไปที่ api/register/route
                          
              const res = await fetch("api/booking",{
                  method: "POST",
                  headers: {
                      "Content-Type" : "application/json"
                  },
                  body: JSON.stringify({
                     day,  adult, child
                  })
              })

              if (res.ok) {
                  const form = e.target;
                  setError("");
                  setSuccess("Success Fully");
                  setStatus("Booking")
                  form.reset();
            

              } else {
                  console.log("Booking failed")
                  setError("Booking failed");
              }

          }catch(error){
              console.log("Error during registration", error);
    }

}   
  
  
  
  return (
        <div>
            <Navbar session={session}/>
            <div className='container mx-auto py-5'>
            <div className=' px-50 '>
                <h3>Welcome to Booking :  {session?.user?.name}</h3>
                <hr className='my-3' />
                <form onSubmit={handleSubmit}>

                    {error && ( 
                        <div className='bg-red-500 w-fit text-sm text-white py-1 px-3 rounded-md mt-2'>{error}</div>
                    )}
                    {success && ( 
                        <div className='bg-green-300 w-fit text-sm text-white py-1 px-3 rounded-md mt-2'>{success}</div>
                    )}
                    <input onChange={(e) => setDay(e.target.value)} className='block bg-gray-300 p-2 my-2 rounded-md' type="date" placeholder='Enter your name' />
                    <input onChange={(e) => setAdult(e.target.value)}className='block bg-gray-300 p-2 my-2 rounded-md' type="number" placeholder='Enter your Aduit' />  
                    <input onChange={(e) => setChild(e.target.value)}className='block bg-gray-300 p-2 my-2 rounded-md' type="number" placeholder='Confirm  your Child' />
                    
                    <button type='submit' className='bg-green-500 p-2 rounded-md text-white'>Comfirm Booking</button>
                </form>
                <hr className='my-3' />
                </div>            
        </div>

        </div>
  )
}

