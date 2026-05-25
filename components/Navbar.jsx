'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation';
import logo from '@/public/logo.svg'
import { Button } from './ui/button'
import Link from 'next/link'
import { signOut, useSession } from "next-auth/react"
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
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  var userData = session
  const LogOut = async () => {
    try {
      await signOut({
        redirect: true,
        callbackUrl: '/'
      })
      sessionStorage.clear();
    } catch (error) {
      console.log("Error signing out: ", error);
    }
  }

  const handleLogOut = () => {
    LogOut()
  }

  return (
    <div className='fixed top-0 left-0 right-0 z-50 px-4 pt-4'>
      <nav
        className={`mx-auto max-w-7xl flex justify-between items-center px-4 md:px-6 py-2.5 rounded-2xl transition-all duration-300 ${
          scrolled
            ? 'glass-strong shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
            : 'glass'
        }`}
      >
        <Link href={pathname === '/' || pathname === '/queue' ? '/' : '/home'} className='flex items-center gap-2 group'>
          <div className='relative'>
            <div className='absolute inset-0 rounded-full bg-accent/40 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
            <Image alt='Hey DJ Logo' src={logo} width={50} height={50} className='relative drop-shadow-[0_0_12px_rgba(255,42,61,0.5)]' />
          </div>
          <span className='hidden sm:block text-lg font-semibold tracking-wide text-gradient-white'>
            HeyDJ
          </span>
        </Link>

        <div className='flex gap-2 sm:gap-3 items-center'>
          {!userData ? (
            <>
              {pathname === "/" && (
                <>
                  <Button variant="outline" size="sm" asChild className='hidden sm:inline-flex'>
                    <Link href="/login">Login</Link>
                  </Button>
                  <Button size="sm" asChild>
                    <Link href="/sign-up">Sign Up</Link>
                  </Button>
                </>
              )}
            </>
          ) : (
            <>
              {pathname !== "/queue" && (
                <DropdownMenu>
                  <DropdownMenuTrigger className='group focus:outline-none'>
                    <div className='relative'>
                      <div className='absolute inset-0 rounded-full bg-accent/40 blur-md opacity-50 group-hover:opacity-100 transition-opacity' />
                      <div className='relative w-11 h-11 rounded-full flex justify-center items-center text-lg font-semibold text-white bg-gradient-to-br from-accent to-accent-deep border border-white/15 shadow-lg'>
                        {userData.user?.email.charAt(0).toUpperCase()}
                      </div>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/home">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/" onClick={handleLogOut}>Log Out</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </>
          )}
        </div>
      </nav>
    </div>
  )
}

export default Navbar
