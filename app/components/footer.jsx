import React from 'react'
import Link from 'next/link'


export default function Navbar({session}) {
  return (
    <nav className="h-23 bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-7">
        <div className="container mx-auto ">
            
            <div className="flex justify-between item-center">
                <div>
                    <Link href = "../contact">Contact</Link>
                </div>
                <ul className='flex'>
                  
                            <li className='mx-3'>Create by</li>
                            <li className='mx-3'>James.</li>
                  
                       
                </ul>
            </div>

        </div>
    </nav>
  )
}
