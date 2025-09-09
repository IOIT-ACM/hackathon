import { Card } from "@/components/ui/card";
import { Train, Plane, Bus, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import phoneImg from "@/public/telephone.png";
import { cn } from "@/lib/utils";
import { Space_Mono, VT323 } from "next/font/google";

const vt323 = VT323({
	weight: "400",
	subsets: ["latin"],
});
const space_mono = Space_Mono({
	weight: "400",
	subsets: ["latin"],
});

export default function ContactSection() {
	return (
		<div
			className={cn(
				"w-full text-primary-white p-6 md:p-12 lg:p-20 md:py-16 pt-[32px] sm:pt-[48px]  md:px-35",
				space_mono.className
			)}
		>
			<div className="max-w-7xl mx-auto space-y-12">
				<div className="flex items-start justify-between pb-8 md:pb-16">
					<div className="space-y-4">
						<div className="flex items-center justify-between">
							<h1
								className={cn(
									"text-[42px] md:text-6xl lg:text-8xl font-black leading-tight",
									vt323.className
								)}
							>
								How can we
								<br />
								Help you?
							</h1>
							<div className="block md:hidden">
								<Image
									src={phoneImg}
									alt="phone"
									height={100}
									width={100}
									className="hidden sm:block"
								/>
							</div>
						</div>

						<p className="text-supporting-mediumGray xxs:text-lg md:text-xl font-medium max-w-lg md:max-w-xl lg:max-w-2xl xl:maw-w-3xl">
							Hacker Experience is what we prioritize! Have questions, need
							assistance, or just want to connect? Feel free to reach out!
						</p>
					</div>
					<div className="hidden md:block mx-auto">
						<Image
							src={phoneImg}
							alt="phone"
							className="md:w-[168px] lg:w-[200px] xl:w-[220px]"
						/>
					</div>
				</div>

				<div className="grid grid-cols-3 md:grid-cols-3 gap-10">
					{/* <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl font-black">Call Us</h2>
            <div className="flex flex-row gap-8 text-supporting-mediumGray font-medium">
              <div>
                <p>+91 98692 61132</p>
                <p className="text-base text-supporting-mediumGray font-medium">
                  Uttara Kamat
                </p>
              </div>
              <div>
                <p>+91 93196 74300</p>
                <p className="text-base text-supporting-mediumGray font-medium">
                  Akshay Behl
                </p>
              </div>
            </div>
          </div> */}

					<div className="space-y-3  ">
						<h2
							className={cn("text-4xl md:text-5xl font-black", vt323.className)}
						>
							Call Us
						</h2>
						<div className="flex flex-row gap-10">
							{[
								{ name: "Aditya Godse", phone: "+91 72489 45402" },
								{ name: "Manasi Choudhari", phone: "+91 77418 83030" },
							].map((person) => (
								<div
									className="space-y-1 flex flex-col text-supporting-mediumGray font-medium"
									key={person.name}
								>
									<p
										className={cn(
											"font-bold mt-2 text-2xl text-supporting-mediumGray",
											vt323.className
										)}
									>
										{person.name}
									</p>
									<div className="inline-flex items-center gap-2 text-supporting-mediumGray hover:text-primary-white  transition-colors">
										<Phone className="h-5" />
										<p className={cn(space_mono.className)}>{person.phone}</p>
									</div>
								</div>
							))}
						</div>
					</div>

					<div className="space-y-2 col-span-3 md:col-span-1">
						<h2
							className={cn("text-4xl md:text-5xl font-black", vt323.className)}
						>
							Address
						</h2>
						<p className="text-base text-supporting-mediumGray font-medium">
							AISSMS Institute of Information Technology, Kennedy Road, <br />
							Near RTO, Pune - 411001, Maharashtra.
						</p>
					</div>
				</div>

				<div className="space-y-6">
					<h2
						className={cn(
							"text-3xl md:text-4xl xl:text-5xl font-black",
							vt323.className
						)}
					>
						Reaching AISSMS IOIT
					</h2>
					<div className="aspect-video w-full rounded-3xl overflow-hidden">
						<iframe
							src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=aissms%20ioit+(AISSMS%20IOIT)&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
							width="100%"
							height="100%"
							style={{ border: 0 }}
							allowFullScreen
							loading="lazy"
							referrerPolicy="no-referrer-when-downgrade"
						></iframe>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:py-16 py-2 ">
						<Card className="bg-transparent border-none p-4 space-y-4">
							<div className="flex md:items-start items-center gap-6 md:flex-col flex-row">
								<Train className="size-12 text-primary-white bg-supporting-mediumGray p-2 rounded-lg" />
								<h3
									className={cn(
										"font-black text-2xl text-primary-white",
										vt323.className
									)}
								>
									By Metro
								</h3>
							</div>
							<p className="md:text-base text-base text-supporting-mediumGray font-medium">
								The nearest metro stop is{" "}
								<b className="text-primary-white">R.T.O. Pune</b> on the{" "}
								<b className="text-primary-white">Aqua Line</b> right next to
								the venue, just a 2-3 minute walk. If you're traveling via the{" "}
								<b className="text-primary-white">Purple Line</b>, interchange
								at <b className="text-primary-white">District Court</b> station
								to the Aqua Line and alight at{" "}
								<b className="text-primary-white">Mangalwar Peth.</b>
							</p>
						</Card>

						<Card className="bg-transparent border-none p-4 space-y-4">
							<div className="flex md:items-start items-center gap-6 md:flex-col flex-row">
								<Plane className="size-12 text-primary-white bg-supporting-mediumGray p-2 rounded-lg" />
								<h3
									className={cn(
										"font-black text-2xl text-primary-white",
										vt323.className
									)}
								>
									By Flight
								</h3>
							</div>
							<p className="md:text-base text-base text-supporting-mediumGray font-medium">
								Daily flights operate to Pune International Airport from major
								cities like Delhi, Mumbai, Hyderabad, Bengaluru, and Chennai.
								The airport is around{" "}
								<b className="text-primary-white">10 km from the venue</b> and
								cab/auto fare is usually ₹200-₹300.
							</p>
						</Card>

						<Card className="bg-transparent border-none p-4 space-y-4">
							<div className="flex md:items-start items-center gap-6 md:flex-col flex-row">
								<Bus className="size-12 text-primary-white bg-supporting-mediumGray p-2 rounded-lg" />
								<h3
									className={cn(
										"font-black text-2xl text-primary-white",
										vt323.className
									)}
								>
									By Bus
								</h3>
							</div>
							<p className="md:text-base text-base text-supporting-mediumGray font-medium">
								<b className="text-primary-white">PMPML</b> buses connect most
								parts of the city. <br /> 💡{" "}
								<b className="text-primary-white">Tip:</b> Just open{" "}
								<b className="text-primary-white">Google Maps</b>, enter your
								starting location and set the destination to{" "}
								<b className="text-primary-white">AISSMS IOIT Pune</b>. Choose
								the public transport option, and it will show you live PMPML bus
								routes and timings.
							</p>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
}
