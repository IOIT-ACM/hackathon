
import { Pixelify_Sans, VT323 } from "next/font/google";
import { cn } from "@/lib/utils";
import React from "react";
const vt323 = VT323({
	weight: "400",
	subsets: ['latin']
});

interface FooterProps {
	className?: string
}

const Footer = ({ className }: FooterProps) => {
	return (

		<p
			className={cn(
				"text-supporting-mediumGray font-bold xl:text-lg md:text-base text-sm  mx-auto text-center "
				, className)}
		>
			©{" "}
			<span className={cn("text-lg", vt323.className)}>
				2025 TENET Hackathon, All rights reserved
			</span>
		</p>

	);
};

export default Footer;
