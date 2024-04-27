'use client'
import Queue from '@/components/Queue'
import { Button } from '@/components/ui/button'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import React from 'react'

function page() {
  const {data:session} = useSession()
  const userData = session
  const router = useRouter();

  if(userData === null){
    router.push("/")
  }
  return (
    <>
    <div className='mt-10 px-4 md:px-20 '>
      <h1 className='text-3xl font-semibold text-primary'>Queue URL</h1>
      <p className='mt-4 max-w-full break-all'>heyDJ.tech/asasfdsadf/asdasd/asdasddasdsasddsdsdasdasdsadasdasd</p>
      <Button className="bg-accent mt-4">Generate QR</Button>     
    </div>
    <Queue/>
    </>
  )
}

export default page