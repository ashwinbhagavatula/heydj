"use client";
import { Major_Mono_Display } from "next/font/google" 
import { motion } from "framer-motion";
import React from "react";
import dynamic from "next/dynamic";
import Image from 'next/image'
import djcontroller from '@/images/djcontroller.jpg'
import audience from '@/images/audience.jpg'
import dj from "@/images/dj.png"
import { Button } from '@/components/ui/button'
import Link from "next/link";
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


        <div className="flex flex-col justify-center items-center my-auto gap-10 text-white mb-52 text-lg md:text-2xl px-4 ">
          <div className="flex md:flex-row flex-col gap-32 mx-auto justify-center items-center">
            <div className="flex flex-col gap-4">
              <Image src={dj} height={50} width={50}/>
              <h2 className="font-bold max-w-xl text-3xl">Improve your DJ performance by using personalized QR codes to engage with your audience</h2>
              <p className="text-muted text-sm max-w-xl">HeyDJ allows DJs to create and share unique QR codes with their audience. By scanning the QR codes, users can upvote their favorite songs, giving the DJ valuable insights into the crowd's preferences and enabling them to curate a set that keeps the energy high.</p>
            </div>
            <Image src={djcontroller} className= "md:w-[450px] w-96 h-80 rounded-2xl" height={200} width={200}/>
          </div>    
        </div>

        <div className="flex flex-col justify-center items-center my-auto gap-10 text-white mb-52 text-lg md:text-2xl px-4 bg-card py-32">
          <div className="flex md:flex-row flex-col gap-32 mx-auto justify-center items-center">
            <Image src={audience} className= "md:w-[450px] w-96 h-80 rounded-2xl" height={200} width={200}/>
            <div className="flex  flex-col gap-4">
              <Image src={dj} height={50} width={50}/>
              <h2 className="font-bold max-w-xl text-3xl">Unlock the Power of Audience Engagement with HeyDJ</h2>
              <p className="text-muted text-sm max-w-xl">HeyDJ revolutionizes the way DJs interact with their audience and curate unforgettable music experiences. With our innovative platform, DJs can easily share custom QR codes with their audience, allowing them to upvote their favorite songs and provide valuable feedback.</p>
              <div className="flex gap-4">
                <div>
                  <h3 className="text-xl font-semibold ">For DJ's</h3>
                  <p className="text-muted text-sm max-w-64">Better audience engagement and interaction during live performances.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold ">For Users</h3>
                  <p className="text-muted text-sm max-w-64">More tailored music experiences based on real-time audience preferences.</p>
                </div>
              </div>
            </div>
          </div>    
        </div>
        
        <div className="flex flex-col justify-center items-center my-auto gap-10 text-white mb-52 text-lg md:text-2xl px-4 ">
          <div className="flex md:flex-row flex-col gap-32 mx-auto justify-center items-center">
            <div>
              <Image src={dj} height={50} width={50}/>
              <h2 className="font-bold max-w-xl text-3xl">Improve your DJ performance by using personalized QR codes to engage with your audience</h2>
            </div>
            <div className="flex flex-col gap-6">
              <p className="text-muted text-sm max-w-xl">HeyDJ allows DJs to create and share unique QR codes with their audience. By scanning the QR codes, users can upvote their favorite songs, giving the DJ valuable insights into the crowd's preferences and enabling them to curate a set that keeps the energy high.</p>
              <div className="flex gap-10">
              <Button className="bg-accent">
                <Link href="/sign-up">Sign Up</Link>
              </Button>
              <Button variant="outline"  className="">
                <Link href="/sign-up">Learn More</Link>
              </Button>
              </div>
            </div>
          </div>    
        </div>
      </main>
  );
}
