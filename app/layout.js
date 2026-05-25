import { Inter } from "next/font/google";
import { Major_Mono_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";
import Provider from "@/components/Provider";

const inter = Inter({ subsets: ["latin"] });
const major = Major_Mono_Display({
  subsets: ["latin"],
  variable: "--font-major",
  weight: "400",
});

export const metadata = {
  title: "HeyDJ",
  description:
    "A web application designed to enhance the music experience in bars and pubs by empowering patrons to influence the playlist",
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${major.variable} bg-background overflow-x-hidden text-white`}>
      <head>
        <link rel="icon" href="/logo.svg" sizes="any" />
      </head>
      <body className={`${inter.className} min-h-screen antialiased relative`}>
        {/* Ambient background orbs (static, GPU-friendly) */}
        <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
          <div className="absolute top-[-10%] left-[-5%] w-[40rem] h-[40rem] rounded-full bg-accent/20 blur-[140px] will-change-transform" />
          <div className="absolute bottom-[-15%] right-[-10%] w-[45rem] h-[45rem] rounded-full bg-accent-deep/25 blur-[160px] will-change-transform" />
          <div className="absolute top-[40%] left-[30%] w-[30rem] h-[30rem] rounded-full bg-accent/10 blur-[120px] will-change-transform" />
        </div>
        {/* Grid overlay */}
        <div className="pointer-events-none fixed inset-0 grid-bg -z-10 opacity-50" />

        <Provider>
          <Navbar />
          {children}
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
