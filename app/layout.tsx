import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

import Footer from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";
import InteractiveBackground from "@/components/dotbg";
import localFont from "next/font/local";
import { FloatingDock } from "@/components/FloatingDock";
import { LoaderProvider } from "@/app/context/LoaderContext";
import {
  Calendar,
  House,
  Info,
  Medal,
  Phone,
  Timer,
  Trophy,
} from "lucide-react";
import MatrixLoading from "@/components/MatrixLoading";

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
          async src="https://www.googletagmanager.com/gtag/js?id=G-V7XM4JFYBZ"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-V7XM4JFYBZ');
          `}
        </Script>
      </head>
      <body>

        {/* <Sidebar /> */}
        <FloatingDock desktopClassName="fixed md:left-2 lg:left-4 top-[50%] translate-y-[-50%] z-10 border-3 border-[#1D4E1C] ml-8 bg-[#141710]" items={[
          { title: "Home", icon: <House className="w-5 h-5 monitor:w-8 monitor:h-8 text-[#117B20]" />, href: "/" },
          { title: "Results", icon: <Medal className="w-5 h-5 monitor:w-8 monitor:h-8 text-[#117B20]" />, href: "/result-final" },
          { title: "FAQs", icon: <Info className="w-5 h-5 monitor:w-8 monitor:h-8 text-[#117B20]" />, href: "/faq" },
          { title: "Contact", icon: <Phone className="w-5 h-5 monitor:w-8 monitor:h-8 text-[#117B20]" />, href: "/contact" },
          { title: "Schedule", icon: <Calendar className="w-5 h-5 monitor:w-8 monitor:h-8 text-[#117B20]" />, href: "/schedule" },
          { title: "Prizes", icon: <Trophy className="w-5 h-5 monitor:w-8 monitor:h-8 text-[#117B20]" />, href: "/prizes" },
          { title: "Countdown", icon: <Timer className="w-5 h-5 monitor:w-8 monitor:h-8 text-[#117B20]" />, href: "/countdown" },
        ]} />
        <LoaderProvider>
          {children}
        </LoaderProvider>
        <Toaster />
      </body>
    </html>
  );
}
