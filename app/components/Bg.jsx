import React from 'react'
import Link from 'next/link'
import { signOut } from 'next-auth/react'

export default function Bg({session}) {
  return (
    <div
    className="bg-scroll bg-my_bg_image h-[650px] w-[1348px] items-center ">
  </div>
  )
}
