import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import schedule from "@/public/schedule.png";
import discordGreen from "@/public/DiscordGreen.png";
import { VT323, Space_Mono } from "next/font/google";
import { cn } from "@/lib/utils";
import { Phone } from "lucide-react";
import Footer from "@/components/footer";

const vt323 = VT323({
	weight: "400",
	subsets: ["latin"],
});
const space_mono = Space_Mono({
	weight: "400",
	subsets: ["latin"],
});
interface ScheduleProps {
	bgColor: string,
	title: string,
	description: string,
	time: string,
	endTime?: string,
	snacks?: boolean,
	inline?: boolean,
	h: string
}
interface ScheduleEvent {
	name: string,
	description: string,
	height: string,
	inline?: boolean,
	time?: string,
	endTime?: string,
}
interface ScheduleTab {
	title: string,
	date: string,
	events: ScheduleEvent[],
	end_time: string

}

const schedule_data: ScheduleTab[] = [
	{
		title: "Online Round",
		date: "11 Sep to 25 Sep",
		events: [
			{
				name: "Registrations",
				description: "",
				height: "250px",
				time: "11 Sep",
				endTime: "25 Sep"
			},
			{
				name: "Results",
				description: "",
				height: "20px",
				inline: true,
				time: "1 Oct",
			}
		],
		end_time: ""
	},
	{
		title: "Offline Round",
		date: "11 Oct",
		events: [
			{
				name: "Tenet Inauguration",
				description: "",
				time: "8:30 AM",
				height: "100px"
			},
			{
				name: "Hackathon Ice Breaker",
				description: "",
				time: "9:00 AM",
				height: "50px"
			},
			{
				name: "Hacking Round 1",
				description: "",
				time: "9:30 AM",
				height: "250px"

			},
			{
				name: "Mentoring Round 1",
				description: "",
				time: "12:00 AM",
				height: "150px"
			},
			{
				name: "Hacking Round 2",
				description: "",
				time: "1:30 PM",
				height: "350px"
			},
			{
				name: "Mentoring Round 2",
				description: "",
				time: "5:00 PM",
				height: "100px"
			},
			{
				name: "Submissions",
				description: "",
				time: "6:00 PM",
				height: "100px"
			},
			{
				name: "Hacking areas closed",
				description: "",
				time: "7:00 PM",
				height: "100px"
			},
			{
				name: "Prize Distribution",
				description: "",
				time: "8:00 PM",
				height: "50px"
			},

		],
		end_time: "8:30 PM"
	}
]


const Schedule = () => {
	const EventFlowBox = ({ h, bgColor, title, description, time, snacks, inline, endTime }: ScheduleProps) => {
		return (
			<div className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-4 font-gotham font-black">
				<div className={cn("font-bold text-xl sm:text-2xl mt-8 md:mt-0 text-primary-white min-w-[116px]", inline ? "md:my-auto" : "")}>
					{time}
				</div>
				<div className={cn("flex items-center gap-4 h-auto", inline ? "" : "md:mt-8")}>
					<div
						className="min-w-[100px]  bg-primary-white"
						style={{ height: h }}
					></div>
					<div className="flex flex-col">
						<div className={cn("text-lg xs:text-xl sm:text-2xl lg:text-3xl text-primary-white text-wrap", vt323.className, endTime ? "" : "")}>
							{title}
						</div>
						<div
							className={`${snacks ? "block" : "hidden"
								} text-[#FFA4AD] text-xl`}
						>
							+ SNACKS TIME!
						</div>
						{description && (
							<p className="text-sm xs:text-base sm:text-lg lg:text-xl text-supporting-mediumGray text-wrap">
								{description}
							</p>
						)}
					</div>
				</div>
				{endTime && <div className={cn("font-bold text-xl sm:text-2xl md:-mt-4 mb-5 text-primary-white min-w-[116px]")}>
					{endTime}
				</div>}
			</div>
		);
	};

	return (
		<>
			<div className="flex flex-col min-h-screen p-6 md:p-12 lg:p-16 md:py-16 pt-[32px] sm:pt-[48px]  md:px-35">
				<div className="max-w-7xl mx-auto mb-24 md:mb-32">
					<div className="grid md:grid-cols-[2fr_1fr] gap-8 items-center mx-auto">
						<div className="flex flex-col items-start gap-2">
							<div className={cn("text-primary-white text-[36px] xs:text-[42px] lg:text-[4rem] xl:text-[6rem] leading-tight font-black max-w-[95%] md:max-w-[85%] lg:max-w-[95%] xl:max-w-[90%]", vt323.className)}>
								Run of show for the Event
							</div>
							<p
								className={cn("w-full lg:max-w-[85%] text-supporting-mediumGray text-lg lg:text-[1.5rem] font-medium", space_mono.className)}
							>
								Get ready for a day packed with high-energy hacking, big ideas, and bold creations.

							</p>
						</div>
						<Image
							src={schedule}
							alt="schedule"
							className="lg:w-[250px] lg:h-[250px] w-32 h-32 md:w-48 md:h-48 hidden md:block"
						/>
					</div>
					<div className="max-w-7xl mx-auto grid  md:grid-cols-[1fr_2fr] gap-12 mt-10">
						<div className="space-y-8 animate-in duration-500 delay-300 md:sticky top-0">
							<h1 className={cn("text-6xl md:text-7xl lg:text-9xl font-black tracking-tighter animate-in duration-500 text-primary-white", vt323.className)}>
								Details
							</h1>
							<div className="space-y-4 animate-in duration-500 delay-500">
								<p className={cn("text-supporting-mediumGray text-lg", space_mono.className)}>

								</p>
								<p className={cn("text-supporting-mediumGray text-lg", space_mono.className)}>
									Join our Discord Community:
								</p>
								<a className=" " href="https://discord.gg/dkVV2VDw" >
									<Image src={discordGreen} className="w-[200px]" alt="discordLogo" />
								</a>


							</div>
						</div>
						<Tabs
							defaultValue={schedule_data[0].title}
							className="animate-in fade-in duration-500 delay-500 md:mt-5"
						>
							<TabsList className="bg-transparent mb-5 md:mb-11 flex gap-4 justify-start">
								{schedule_data.map(tab => <TabsTrigger
									value={tab.title}
									className={cn("sm:text-xl text-md font-bold text-supporting-mediumGray  sm:py-2 sm:px-5 p-2 border-2 border-supporting-mediumGray focus:border-primary-white", space_mono.className)} key={tab.title}
								>
									{tab.title}
								</TabsTrigger>
								)}

							</TabsList>
							{schedule_data.map(tab => <TabsContent key={tab.title} value={tab.title}>
								<div className={cn("w-full flex flex-col sm:flex-row justify-between sm:items-center py-8 font-gotham font-black text-primary-white", vt323.className)}>
									<div className="text-[28px] xs:text-[32px] sm:text-[48px] lg:text-[64px] text-nowrap ">
										{tab.date}
									</div>

								</div>
								<div className="ml-0">
									{tab.events.map(event => <EventFlowBox
										h={event.height}
										bgColor="#0275f6"
										time={event.time || ""}
										title={event.name}
										description={event.description}
										key={event.name}
										endTime={event.endTime}
										inline={event.inline}
									/>)}

									<div className="font-bold text-xl sm:text-2xl text-supporting-lightGr min-w-[116px] text-primary-white">
										{tab.end_time}
									</div>
								</div>
							</TabsContent>)}

						</Tabs>
					</div>
				</div>
				<Footer className="mt-auto mb-10" />
			</div>
		</>
	);
};

export default Schedule;
