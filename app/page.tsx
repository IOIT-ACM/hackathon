
import Image from "next/image"


import tenetHackLogo from "@/public/tenethacklogo.png"
import TenetHackForm from "@/components/TenetHackForm"
import { cn } from "@/lib/utils"
import { Pixelify_Sans, VT323 } from "next/font/google"
import ThreeCanvas from "@/components/MatrixBg"
import { Suspense } from "react"
import MatrixLoading from "@/components/MatrixLoading"
import Footer from "@/components/footer"




export default function Home() {
  const enabled_interest = process.env.ENABLE_INTEREST_FORM == "true";


  return (
    <div className="">

      <ThreeCanvas />
      {/* <HeroSection /> */}


      <MatrixLoading />
    </div >
  )
}

