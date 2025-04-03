"use client";
import { useState, useEffect } from "react";

const Countdown = () => {
  const targetDate = new Date("2025-04-06T07:00:00").getTime();
  const [timeLeft, setTimeLeft] = useState(targetDate - new Date().getTime());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(targetDate - new Date().getTime());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return {
      hours: String(hours).padStart(2, "0"),
      minutes: String(minutes).padStart(2, "0"),
      seconds: String(seconds).padStart(2, "0"),
    };
  };

  const { hours, minutes, seconds } = formatTime(timeLeft);

  return (
    <div
      className="flex flex-col items-center justify-center text-white p-2 sm:p-6 text-3xl sm:text-5xl font-gotham font-bold w-full max-w-lg lg:max-w-xl"
      style={{
        background: "transparent",
        letterSpacing: "2px",
        mixBlendMode: "luminosity",
      }}
    >
      <div className="text-base sm:text-lg mb-2 uppercase tracking-widest opacity-80">
        Hacking Time Remaining
      </div>
      <div
        className="flex gap-4 px-6 py-4 rounded-lg min-w-[280px] sm:min-w-[336px]"
        style={{
          background: "transparent",
          border: "2px solid rgba(0, 255, 255, 0.5)",
          borderRadius: "1rem",
        }}
      >
        <span className="animate-pulse">{hours}</span>:
        <span className="animate-pulse">{minutes}</span>:
        <span className="animate-pulse">{seconds}</span>
      </div>
    </div>
  );
};

export default Countdown;
