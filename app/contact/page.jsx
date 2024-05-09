"use client"
import Link from 'next/link'
import React, { useState }from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/footer'
function contact() {



  return (
    <div>
        <Navbar/>
       <div  className="bg-my_bg_image2  bg-[length:1400px_750px] bg-center " >
            <div className='container mx-auto py-40'>
            <div className='text-center items-center'>
                <h2 className='text-4xl my-7 text-white'>Contact Admin</h2>
                <hr />
                <form >
                    <p className=' p-1  mx-auto rounded-md text-white'> Tel : 0875424464</p>
                    <p className=' p-1 mx-auto rounded-md text-white'> Email : James.zero84@gmail.com</p>
                    <p className=' p-1 mx-auto rounded-md text-white' > <Link href="https://www.facebook.com/peeranut.soonho/">Facebook : Peeranut Soonho</Link></p>
                    
                
                </form>
                <hr className='my-3' />        
            </div> 
            </div>
        </div>
        <Footer></Footer>        
    </div>
  )
}
export default contact