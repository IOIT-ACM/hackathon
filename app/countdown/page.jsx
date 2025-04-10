"use client";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Spotlight } from "@/components/SpotlightEffect";

const Countdown = () => {
  // const targetDate = new Date("2025-04-06T07:00:00").getTime();
  // const [timeLeft, setTimeLeft] = useState(targetDate - new Date().getTime());

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setTimeLeft(targetDate - new Date().getTime());
  //   }, 1000);

  //   return () => clearInterval(timer);
  // }, [targetDate]);

  // const formatTime = (ms) => {
  //   const totalSeconds = Math.floor(ms / 1000);
  //   const hours = Math.floor(totalSeconds / 3600);
  //   const minutes = Math.floor((totalSeconds % 3600) / 60);
  //   const seconds = totalSeconds % 60;
  //   return {
  //     hours: String(hours).padStart(2, "0"),
  //     minutes: String(minutes).padStart(2, "0"),
  //     seconds: String(seconds).padStart(2, "0"),
  //   };
  // };

  // const { hours, minutes, seconds } = formatTime(timeLeft);

  return (
    <></>
    // <div className="relative flex  w-full overflow-hidden rounded-md bg-black/[0.6] antialiased md:items-center md:justify-center">
    //   <div className="absolute inset-0 overflow-hidden">
    //     <Spotlight
    //       className="-top-40 left-0 md:-top-20 md:left-60"
    //       fill="white"
    //     />
    //   </div>
    //   <div className="relative z-10 mx-auto w-full max-w-7xl px-4">
    //     <div className="flex flex-col items-center justify-center p-2 sm:p-6 text-5xl sm:text-[100px] md:text-[125px] xl:text-[160px] font-gotham font-bold w-full bg-opacity-50 bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-neutral-300 overflow-hidden min-h-screen">
    //       <div className="text-base sm:text-[28px] xl:text-[40px] mb-2 sm:mb-8 uppercase tracking-widest text-neutral-300">
    //         Hacking Time Remaining
    //       </div>
    //       <div className="flex gap-4 px-6 py-4 rounded-lg justify-center">
    //         <span className="animate-pulse">{hours}</span>:
    //         <span className="animate-pulse">{minutes}</span>:
    //         <span className="animate-pulse">{seconds}</span>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Countdown;
