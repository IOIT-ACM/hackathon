import Image from "next/image";
import { CctvIcon, Phone } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import faq from "@/public/rabbit.png";
import AnimatedTitle from "@/components/AnimatedTitle";
import faqs from "./faqs";
import { Space_Mono, VT323 } from "next/font/google";
import { cn } from "@/lib/utils";

const vt323 = VT323({
  weight: '400',
  subsets: ['latin']
})
const space_mono = Space_Mono({
  weight: "400",
  subsets: ['latin']
})

export default function FAQSection() {
  return (
    <div className="min-h-screen text-primary-white p-6 md:p-12 lg:p-16 md:py-16 pt-[32px] sm:pt-[48px]  md:px-35">
      <div className="max-w-7xl mx-auto mb-24 md:mb-32">
        <div className="grid md:grid-cols-[2fr_1fr] gap-8 items-center">
          <div className="space-y-6 animate-in fade-in duration-500">
            <h1 className={cn("text-[42px] md:text-7xl lg:text-9xl font-black leading-tight max-w-64 md:max-w-3xl", vt323.className)}>
              Everything you need to know!
            </h1>
            <p className={cn("text-supporting-mediumGray text-lg md:text-xl lg:text-xl xl:text-2xl font-medium md:max-w-lg lg:max-w-3xl", space_mono.className)}>
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
          <h1 className={cn("text-6xl md:text-7xl lg:text-9xl font-black tracking-tighter animate-in duration-500", vt323.className)}>
            FAQs
          </h1>
          <div className="space-y-4 animate-in duration-500 delay-500">
            <p className={cn("text-supporting-mediumGray text-lg", space_mono.className)}>
              Everything you need to know about participating in the Hackathon.
            </p>
            <div className={cn("text-4xl font-bold", vt323.className)}>OR</div>
            <div className="space-y-0">
              <p className={cn("text-supporting-mediumGray", space_mono.className)}>
                Think we missed something?
              </p>
              <p className={cn("text-supporting-mediumGray mb-4", space_mono.className)}>Reach out at: </p>
              {[
                { name: "Aditya Godse", phone: "+91 72489 45402" },
                { name: "Manasi Choudhari", phone: "+91 77418 83030" },
              ].map((person) => (
                <div
                  className="space-y-1 flex flex-col  font-medium"
                  key={person.name}
                >
                  <p
                    className={cn(
                      "font-bold mt-2 text-2xl text-primary-white",
                      vt323.className
                    )}
                  >
                    {person.name}
                  </p>
                  <div className="inline-flex items-center gap-2 text-primary-white   transition-colors">
                    <Phone className="h-5" />
                    <p className={cn(space_mono.className)}>{person.phone}</p>
                  </div>
                </div>
              ))}
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
                  <AccordionTrigger className={cn("text-base sm:text-lg md:text-xl xl:text-2xl data-[state=open]:text-primary-white text-supporting-mediumGray hover:text-primary-white transition-colors text-left pr-4 font-bold", space_mono.className)}>
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className={cn("text-base sm:text-lg  xl:text-xl text-supporting-mediumGray", space_mono.className)}>
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
