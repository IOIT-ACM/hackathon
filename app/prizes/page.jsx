import PrizeSection from "@/components/PrizeSection";
import Image from "next/image";
import medal from "@/public/Medal.png";
import cup_green from "@/public/prizesPageLogo/cup_green.svg";
import { sponsorTrackPrizesData } from "../../data/sponsorTrackPrizesData";
import TrackPrizeCard from "@/components/TrackPrizeCard";
import { Space_Mono, VT323 } from "next/font/google";
import Footer from "@/components/footer";
import { cn } from "@/lib/utils";
import { ShieldCheck } from "lucide-react";
const vt323 = VT323({
	weight: "400",
	subsets: ["latin"],
});
const space_mono = Space_Mono({
	weight: "400",
	subsets: ["latin"],
});
export default function Prizes() {
	return (
		<div
			className={cn(
				"w-full text-primary-white p-6 md:p-12 lg:p-20 md:py-16 pt-[32px] sm:pt-[48px]  md:px-35",
				space_mono.className
			)}
		>
			<div className="flex flex-col min-h-screen md:pt-16 pb-40 pt-[32px] xl:pt-[48px]">
				<div className="w-full flex flex-col gap-10 md:gap-0">
					<div className="flex justify-between px-4 md:px-16 lg:px-28 monitor:px-32">
						<div className="flex flex-col items-start gap-2">
							<p
								className={cn(
									"text-primary-white text-[36px] xs:text-[3rem] md:text-[3.5rem] lg:text-[5rem] xl:text-[6rem] leading-tight font-black max-w-[95%]",
									vt323.className
								)}
							>
								Prizes for the Winners
							</p>
							<div className="flex flex-col items-start gap-3 md:gap-4">
								<p
									className="w-full xl:max-w-[85%] text-supporting-mediumGray
                md:text-xl lg:text-2xl text-lg xs:text-md font-medium"
								>
									Collaborate and innovate to build something awesome !
								</p>
								<div className="rounded-full  border-[#1D4E1C] border-2 bg-[#141710]  px-4 py-1">
									<p
										className="w-full md:text-xl lg:text-2xl text-lg  text-supporting-mediumGray
                  text-center "
									>
										Top 10 Winning Teams also get .xyz domains for a year. 🌟
									</p>
								</div>
							</div>
						</div>
						<Image
							src={medal}
							alt="Medal"
							className="w-[300px] h-[300px] md:w-[200px] md:h-[200px] lg:w-[300px] lg:h-[300px] hidden md:block"
						/>
					</div>
					<div className="flex flex-col gap-6 md:gap-8 sm:mt-14">
						<PrizeSection />
						<div className="w-full flex flex-col  md:flex-row gap-10">
							<div
								className="flex items-center gap-4 md:gap-12 px-4 xs:px-6 py-6 
                  flex-row md:px-6 w-full bg-[#141710] border-[#1D4E1C] border-2"
							>
								<Image
									src={cup_green}
									alt="cup"
									className="w-[4.7rem] h-[4.7rem]"
								/>
								<div className="w-full flex flex-col  md:items-start gap-2">
									<p
										className={cn(
											"text-primary-white text-[2.5rem] font-bold ",
											vt323.className
										)}
									>
										Top 10 Teams
									</p>
									<p className="text-supporting-mediumGray text-[1.5rem] font-semibold">
										Domain Names Worth 10k For Top 10 Teams
									</p>
								</div>
							</div>
							<div
								className="flex  items-center gap-4 md:gap-12 px-4 xs:px-6 py-6 
                  flex-row md:px-6 w-full bg-[#141710] border-[#1D4E1C] border-2"
							>
								<Image
									src={cup_green}
									alt="cup"
									className="w-[4.7rem] h-[4.7rem]"
								/>
								<div className="w-full flex flex-col  md:items-start gap-2">
									<p
										className={cn(
											"text-primary-white text-[2.5rem] font-bold ",
											vt323.className
										)}
									>
										Goodies
									</p>
									<p className="text-supporting-mediumGray text-[1.5rem] font-semibold">
										{" "}
										Goodies & Merch for Top 10 Teams{" "}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
