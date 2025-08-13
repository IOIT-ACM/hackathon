import Image from "next/image"


import tenetHackLogo from "@/public/tenethacklogo.png"
import TenetHackForm from "@/components/TenetHackForm"
import { cn } from "@/lib/utils"
import { Pixelify_Sans } from "next/font/google"


const pixelify_sans = Pixelify_Sans({
  weight: 'variable',
  subsets: ['latin']
})


export default function Home() {


  return (
    <div className="">
      {/* <HeroSection /> */}
      <div className="space-y-4 pt-28">

        <div className="flex p-8 md:p-12 xm:p-24 gap-16 flex-col md:flex-row">
          <div className="w-full ">
            <div className="  md:mt-36 mx-auto flex flex-col gap-5 md:ml-24">
              <Image
                src={tenetHackLogo}

                alt="tenetlogo"
                className="object-contain my-auto h-72 mx-auto"
              />
              <p className={cn(pixelify_sans.className, "font-medium mx-auto text-white text-4xl sm:text-5xl md:text-6xl")}>The Web3 Hackathon</p>
            </div>
          </div>
          <TenetHackForm />
        </div>
      </div>

    </div>
  )
}
