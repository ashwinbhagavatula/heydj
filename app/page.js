"use client";
import { Major_Mono_Display } from "next/font/google" 
import { motion } from "framer-motion";
import React from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

const DynamicWavyBackground = dynamic(() => import("../components/ui/wavy-background"), {
  ssr: false, // Ensure it's not rendered on the server-side
  loading: () => <div style={{ height: "800px" }}></div>
});
const major = Major_Mono_Display({subsets:["latin"], variable:'--font-major', weight:'400'});


export default function Home() {
  return (
      <main className="min-h-screen relative text-white">
        <DynamicWavyBackground className="max-w-4xl mx-auto pb-40" backgroundFill="#0b090a">
        <p className={`${major.className} text-5xl md:text-7xl text-white font-bold inter-var text-center`}>
          HeyDJ
        </p>
        <p className="text-base md:text-lg mt-4 text-white font-normal inter-var text-center">
        Never feel disconnected from the crowd again 
        </p>
        </DynamicWavyBackground>
        <div className="flex flex-col gap-10 text-white mb-52 text-lg md:text-2xl px-4 min-h-screen bg-card">
          <div className="flex gap-10 mx-auto justify-center items-center">
            <div className="flex flex-col">
            </div>
          </div>    
        </div>

      </main>
  );
}
