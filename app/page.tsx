import Image from "next/image"
import stats from "@/public/HomePageLogo/redtape2.png"
// import HeroSection from "@/components/Herosection"
import DiscordCard from "@/components/DiscordCard"
import whyParticipate from "@/public/HomePageLogo/whyParticipate.png"
import g1 from "@/public/HomePageLogo/g1.svg"
import g2 from "@/public/HomePageLogo/g2.svg"
import g3 from "@/public/HomePageLogo/g3.svg"
import g4 from "@/public/HomePageLogo/g4.svg"
import g5 from "@/public/HomePageLogo/g5.svg"
import g6 from "@/public/HomePageLogo/g6.svg"
import g7 from "@/public/HomePageLogo/g7.svg"
import g8 from "@/public/HomePageLogo/g8.svg"
import g9 from "@/public/HomePageLogo/g9.svg"
import g10 from "@/public/HomePageLogo/g10.svg"
import bottomstats from "@/public/upper.svg"
import topstats from "@/public/lower.svg"
import * as motion from "motion/react-client"
import AnimatedTitle from "@/components/AnimatedTitle"
import CountAnimation from "@/components/CountAnimation"
import Link from "next/link"
import HB4Form from "@/components/HB4Form"
import tenetHackLogo from "@/public/tenethacklogo.png"
import TenetHackForm from "@/components/TenetHackForm"
import { cn } from "@/lib/utils"
import { Pixelify_Sans } from "next/font/google"

interface GuidlinesCard {
  title: string
  description: string
  icon: string
  index: number
}
const pixelify_sans = Pixelify_Sans({
  weight: 'variable',
  subsets: ['latin']
})
function GuidelinesCard({ title, description, icon, index }: GuidlinesCard) {
  // Define animation variants based on index
  const animationVariants = {
    hidden: { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
    visible: { opacity: 1, x: 0 },
  }

  return (
    <motion.div
      className="card flex gap-4 items-start"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      variants={animationVariants}
    >
      <Image src={icon} alt="Icon" className="xl:w-20 md:w-16 pt-1" />
      <div className="flex flex-col justify-center gap-2">
        <div className="monitor:text-4xl xl:text-3xl lg:text-2xl text-xl text-white font-bold">
          {title}
        </div>
        <div className="text-base lg:text-base xl:text-lg monitor:text-xl font-normal text-supporting-darkGray md:max-w-64 lg:max-w-[500px] leading-6">
          {description}
        </div>
      </div>
    </motion.div>
  )
}

export default function Home() {

  const Guidelines = [
    {
      icon: g1,
      title: "Register with Ease",
      description:
        "Pre-registration opens Shortly—no red tape, just one click away!",
    },
    {
      icon: g2,
      title: "No Prerequisites",
      description:
        "Anyone can join, no prerequisites—just bring your creativity!",
    },
    {
      icon: g3,
      title: "Form Team",
      description:
        "Team up with 2-4 members; join our Discord to find teammates and get the latest updates!",
    },
    {
      icon: g4,
      title: "Flexible Teams",
      description:
        "Add teammates later by submitting an individual application, and they’ll be added once approved.",
    },
    {
      icon: g5,
      title: "Zero Fees, Full Perks",
      description: "No cost to participate, plus free meals and accommodation.",
    },
    {
      icon: g6,
      title: "Free Food",
      description:
        "Enjoy complimentary meals, water, and coffee throughout the event.",
    },
    {
      icon: g7,
      title: "In-person Event",
      description: "HackByte 4.0 is an in-person / offline hackathon event.",
    },
    {
      icon: g8,
      title: "Hassle-Free Stay",
      description:
        "Shared hall accommodations with mattresses—simple and sorted.",
    },
    {
      icon: g9,
      title: "Venue",
      description:
        "IIITDM Jabalpur awaits—explore the campus and bring ideas to life.",
    },
  ]

  return (
    <div className="">
      {/* <HeroSection /> */}
      <div className="space-y-4 pt-28">

        <div className="flex p-8 md:p-12 xm:p-24 gap-16 flex-col md:flex-row">
          <div className="w-full ">
            <div className="  mt-36 mx-auto flex flex-col gap-5 md:ml-24">
              <Image
                src={tenetHackLogo}

                alt="tenetlogo"
                className="object-contain my-auto h-72 mx-auto"
              />
              <p className={cn(pixelify_sans.className, "font-medium mx-auto text-white text-4xl sm:text-5xl md:text-6xl")}>The Web3 Hackathon</p>
            </div>


            {/* <h3 className="text-xl md:text-2xl xl:text-3xl monitor:text-4xl font-bold text-supporting-lightGray text-center">
              We are <span className="text-red-400">coming back</span> with a
              brand new{" "}
              <span className="font-mono border rounded bg-white/10">
                Theme
              </span>
              , new <span className="uppercase">determination</span> and lots of
              new <span className="">Surprises🎁</span>!
            </h3> */}
          </div>
          <TenetHackForm />
        </div>
      </div>

    </div>
  )
}
