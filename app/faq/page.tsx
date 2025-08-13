import Image from "next/image";
import { Phone } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import faq from "@/public/Faq/question_mark.png";
import AnimatedTitle from "@/components/AnimatedTitle";
import faqs from "./faqs";

export const metadata = {
  title: "FAQ | HackByte",
  description: "Frequently asked questions about HackByte.",
  keywords: "FAQ, HackByte, IIITDMJ, Hackathon",
  openGraph: {
    title: "FAQ | HackByte",
    description: "Frequently asked questions about HackByte.",
    url: "https://hackbyte.in/faq",
    images:
      "https://res.cloudinary.com/dlsqbiwug/image/upload/v1736876616/Frame_463_zdbkgu.png",
    siteName: "HackByte - IIITDMJ Hackathon",
    type: "website",
    locale: "en_US",
  },
};



export default function FAQSection() {
  return (
    <div className="min-h-screen text-primary-white p-6 md:p-12 lg:p-16 md:py-16 pt-[32px] sm:pt-[48px] text-white md:px-35">
      <div className="max-w-7xl mx-auto mb-24 md:mb-32">
        <div className="grid md:grid-cols-[2fr_1fr] gap-8 items-center">
          <div className="space-y-6 animate-in fade-in duration-500">
            <h1 className="text-[42px] md:text-6xl lg:text-8xl font-black leading-tight max-w-64 md:max-w-3xl">
              Everything you need to know!
            </h1>
            <p className="text-supporting-mediumGray text-lg md:text-xl lg:text-xl xl:text-2xl font-medium md:max-w-lg lg:max-w-3xl">
              Hacker Experience is what we prioritize! Have questions, need
              assistance, or just want to connect? Feel free to reach out!
            </p>
          </div>
          <Image
            src={faq}
            alt=""
            className="hidden md:flex md:w-[200px] lg:w-[220px] lg:pb-28 xl:pb-0 hover:-rotate-6 hover:scale-105 transition-all ease-in-out duration-500"
          />
        </div>
      </div>
      <div className="max-w-7xl mx-auto grid  md:grid-cols-[1fr_2fr] gap-12">
        <div className="space-y-8 animate-in duration-500 delay-300">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter animate-in duration-500">
            FAQs
          </h1>
          <div className="space-y-4 animate-in duration-500 delay-500">
            <p className="text-supporting-mediumGray text-lg">
              Everything you need to know about participating in the Hackathon.
            </p>
            <div className="text-2xl font-bold">OR</div>
            <div className="space-y-0">
              <p className="text-supporting-mediumGray">
                Think we missed something?
              </p>
              <p className="text-supporting-mediumGray">Reach out at: </p>
              <p className="font-bold mt-2">Aditya Godse</p>
              <div

                className="inline-flex items-center gap-2 text-white hover:text-supporting-mediumGray transition-colors"
              >
                <Phone />
                +91 72489 45402
              </div>
            </div>
          </div>
        </div>

        <div className="animate-in fade-in duration-500 delay-500 md:h-[750px] lg:h-[760px] xl:h-[900px]">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AnimatedTitle key={index}>
                <AccordionItem
                  value={`item-${index}`}
                  className="border-b border-gray-800"
                >
                  <AccordionTrigger className="text-base sm:text-lg md:text-xl xl:text-2xl text-supporting-mediumGray hover:text-white transition-colors text-left pr-4 font-bold">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-base sm:text-lg  xl:text-xl text-supporting-mediumGray">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </AnimatedTitle>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
