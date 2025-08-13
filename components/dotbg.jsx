// components/DotBackground.js
"use client";
import { useRef, useEffect } from "react";

const InteractiveBackground = ({ children }) => {
	const canvasRef = useRef(null);
	const hexes = useRef([]);

	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext("2d");
		let cw = window.innerWidth;
		let ch = window.innerHeight;
		canvas.width = cw;
		canvas.height = ch;

		let offsetX, offsetY;
		const reOffset = () => {
			const BB = canvas.getBoundingClientRect();
			offsetX = BB.left;
			offsetY = BB.top;
		};

		const initHexes = () => {
			const hexRadius = 1.5;
			const hexPadding = 50;
			hexes.current = [];

			for (let y = hexRadius; y < ch; y += hexRadius * 2 + hexPadding) {
				for (let x = hexRadius; x < cw; x += hexRadius * 2 + hexPadding) {
					hexes.current.push({
						startingX: x,
						startingY: y,
						x,
						y,
						highlight: 0, // highlight intensity (0 = normal, 1 = max)
					});
				}
			}
		};

		let mouseIsDown = false;
		let mx = 0,
			my = 0;
		const mouseRadius = 75;
		const mouseRadiusSquared = mouseRadius * mouseRadius;
		let ticktick = 0;
		let time = 0;

		const draw = () => {
			ctx.clearRect(0, 0, cw, ch);
			hexes.current.forEach((h) => {
				// Base wave effect
				const wave = Math.sin((h.x + time * 40) / 120) * 10;
				const baseLightness = 30;
				let lightness = baseLightness + wave;

				// If highlighted from interaction, blend towards a lighter color
				if (h.highlight > 0) {
					lightness = lightness + h.highlight * 20; // make it brighter
					h.highlight = Math.max(0, h.highlight - 0.02); // fade out
				}

				// Slight blue tint
				ctx.fillStyle = `hsl(210, 10%, ${lightness}%)`;
				ctx.fillRect(h.x, h.y, 4, 4);
			});
		};

		const tick = () => {
			time += 0.02;

			hexes.current.forEach((h) => {
				const dx = h.x - mx;
				const dy = h.y - my;

				if (mouseIsDown && dx * dx + dy * dy < mouseRadiusSquared) {
					h.x += dx / 30;
					h.y += dy / 30;
					h.highlight = 1; // fully highlight on interaction
					ticktick++;
					if (ticktick > 20) {
						mouseIsDown = false;
						ticktick = 0;
					}
				} else if (h.x === h.startingX && h.y === h.startingY) {
					// Do nothing if perfectly aligned
				} else {
					const ddx = h.x - h.startingX;
					const ddy = h.y - h.startingY;
					h.x -= ddx / 20;
					h.y -= ddy / 20;
				}
			});

			draw();
			requestAnimationFrame(tick);
		};

		const handleMouseMove = (e) => {
			mx = e.clientX - offsetX;
			my = e.clientY - offsetY;
			mouseIsDown = true;
			ticktick = 0;
		};

		const handleMouseUp = () => {
			mouseIsDown = false;
		};

		const handleResize = () => {
			cw = window.innerWidth;
			ch = window.innerHeight;
			canvas.width = cw;
			canvas.height = ch;
			initHexes();
			reOffset();
		};

		reOffset();
		initHexes();
		draw();
		requestAnimationFrame(tick);

		window.addEventListener("resize", handleResize);
		window.addEventListener("mousemove", handleMouseMove);
		window.addEventListener("mouseup", handleMouseUp);

		return () => {
			window.removeEventListener("resize", handleResize);
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("mouseup", handleMouseUp);
		};
	}, []);

	return (
		<div style={{ position: "relative", width: "100vw" }}>
			<canvas
				ref={canvasRef}
				style={{
					position: "fixed",
					top: 0,
					left: 0,
					width: "100%",
					height: "100%",
					zIndex: -100,
					pointerEvents: "none",
				}}
				className="sm:px-12 py-8 px-1"
			/>
			{children}
		</div>
	);
};

export default InteractiveBackground;
