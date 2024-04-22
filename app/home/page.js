import Queue from '@/components/Queue'
import { Button } from '@/components/ui/button'
import React from 'react'

function page() {
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