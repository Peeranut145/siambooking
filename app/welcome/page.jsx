"use client"

import React from 'react'
import Navbar from '@/app/components/Navbar'
import { useSession } from 'next-auth/react'
export default function WelcomePage() {
  
  const { data: session } = useSession();
  console.log(session);
  
  
  
  return (
        <div>
            <Navbar/>
            <div className='container mx-auto'>
                <h3 className='text-3xl my-3 '>Welcome User   </h3>  
                <hr className='my-3' />     
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id iure cumque quidem voluptatum! Deleniti nihil, eos doloremque impedit quasi amet.</p>

                
           
            </div>

        </div>
  )
}

