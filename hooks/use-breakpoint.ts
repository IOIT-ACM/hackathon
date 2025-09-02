import { useState, useEffect } from "react";

const breakpoints = {
	sm: 640,
	md: 768,
	lg: 1024,
	xl: 1280,
};

export function useBreakpoint() {
	const [width, setWidth] = useState(window.innerWidth);

	useEffect(() => {
		const onResize = () => setWidth(window.innerWidth);
		window.addEventListener("resize", onResize);
		return () => window.removeEventListener("resize", onResize);
	}, []);

	if (width < breakpoints.sm) return "xs";
	if (width < breakpoints.md) return "sm";
	if (width < breakpoints.lg) return "md";
	if (width < breakpoints.xl) return "lg";
	return "xl";
}
