
import Image from "next/image"


import tenetHackLogo from "@/public/tenethacklogo.png"
import TenetHackForm from "@/components/TenetHackForm"
import { cn } from "@/lib/utils"
import { Pixelify_Sans, VT323 } from "next/font/google"
import ThreeCanvas from "@/components/MatrixBg"
import { Suspense } from "react"
import MatrixLoading from "@/components/MatrixLoading"
import Footer from "@/components/footer"



const vt323 = VT323({
  weight: '400',
  subsets: ['latin']
})
export default function Home() {
  const enabled_interest = process.env.ENABLE_INTEREST_FORM == "true";


  return (
    <div className="h-screen w-full flex flex-col">

      <ThreeCanvas />
      {/* <HeroSection /> */}
      {enabled_interest ? <TenetHackForm /> :
        <div className='flex flex-col gap-2 mx-auto my-auto 
        z-10 px-10'>
          <h1 className={cn('text-center font-bold text-7xl  text-shadow-[0_35px_35px_rgb(0_0_0_/_0.25)] text-shadow-2xl  text-[#05BE2B]', vt323.className)}>The Matrix <span className="animate-blink">_</span></h1>
          <p className={cn('text-center text-4xl  text-white', vt323.className)}>Plug into The Matrix, where code bends reality.<br /> Create what the future dares to imagine.</p>
          <a className="relative cursor-pointer mt-2 px-10 py-2 text-lg font-medium text-black bg-[#141710] mx-auto hover:bg-primary-white hover:px-20 transition-all">
            <p className={cn("text-2xl text-white mx-auto text-center", vt323.className)}>Register Now</p>
            {/* Left bracket */}
            <span className="absolute left-0 top-0 h-full w-3 border-l-3 border-t-3 border-b-3 border-primary-white"></span>
            {/* Right bracket */}
            <span className="absolute right-0 top-0 h-full w-3 border-r-3 border-t-3 border-b-3 border-primary-white"></span>
          </a>

        </div>
      }
      <Footer className=" mb-10" />

      <MatrixLoading />



    </div >
  )
}
