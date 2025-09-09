"use client";
import { useState, useEffect, useRef } from "react";


const Countdown = () => {
	const startDate = new Date("2025-10-11T08:00:00").getTime();
	const endDate = new Date("2025-10-11T18:00:00").getTime();
	const [timeLeft, setTimeLeft] = useState(0);
	const [phase, setPhase] = useState("before");
	const canvasRef = useRef(null);

	const updateCountdown = () => {
		const now = Date.now();
		if (now < startDate) {
			setPhase("before");
			setTimeLeft(startDate - now);
		} else if (now >= startDate && now < endDate) {
			setPhase("during");
			setTimeLeft(endDate - now);
		} else {
			setPhase("after");
			setTimeLeft(0);
		}
	};

	useEffect(() => {
		updateCountdown();
		const timer = setInterval(updateCountdown, 1000);
		return () => clearInterval(timer);
	}, [startDate, endDate]);

	const formatTime = (ms) => {
		const totalSeconds = Math.max(0, Math.floor(ms / 1000));
		const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
		const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
		const seconds = String(totalSeconds % 60).padStart(2, "0");
		return { hours, minutes, seconds };
	};

	const { hours, minutes, seconds } = formatTime(timeLeft);

	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext("2d");

		const setCanvasSize = () => {
			canvas.height = window.innerHeight;
			canvas.width = window.innerWidth;
		};
		setCanvasSize();
		window.addEventListener("resize", setCanvasSize);

		const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ΔΩΣπφλ€£¥$¢";
		const fontSize = 14;
		let columns = Math.floor(canvas.width / fontSize);
		const drops = Array(columns).fill(1);

		const draw = () => {
			ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			ctx.fillStyle = "#0F0";
			ctx.font = `${fontSize}px monospace`;
			for (let i = 0; i < drops.length; i++) {
				const text = letters.charAt(Math.floor(Math.random() * letters.length));
				ctx.fillText(text, i * fontSize, drops[i] * fontSize);
				if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
					drops[i] = 0;
				}
				drops[i]++;
			}
		};

		const interval = setInterval(draw, 50);
		return () => {
			clearInterval(interval);
			window.removeEventListener("resize", setCanvasSize);
		};
	}, []);

	const headerText =
		phase === "before"
			? "HACKING BEGINS IN"
			: phase === "during"
				? "HACKING TIME LEFT"
				: "TIME'S UP";

	const isAfter = phase === "after";

	return (
		<div className="relative flex w-full h-screen items-center justify-center bg-black overflow-hidden">
			<canvas ref={canvasRef} className="absolute inset-0 z-0" />
			<div className="relative z-10 text-center flex flex-col gap-6 px-4">
				<div
					className={`uppercase tracking-widest text-2xl sm:text-4xl font-matrix matrix-glow ${isAfter ? "text-red-500" : "text-green-400"
						}`}
				>
					{headerText}
				</div>

				{isAfter ? (
					<div className="text-red-500 text-5xl sm:text-7xl font-matrix font-bold matrix-glow glitch animate-pulse">
						TIME'S UP
					</div>
				) : (
					<div className="flex justify-center gap-4 text-6xl sm:text-8xl font-matrix font-bold text-green-400 matrix-glow glitch">
						<span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
					</div>
				)}

				{!isAfter && (
					<div className="text-green-400 opacity-70 text-sm sm:text-lg font-matrix animate-pulse">
						{phase === "before"
							? "[ PREPARE FOR THE HACK ]"
							: "[ EXECUTE BEFORE TERMINATION ]"}
					</div>
				)}
			</div>

			<style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');

        .font-matrix {
          font-family: 'VT323', monospace;
        }

        .matrix-glow {
          text-shadow: 0 0 2px #00ff00, 0 0 4px #00ff00;
        }

        @keyframes glitch {
          0% {
            transform: translate(0);
          }
          20% {
            transform: translate(-0.5px, 0.5px);
          }
          40% {
            transform: translate(0.5px, -0.5px);
          }
          60% {
            transform: translate(-0.25px, 0.25px);
          }
          80% {
            transform: translate(0.25px, -0.25px);
          }
          100% {
            transform: translate(0);
          }
        }

        .glitch {
          animation: glitch 1.5s infinite;
        }
      `}</style>
		</div>
	);
};

export default Countdown;
