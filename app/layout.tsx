import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import MobileSidebar from "@/components/MobileSidebar";
import { Sidebar } from "@/components/sidebar";
import Footer from "@/components/footer";
import gsap from 'gsap';
import { Toaster } from "@/components/ui/toaster";
import InteractiveBackground from "@/components/dotbg";
import localFont from "next/font/local";
import GradientBg from "@/components/GradientBg";
import { ScrollTrigger } from "gsap/all"
import { FloatingDock } from "@/components/FloatingDock";
import {
  Calendar,
  Handshake,
  House,
  Trophy,
  Users,
  Info,
  Image as Gallery,
  Phone,
} from "lucide-react";

export const metadata: Metadata = {
  title: "TenetHack",
  description: "The Web3 hackathon.",
  keywords: "ACM, hackathon, IOIT, AISSMS, tenet, coding, programming, tech, hack, web3",
  openGraph: {
    title: "Tenet Hack - Web3 Hackathon",
    description:
      "TenetHack is a web3 hackathon organized by the ACM IOIT Student Chapter at AISSMS IOIT as a part of its flagship event - Tenet.",
    url: "https://ioittenet.com/",
    images:
      "https://res.cloudinary.com/dlsqbiwug/image/upload/v1736876616/Frame_463_zdbkgu.png",
    siteName: "TenetHack - Web3 Hackathon",
    locale: "en_US",
    type: "website",
  },
};

const gotham = localFont({
  src: [
    {
      path: "../public/fonts/Gotham-Bold.otf",
      weight: "bold",
    },
    {
      path: "../public/fonts/Gotham-Medium.otf",
      weight: "500",
    },
    {
      path: "../public/fonts/Gotham-Black.otf",
      weight: "900",
    },
    {
      path: "../public/fonts/Gotham-Light.otf",
      weight: "300",
    },
    {
      path: "../public/fonts/Gotham-Book.otf",
      weight: "normal",
    },
  ],
  variable: "--font-gotham",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" className={` font-sans`}>
      <head>
        <Script
          strategy="afterInteractive"
          async src="https://www.googletagmanager.com/gtag/js?id=G-D5XZGC6M0J"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-D5XZGC6M0J');
          `}
        </Script>
      </head>
      <body>

        <InteractiveBackground>
          {/* <Sidebar /> */}
          <FloatingDock desktopClassName="fixed md:left-2 lg:left-4 top-[50%] translate-y-[-50%] z-10 border-4 border-white ml-8 bg-[#1C1C1C]" items={[
            { title: "Home", icon: <House className="w-auto h-auto monitor:w-8 monitor:h-8" />, href: "/" },
            // { title: "Gallery", icon: <Gallery className="w-auto h-auto monitor:w-8 monitor:h-8" />, href: "/gallery" },
            // { title: "Partners", icon: <Handshake className="w-auto h-auto monitor:w-8 monitor:h-8" />, href: "/partners" },
            // { title: "Prizes", icon: <Trophy className="w-auto h-auto monitor:w-8 monitor:h-8" />, href: "/prizes" },
            // { title: "Schedule", icon: <Calendar className="w-auto h-auto monitor:w-8 monitor:h-8" />, href: "/schedule" },
            // { title: "Humans", icon: <Users className="w-auto h-auto monitor:w-8 monitor:h-8" />, href: "/humans" },
            { title: "FAQs", icon: <Info className="w-auto h-auto monitor:w-8 monitor:h-8" />, href: "/faq" },
            { title: "Contact", icon: <Phone className="w-auto h-auto monitor:w-8 monitor:h-8" />, href: "/contact" },
          ]} />
          {/* <div className="sm:block hidden">
            <Sidebar />
            
          </div>
          <div className="sm:hidden">
            <MobileSidebar />
          </div> */}
          {children}
          <Footer />
          <Toaster />

        </InteractiveBackground>

      </body>
    </html>
  );
}
