import React from 'react'

function AuthLayout({children}) {
  return (
    <div className='flex mx-auto justify-center items-center bg-card rounded-lg p-10 mt-24 md:w-96 w-[90%]'>{children}</div>
  )
}

export default AuthLayout