'use client'
import React from 'react'
import Image from 'next/image'
import logo from '@/public/logo.svg'
import { Button } from './ui/button'
import Link from 'next/link'
import { signIn, signOut, useSession } from "next-auth/react"
import { useRouter, redirect } from 'next/navigation';
import { toast } from './ui/use-toast'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

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
  console.log(userData)
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
            {/* <Button className="bg-accent" onClick={handleLogOut}>
              <Link href="/">Log Out</Link>
            </Button> */}
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className='w-[60px] h-[60px] rounded-full bg-accent flex justify-center items-center mx-auto text-3xl font-semibold'>
                  {userData.user?.email.charAt(0).toUpperCase()}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                {/* <DropdownMenuItem>Team</DropdownMenuItem> */}
                <DropdownMenuItem><Link href="/" onClick={handleLogOut}>Log Out</Link></DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            </>
          )}
            
            

        </div>
    </div>
  )
}

export default Navbar