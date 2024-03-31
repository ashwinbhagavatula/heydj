import React from 'react'
import Image from 'next/image'
import logo from '@/public/logo.svg'
import { Button } from './ui/button'
import Link from 'next/link'
function Navbar() {
  return (
    <div className='flex justify-between items-center px-4 my-4 max-h-24'>
        <Link href="/">
          <Image src= {logo} width={50} height={50} />
        </Link>
      
        <div className='flex gap-4'>
            <Button variant="outline" className="text-white hover:text-black">
              <Link href="/login">Login</Link>
            </Button>
            <Button variant = "destructive">
              <Link href="/signup">Sign Up</Link>
            </Button>

        </div>
    </div>
  )
}

export default Navbar