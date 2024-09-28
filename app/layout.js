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
    <html lang="en" className="bg-background overflow-x-hidden text-white ">
      <head>
        <link rel="icon" href="/logo.svg" sizes="any" />
      </head>
      <body className={`${inter.className} min-h-screen`}>
        <Provider>
          <Navbar />
          {children}
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
