'use client'
import React from 'react'
import Image from 'next/image'
import logo from '@/public/logo.svg'
import { Button } from './ui/button'
import Link from 'next/link'
import { signIn, signOut, useSession } from "next-auth/react"
import { useRouter, redirect } from 'next/navigation';
import { toast } from './ui/use-toast'

function Navbar() {
  const { data: session } = useSession()

  var userData = session
  const LogOut = async () => {
    try {
      await signOut({
        redirect:true,
        callbackUrl: '/'
      })
    } catch(error){
      console.log("Error signing out: ", error);
    }
  }

  const handleLogOut = ()=>{
    LogOut()
  }
  return (
    <div className='flex justify-between items-center px-4 pt-4 z-50 '>
        <Link href="/">
          <Image src= {logo} width={70} height={70} />
        </Link>
      
        <div className='flex gap-4'>
          {!userData ? (
            <>
            <Button variant="outline" className="text-white hover:text-black">
              <Link href="/login">Login</Link>
            </Button>
            <Button className="bg-accent">
              <Link href="/sign-up">Sign Up</Link>
            </Button>
            </>
          ):(
            <>
            <Button className="bg-accent" onClick={handleLogOut}>
              <Link href="/">Log Out</Link>
            </Button>
            </>
          )}
            
            

        </div>
    </div>
  )
}

export default Navbar