'use client'
import Queue from '@/components/Queue'
import { Button } from '@/components/ui/button'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

function Page() {
  const {data:session} = useSession()
  const router = useRouter();

  useEffect(()=>{
    if(!session){
      router.push("/")
    }
  }, [session, router])
  
  return (
    <>
    <div className='mt-10 px-4 md:px-20'>
      <h1 className='text-3xl font-semibold text-primary'>Queue URL</h1>
      <p className='mt-4 max-w-full break-all'>heyDJ.tech/asasfdsadf/asdasd/asdasddasdsasddsdsdasdasdsadasdasd</p>
      <Button className="bg-accent mt-4">Generate QR</Button>     
    </div>
    <Queue/>
    </>
  )
}

export default Page