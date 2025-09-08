import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

import Footer from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";
import InteractiveBackground from "@/components/dotbg";
import localFont from "next/font/local";
import { FloatingDock } from "@/components/FloatingDock";
import {
  House,

  Info,
  Phone,
  Timer,
} from "lucide-react";

export const metadata: Metadata = {
  title: "TENET Hackathon",
  description: "First edition of IOIT ACM Student Chapters Hackathon.",
  keywords: "ACM, hackathon, IOIT, AISSMS, tenet, coding, programming, tech, hack, web3",
  openGraph: {
    title: "Tenet Hackathon",
    description:
      "TENET Hackathon is a hackathon organized by the ACM IOIT Student Chapter at AISSMS IOIT as a part of its flagship event - Tenet.",
    url: "https://hack.ioittenet.com/",
    images:
      "https://res.cloudinary.com/dsjstb47y/image/upload/v1755080948/Group_5_e4iwlt.png",
    siteName: "TENET Hackathon",
    locale: "en_US",
    type: "website",
  },
};


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

        {/* <Sidebar /> */}
        <FloatingDock desktopClassName="fixed md:left-2 lg:left-4 top-[50%] translate-y-[-50%] z-10 border-3 border-[#1D4E1C] ml-8 bg-[#141710]" items={[
          { title: "Home", icon: <House className="w-auto h-auto monitor:w-8 monitor:h-8 text-[#117B20]" />, href: "/" },

          { title: "FAQs", icon: <Info className="w-auto h-auto monitor:w-8 monitor:h-8 text-[#117B20]" />, href: "/faq" },
          { title: "Contact", icon: <Phone className="w-auto h-auto monitor:w-8 monitor:h-8 text-[#117B20]" />, href: "/contact" },
          { title: "Countdown", icon: <Timer className="w-auto h-auto monitor:w-8 monitor:h-8 text-[#117B20]" />, href: "/countdown" },
        ]} />
        {children}

        <Toaster />

      </body>
    </html>
  );
}
