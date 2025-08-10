
import { Pixelify_Sans } from "next/font/google";
import { cn } from "@/lib/utils";
const pixelify_sans = Pixelify_Sans({
	weight: "variable",
	subsets: ['latin']
});


const Footer = () => {
	return (
		<div className="md:overflow-hidden bg-[#161616] items-center">
			<div
				className={cn(
					"text-supporting-darkGray font-bold xl:text-lg md:text-base text-sm py-4 lg:pl-32 md:pl-16 pl-4 text-white text-center"
				)}
			>
				©{" "}
				<span className={pixelify_sans.className}>
					2025 TenetHack, All rights reserved
				</span>
			</div>
		</div>
	);
};

export default Footer;
