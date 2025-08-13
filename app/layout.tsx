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
} from "lucide-react";

export const metadata: Metadata = {
  title: "TenetHack",
  description: "The Web3 hackathon.",
  keywords: "ACM, hackathon, IOIT, AISSMS, tenet, coding, programming, tech, hack, web3",
  openGraph: {
    title: "Tenet Hack - Web3 Hackathon",
    description:
      "TenetHack is a web3 hackathon organized by the ACM IOIT Student Chapter at AISSMS IOIT as a part of its flagship event - Tenet.",
    url: "https://hack.ioittenet.com/",
    images:
      "https://res.cloudinary.com/dsjstb47y/image/upload/v1755080948/Group_5_e4iwlt.png",
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
    <html lang="en" className={`${gotham.className} font-sans`}>
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

            { title: "FAQs", icon: <Info className="w-auto h-auto monitor:w-8 monitor:h-8" />, href: "/faq" },
            { title: "Contact", icon: <Phone className="w-auto h-auto monitor:w-8 monitor:h-8" />, href: "/contact" },
          ]} />
          {children}
          <Footer />
          <Toaster />

        </InteractiveBackground>

      </body>
    </html>
  );
}
