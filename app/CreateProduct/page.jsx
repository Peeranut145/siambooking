"use client"

"use client"


import Navbar from '@/app/components/Navbar'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useState }from 'react'
import { redirect } from 'next/navigation'



export default function BookingPage() {



    const [title, settitle] = useState("");
    const [img, setimg] = useState("");
    const [content, setcontent] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    
  const { data: session } = useSession();
  console.log(session);
  if ( !session ) redirect("/login");

  const handleSubmit = async (e) => {
        
    e.preventDefault();

    if ( !title || !img || !content ) {
        alert("Please complete all inputs");
        return;
    }

    try{
        const res = await fetch("/api/postsproduct",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ title, img, content})
        })

        if (res.ok) {
            router.push("/");

        }
        else {
            throw new Error("Failed to create a post Product");
        }

    }catch (error) {
        console.log(error);
    }





}   
  
  
  
  return (
        <div>
            <Navbar session={session}/>
            <div className='container mx-auto  py-10'>
            <div className=' px-50 '>
                <h3>Create Product :  {session?.user?.name}</h3>
                <hr className='my-3' />
                <Link href={'/Product'} className='bg-gray-500 inline-block text-white border py-2 px-3 rounded mx-2'>Go back </Link>
                          
                <form onSubmit={handleSubmit}>

                    {error && ( 
                        <div className='bg-red-500 w-fit text-sm text-white py-1 px-3 rounded-md mt-2'>{error}</div>
                    )}
                    {success && ( 
                        <div className='bg-green-300 w-fit text-sm text-white py-1 px-3 rounded-md mt-2'>{success}</div>
                    )}

                    <input onChange={(e) => settitle(e.target.value)} tpyp="text" className='w=[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2 ' placeholder='Post title'/>
                    <input onChange={(e) => setimg(e.target.value)}tpyp="text" className='w=[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2 ' placeholder='Post img Url'/>
                    <textarea name="" id="" cols="30" row="10" onChange={(e) => setcontent(e.target.value)} className='w=[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2 ' placeholder='Enter your content' ></textarea>
                    <button type='submit' className='bg-green-500 text-white border py-2 px-3 rounded text-lg my-2 '> Creact Post</button>
                    
                  





                </form>
                <hr className='my-3' />
                </div>            
        </div>

        </div>
  )
}

