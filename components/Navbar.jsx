'use client'
import React from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation';
import logo from '@/public/logo.svg'
import { Button } from './ui/button'
import Link from 'next/link'
import { signIn, signOut, useSession } from "next-auth/react"
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
  const pathname = usePathname();

  var userData = session
  const LogOut = async () => {
    try {
      await signOut({
        redirect:true,
        callbackUrl: '/' 
      })
      sessionStorage.clear();
    } catch(error){
      console.log("Error signing out: ", error);
    }
  }

  const handleLogOut = ()=>{
    LogOut()
  }
  
  return (
    <div className='flex justify-between items-center px-4 pt-4 z-50 '>
        <Link href={pathname === '/' || pathname === '/queue' ? '/' : '/home'}>
          <Image alt='Hey DJ Logo' src= {logo} width={70} height={70} />
        </Link>
      
        <div className='flex gap-4'>
          {!userData ? (
            <>
            {pathname === "/" && (
              <>
                <Button variant="outline" className="text-white hover:text-black">
                  <Link href="/login">Login</Link>
                </Button>
                <Button className="bg-accent">
                  <Link href="/sign-up">Sign Up</Link>
                </Button>
              </>
            )}
            
            </>
          ):(
            <>
            {pathname !== "/queue" && (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <div className='w-[60px] h-[60px] rounded-full bg-red-400 flex justify-center items-center mx-auto text-3xl font-semibold'>
                      {userData.user?.email.charAt(0).toUpperCase()}
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem><Link href="/home" >Profile</Link></DropdownMenuItem>
                    {/* <DropdownMenuItem>Team</DropdownMenuItem> */}
                    <DropdownMenuItem><Link href="/" onClick={handleLogOut}>Log Out</Link></DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
            </>
          )}
            
            

        </div>
    </div>
  )
}

export default Navbar