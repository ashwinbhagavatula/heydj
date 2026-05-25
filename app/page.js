"use client";
import { Major_Mono_Display } from "next/font/google";
import { motion } from "framer-motion";
import React from "react";
import Image from "next/image";
import MusicVisualizer from "@/components/ui/music-visualizer";
import djcontroller from "@/images/djcontroller.jpg";
import audience from "@/images/audience.jpg";
import dj from "@/images/dj.png";
import qr from "@/images/qr.png";
import upvote from "@/images/upvote.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { HiArrowRight, HiSparkles } from "react-icons/hi2";
import { IoMusicalNotes } from "react-icons/io5";
import { FaHeadphones, FaQrcode, FaUsers } from "react-icons/fa";
import { BiUpvote } from "react-icons/bi";

const major = Major_Mono_Display({
  subsets: ["latin"],
  variable: "--font-major",
  weight: "400",
});

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function Home() {
  return (
    <main className="min-h-screen relative text-white overflow-hidden">
      {/* HERO */}
      <section className="relative min-h-[800px] flex items-center justify-center overflow-hidden">
        <MusicVisualizer />

        <div className="relative z-10 max-w-5xl mx-auto pb-40 pt-32 px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center text-center gap-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs uppercase tracking-[0.2em] text-white/70">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              The future of crowd-driven music
            </div>

            <h1
              className={`${major.className} text-6xl md:text-8xl lg:text-9xl font-bold text-center`}
            >
              <span className="text-gradient-red">HeyDJ</span>
            </h1>

            <p className="text-base md:text-xl text-white/70 max-w-xl">
              Never feel disconnected from the crowd again. Real-time song
              requests, audience-powered queues, and a vibe that finally matches.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
              <Button size="lg" asChild>
                <Link href="/sign-up" className="flex items-center gap-2">
                  Get Started <HiArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STATS / FEATURES STRIP */}
      <section className="relative max-w-6xl mx-auto px-4 -mt-24 mb-24 z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              icon: <FaQrcode className="w-6 h-6" />,
              title: "Custom QR Codes",
              desc: "Share your queue instantly with a personalized scan code.",
            },
            {
              icon: <BiUpvote className="w-6 h-6" />,
              title: "Live Upvotes",
              desc: "Let the crowd shape your setlist in real-time.",
            },
            {
              icon: <FaHeadphones className="w-6 h-6" />,
              title: "Smart Insights",
              desc: "Understand what the room wants before they ask.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card rounded-2xl p-6 hover:border-accent/40 hover:shadow-[0_0_40px_rgba(255,42,61,0.15)] transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/30 to-accent-deep/20 border border-accent/30 flex items-center justify-center text-accent mb-4">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
              <p className="text-sm text-white/60">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FEATURE 1 */}
      <section className="relative max-w-6xl mx-auto px-4 mb-32">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex md:flex-row flex-col gap-12 md:gap-20 items-center"
        >
          <div className="flex flex-col gap-5 flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/30 text-xs uppercase tracking-wider text-accent w-fit">
              <HiSparkles className="w-3 h-3" /> For DJs
            </div>
            <h2 className="font-bold max-w-xl text-3xl md:text-4xl leading-tight">
              <span className="text-gradient-white">Elevate your set with</span>{" "}
              <span className="text-gradient-red">crowd intelligence</span>
            </h2>
            <p className="text-white/60 text-base md:text-lg max-w-xl leading-relaxed">
              Create and share unique QR codes with your audience. Scans turn
              into upvotes — upvotes turn into a setlist that reads the room
              before you do.
            </p>

            <div className="flex gap-4 mt-2">
              <div className="glass-card rounded-xl px-4 py-3">
                <p className="text-2xl font-bold text-gradient-red">3x</p>
                <p className="text-xs text-white/50 uppercase tracking-wider">Engagement</p>
              </div>
              <div className="glass-card rounded-xl px-4 py-3">
                <p className="text-2xl font-bold text-gradient-red">Live</p>
                <p className="text-xs text-white/50 uppercase tracking-wider">Feedback</p>
              </div>
            </div>
          </div>

          <div className="relative flex-1 w-full">
            <div className="absolute -inset-4 bg-gradient-to-br from-accent/20 via-transparent to-accent-deep/20 rounded-3xl blur-2xl" />
            <div className="relative glass-strong rounded-3xl overflow-hidden border border-white/10 group">
              <Image
                src={djcontroller}
                alt="DJ Controller"
                className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-105"
                height={400}
                width={600}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            </div>
          </div>
        </motion.div>
      </section>

      {/* FEATURE 2 - reversed */}
      <section className="relative max-w-6xl mx-auto px-4 mb-32">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex md:flex-row-reverse flex-col gap-12 md:gap-20 items-center"
        >
          <div className="flex flex-col gap-5 flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/30 text-xs uppercase tracking-wider text-accent w-fit">
              <FaUsers className="w-3 h-3" /> For Crowds
            </div>
            <h2 className="font-bold max-w-xl text-3xl md:text-4xl leading-tight">
              <span className="text-gradient-white">Unlock the power of</span>{" "}
              <span className="text-gradient-red">audience engagement</span>
            </h2>
            <p className="text-white/60 text-base md:text-lg max-w-xl leading-relaxed">
              HeyDJ revolutionizes the way DJs interact with their audience and
              curate unforgettable music experiences — built for the moment, in
              real-time.
            </p>

            <div className="grid grid-cols-2 gap-4 mt-2">
              <div className="glass-card rounded-2xl p-4">
                <h3 className="text-base font-semibold text-white mb-1">For DJs</h3>
                <p className="text-sm text-white/55">
                  Better audience engagement during live performances.
                </p>
              </div>
              <div className="glass-card rounded-2xl p-4">
                <h3 className="text-base font-semibold text-white mb-1">For Users</h3>
                <p className="text-sm text-white/55">
                  Tailored music shaped by real-time crowd preferences.
                </p>
              </div>
            </div>
          </div>

          <div className="relative flex-1 w-full">
            <div className="absolute -inset-4 bg-gradient-to-tl from-accent/20 via-transparent to-accent-deep/20 rounded-3xl blur-2xl" />
            <div className="relative glass-strong rounded-3xl overflow-hidden border border-white/10 group">
              <Image
                src={audience}
                alt="Audience"
                className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-105"
                height={400}
                width={600}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            </div>
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="relative max-w-5xl mx-auto px-4 mb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative glass-strong rounded-3xl p-10 md:p-16 overflow-hidden noise"
        >
          {/* Glow */}
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-accent/30 blur-[120px]" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-accent-deep/40 blur-[120px]" />

          <div className="relative flex md:flex-row flex-col gap-10 items-center justify-between">
            <div className="flex flex-col gap-4 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs uppercase tracking-wider text-white/70 w-fit">
                <IoMusicalNotes className="w-3 h-3" /> Ready when you are
              </div>
              <h2 className="font-bold text-3xl md:text-5xl leading-tight">
                <span className="text-gradient-white">Start the set</span>{" "}
                <span className="text-gradient-red">that everyone remembers</span>
              </h2>
              <p className="text-white/60 text-base">
                Join HeyDJ and turn every gig into a two-way experience.
              </p>
            </div>

            <div className="flex flex-col gap-3 w-full md:w-auto">
              <Button size="lg" asChild className="w-full md:w-auto">
                <Link href="/sign-up" className="flex items-center gap-2">
                  Sign Up Free <HiArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="w-full md:w-auto">
                <Link href="/login">Learn More</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative max-w-6xl mx-auto px-4 pb-10 pt-10 border-t border-white/5">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-white/40 text-sm">
          <p>© {new Date().getFullYear()} HeyDJ — Built for the crowd.</p>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="uppercase tracking-wider text-xs">All systems live</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
