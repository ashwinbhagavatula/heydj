import React from 'react'
import Image from 'next/image'
import logo from '@/public/logo.svg'
import { Button } from './ui/button'
import Link from 'next/link'
function Navbar() {
  return (
    <div className='flex justify-between items-center px-4 bg-black pt-4 z-50 '>
        <Link href="/">
          <Image src= {logo} width={70} height={70} />
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