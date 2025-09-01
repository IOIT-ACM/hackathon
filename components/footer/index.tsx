
import { Pixelify_Sans, VT323 } from "next/font/google";
import { cn } from "@/lib/utils";
const vt323 = VT323({
	weight: "400",
	subsets: ['latin']
});


const Footer = () => {
	return (
		<div className="md:overflow-hidden  items-center">
			<div
				className={cn(
					"text-supporting-mediumGray font-bold xl:text-lg md:text-base text-sm py-4 lg:pl-32 md:pl-16 pl-4 text-center my-20"
				)}
			>
				©{" "}
				<span className={cn("text-lg", vt323.className)}>
					2025 TENET Hackathon, All rights reserved
				</span>
			</div>
		</div>
	);
};

export default Footer;
