import React from 'react'
import Link from 'next/link'
import { signOut } from 'next-auth/react'

export default function Section({session}) {
  return (

        <div  className="bg-my_bg_image  bg-[length:1400px_750px] bg-center " >
          <div className='container  py-36 my-auto  mx-auto '>
              <h1 className=' text-7xl  text-center'>
                Welcome <p className='text-blue-800 text-center'>Booking</p>
              </h1>
              <br></br>
              <p className='text-xl text-center text-black-300 my-1'>We love the Sea</p>
              <p className='text-xl text-center text-black-300 my-2'>We love the Islands</p>
          </div>
        </div>
 
  )
}
