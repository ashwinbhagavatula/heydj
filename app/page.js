"use client";
import { Major_Mono_Display } from "next/font/google" 
import { motion } from "framer-motion";
import React from "react";
import dynamic from "next/dynamic";
const DynamicWavyBackground = dynamic(() => import("../components/ui/wavy-background"), {
  ssr: false, // Ensure it's not rendered on the server-side
});
const major = Major_Mono_Display({subsets:["latin"], variable:'--font-major', weight:'400'});


export default function Home() {
  return (
      <main className="min-h-screen relative">
        <DynamicWavyBackground className="max-w-4xl mx-auto pb-40">
        <p className={`${major.className} text-2xl md:text-5xl lg:text-7xl text-white font-bold inter-var text-center`}>
          HeyDJ
        </p>
        <p className="text-base md:text-lg mt-4 text-white font-normal inter-var text-center">
        Never feel disconnected from the crowd again 
        </p>
        </DynamicWavyBackground>
        <div className="flex flex-col gap-10 text-white mb-52 text-lg md:text-2xl px-4 bg-black">
            <div className="flex md:gap-16 gap-4 justify-center items-center mx-auto">
              <div className="bg-red-400 w-20 h-20 rounded-3xl"></div>
              <p className="max-w-xs font-semibold">Create a music queue to know your crowd’s favourites</p>
            </div>
            <div className="flex md:gap-16 gap-4 justify-center items-center mx-auto">
              <div className="bg-green-400 w-20 h-20 rounded-3xl"></div>
              <p className="max-w-xs font-semibold">Create a music queue to know your crowd’s favourites</p>
            </div>
            <div className="flex md:gap-16 gap-4 justify-center items-center mx-auto">
              <div className="bg-blue-400 w-20 h-20 rounded-3xl"></div>
              <p className="max-w-xs font-semibold">Create a music queue to know your crowd’s favourites</p>
            </div>
          </div>

      </main>
  );
}
