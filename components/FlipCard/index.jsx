"use client";
import { cn } from "@/lib/utils";
import bravehacker from "@/public/bravehacker.svg";
import Image from "next/image";
import tpclogo from "@/public/HomePageLogo/tpclogo.svg";
import institutelogo from "@/public/HomePageLogo/Institutelogo.svg";
import cardbg from "@/public/cardbg.svg";
import hackthepro from "@/public/hackthepro.svg";
import { useState } from "react";

export default function FlipCard({
  title,
  description,
  rotate = "y",
  className,
  ...props
}) {
  const [isFlipped, setIsFlipped] = useState(false);

  const rotationClass = {
    x: [
      "group-hover:[transform:rotateX(180deg)]",
      "[transform:rotateX(180deg)]",
    ],
    y: [
      "group-hover:[transform:rotateY(180deg)]",
      "[transform:rotateY(180deg)]",
    ],
  };
  const self = rotationClass[rotate];

  const handleClick = () => {
    setIsFlipped((prev) => !prev);
  };

  return (
    <div
      className={cn(
        "group w-[300px] h-[390px] sm:w-[384px] sm:h-[500px] perspective-[1000px]",
        className
      )}
      onClick={handleClick}
      {...props}
    >
      <div
        className={cn(
          "relative h-full rounded-2xl transition-all duration-500 transform-3d",
          isFlipped ? self[1] : self[0]
        )}
      >
        {/* Front */}
        <div className="absolute h-full w-full backface-hidden border-16 border-white rounded-[48px] sm:rounded-[60px]">
          <div className="relative">
            <Image src={cardbg} alt="Card-bg" className="h-full w-full" />
            <Image
              src={hackthepro}
              alt="HackTheProtocol"
              className="w-60 pb-16 absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
            />
          </div>
        </div>

        {/* Back */}
        <div
          className={cn(
            "absolute h-full w-full bg-transparent p-4 text-slate-200 backface-hidden border-16 border-white rounded-[48px] sm:rounded-[60px]",
            isFlipped ? self[0] : self[1]
          )}
        >
          <div className="flex flex-col h-full justify-between items-center">
            <div className="flex flex-col gap-6 sm:gap-10 sm:mt-20 items-center">
              <Image className="w-52 sm:w-64" src={bravehacker} alt="brave-Hacker" />
              <div className="font-gotham font-bold text-base text-center text-white px-4">
                {description}
              </div>
            </div>

            <div className="flex flex-col-reverse sm:flex-row gap-6 sm:justify-start justify-end items-center">
              <Image src={tpclogo} alt="TPCLogo" className="w-[150px]" />
              <Image
                src={institutelogo}
                alt="InstituteLogo"
                className="w-[80px]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
