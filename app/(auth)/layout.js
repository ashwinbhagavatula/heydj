import React from 'react'

function AuthLayout({ children }) {
  return (
    <div className='relative min-h-screen flex justify-center items-center px-4 pt-28 pb-12'>
      {/* Glow accents specific to auth */}
      <div className='pointer-events-none absolute inset-0 overflow-hidden -z-10'>
        <div className='absolute top-1/4 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] rounded-full bg-accent/20 blur-[140px] animate-pulse-glow' />
      </div>

      <div className='relative w-full md:w-[26rem] glass-strong rounded-3xl p-8 md:p-10 noise'>
        {/* Top accent line */}
        <div className='absolute -top-px left-12 right-12 h-px bg-gradient-to-r from-transparent via-accent to-transparent' />
        {children}
      </div>
    </div>
  )
}

export default AuthLayout
