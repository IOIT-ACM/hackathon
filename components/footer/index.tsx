import { VT323 } from "next/font/google";
import { cn } from "@/lib/utils";
import React from "react";
import { Instagram, Linkedin } from "lucide-react";
import Link from "next/link";

const vt323 = VT323({
	weight: "400",
	subsets: ['latin']
});

interface FooterProps {
	className?: string
}

const Footer = ({ className }: FooterProps) => {
	return (
		<div className={cn("mx-auto text-center", className)}>
			<div className="flex justify-center gap-6 mb-4">
				<div className="flex flex-col items-center gap-1">
					<Link href="https://www.instagram.com/ioit__acm" target="_blank" rel="noopener noreferrer">
						<Instagram className="text-supporting-mediumGray hover:text-primary-white transition-colors" />
					</Link>
					<span className="text-xs text-supporting-mediumGray">ACM</span>
				</div>
				<div className="flex flex-col items-center gap-1">
					<Link href="https://www.instagram.com/ioit_tenet/" target="_blank" rel="noopener noreferrer">
						<Instagram className="text-supporting-mediumGray hover:text-primary-white transition-colors" />
					</Link>
					<span className="text-xs text-supporting-mediumGray">Tenet</span>
				</div>
				<div className="flex flex-col items-center gap-1">
					<Link href="https://www.linkedin.com/company/ioit-tenet" target="_blank" rel="noopener noreferrer">
						<Linkedin className="text-supporting-mediumGray hover:text-primary-white transition-colors" />
					</Link>
					<span className="text-xs text-supporting-mediumGray">Tenet</span>
				</div>
				<div className="flex flex-col items-center gap-1">
					<Link href="https://www.linkedin.com/company/ioit-acm" target="_blank" rel="noopener noreferrer">
						<Linkedin className="text-supporting-mediumGray hover:text-primary-white transition-colors" />
					</Link>
					<span className="text-xs text-supporting-mediumGray">ACM</span>
				</div>
			</div>
			<p
				className={cn(
					"text-supporting-mediumGray font-bold xl:text-lg md:text-base text-sm"
				)}
			>
				©{" "}
				<span className={cn("text-lg", vt323.className)}>
					2025 TENET Hackathon, All rights reserved
				</span>
			</p>
		</div>
	);
};

export default Footer;