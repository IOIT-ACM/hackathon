"use client";
import { useState, useEffect, useRef } from "react";
import { VT323, Space_Mono } from "next/font/google";
import { cn } from "@/lib/utils";
import { Instagram, Linkedin } from "lucide-react";

const vt323 = VT323({
	weight: "400",
	subsets: ["latin"],
});
const space_mono = Space_Mono({
	weight: "400",
	subsets: ["latin"],
});

const Countdown = () => {
	const startDate = new Date(
		process.env.NEXT_PUBLIC_HACKATHON_START_TIME || "2025-10-11T08:00:00"
	).getTime();
	const endDate = new Date(
		process.env.NEXT_PUBLIC_HACKATHON_END_TIME || "2025-10-11T18:00:00"
	).getTime();

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
			setTimeLeft(now - endDate);
		}
	};

	useEffect(() => {
		updateCountdown();
		const timer = setInterval(updateCountdown, 1000);
		return () => clearInterval(timer);
	}, [startDate, endDate]);

	const formatTime = (ms) => {
		const totalSeconds = Math.max(0, Math.floor(ms / 1000));
		const days = String(Math.floor(totalSeconds / 86400)).padStart(2, "0");
		const hours = String(Math.floor((totalSeconds % 86400) / 3600)).padStart(2, "0");
		const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
		const seconds = String(totalSeconds % 60).padStart(2, "0");
		return { days, hours, minutes, seconds };
	};

	const { days, hours, minutes, seconds } = formatTime(timeLeft);

	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext("2d");

		const setCanvasSize = () => {
			canvas.height = window.innerHeight;
			canvas.width = window.innerWidth;
		};
		setCanvasSize();
		window.addEventListener("resize", setCanvasSize);

		const letters =
			"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ΔΩΣπφλ€£¥$¢";
		const fontSize = 14;
		let columns = Math.floor(canvas.width / fontSize);
		const drops = Array(columns)
			.fill(0)
			.map(() => Math.floor(Math.random() * -100));

		const draw = () => {
			ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			ctx.fillStyle = "#117B20";
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

		const interval = setInterval(draw, 35);
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
				: "TIME SINCE HACKATHON ENDED";

	return (
		<div className="relative flex w-full h-screen items-center justify-center bg-black overflow-hidden">
			<canvas ref={canvasRef} className="absolute inset-0 z-0" />
			<div className="relative z-10 text-center flex flex-col gap-6 px-4">
				<div
					className={`uppercase tracking-widest text-2xl sm:text-4xl font-matrix matrix-glow text-primary-white`}
				>
					{headerText}
				</div>

				<div
					className={cn(
						"flex justify-center gap-6 sm:gap-10 text-primary-white",
						vt323.className
					)}
				>
					{[
						{ value: days, label: "Days" },
						{ value: hours, label: "Hours" },
						{ value: minutes, label: "Minutes" },
						{ value: seconds, label: "Seconds" },
					].map(({ value, label }, i) => (
						<div key={i} className="flex flex-col items-center">
							<span className="matrix-glow glitch font-bold text-6xl sm:text-8xl md:text-9xl">
								{value}
							</span>
							<span
								className={cn(
									"text-xs sm:text-sm md:text-base mt-2 opacity-80",
									space_mono.className
								)}
							>
								{label}
							</span>
						</div>
					))}
				</div>

				<div
					className={cn(
						"text-primary-white text-sm sm:text-lg",
						phase !== "after" && "animate-pulse",
						space_mono.className
					)}
				>
					{phase === "before"
						? "[ PREPARE FOR THE HACK ]"
						: phase === "during"
							? "[ EXECUTE BEFORE TERMINATION ]"
							: (
								<div className="flex flex-col gap-2">
									<span>See you in TENET hack 2026</span>
									<span>Stay tuned and connect with us on social media</span>
									<div className="flex justify-center gap-6 mt-4">
										<div className="flex flex-col items-center gap-1">
											<a href="https://www.instagram.com/ioit__acm" target="_blank" rel="noopener noreferrer" className="text-primary-white hover:text-green-400 transition-colors">
												<Instagram size={24} />
											</a>
											<span className="text-xs text-primary-white opacity-80">ACM</span>
										</div>
										<div className="flex flex-col items-center gap-1">
											<a href="https://www.instagram.com/ioit_tenet/" target="_blank" rel="noopener noreferrer" className="text-primary-white hover:text-green-400 transition-colors">
												<Instagram size={24} />
											</a>
											<span className="text-xs text-primary-white opacity-80">Tenet</span>
										</div>
										<div className="flex flex-col items-center gap-1">
											<a href="https://www.linkedin.com/company/ioit-tenet" target="_blank" rel="noopener noreferrer" className="text-primary-white hover:text-green-400 transition-colors">
												<Linkedin size={24} />
											</a>
											<span className="text-xs text-primary-white opacity-80">Tenet</span>
										</div>
										<div className="flex flex-col items-center gap-1">
											<a href="https://www.linkedin.com/company/ioit-acm" target="_blank" rel="noopener noreferrer" className="text-primary-white hover:text-green-400 transition-colors">
												<Linkedin size={24} />
											</a>
											<span className="text-xs text-primary-white opacity-80">ACM</span>
										</div>
									</div>
								</div>
							)}
				</div>
			</div>

			<style jsx>{`
				.matrix-glow {
					text-shadow: 0 0 2px #00ff00, 0 0 4px var(--color-primary-white);
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