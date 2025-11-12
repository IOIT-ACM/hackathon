import { Space_Mono, VT323 } from "next/font/google";
import { cn } from "@/lib/utils";
import Footer from "@/components/footer";
import { Award } from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const vt323 = VT323({
    weight: '400',
    subsets: ['latin']
});

const space_mono = Space_Mono({
    weight: "400",
    subsets: ['latin']
});

// Final rankings from the hackathon with member details
const finalResults = [
    {
        rank: 1,
        team_name: "AgriVision",
        members: [
            "Mayuresh Marade",
            "Rugved Tanaji Sawant",
            "Omkar Shinde",
            "Sahil Jagtap",
        ],
    },
    {
        rank: 2,
        team_name: "Code Cortex",
        members: [
            "Akshit Rai",
            "Aman Ayubkhan Pathan",
            "Dhiraj Agrawal",
        ],
    },
    {
        rank: 3,
        team_name: "DevCult",
        members: [
            "Devansh Singh",
            "YASH SHINDE",
            "Vishal Chaure",
        ],
    },
    {
        rank: 4,
        team_name: "0xHackers",
        members: [
            "Deep Pawar",
            "Mayur Kshirsagar",
            "Vivek Namdev Latpate",
            "Tanushri Rajput",
        ],
    },
    {
        rank: 5,
        team_name: "GOATS",
        members: [
            "Jacell Jamble",
            "Chaitanya Jathan",
            "Shubham Adkhale",
            "Adrian",
        ],
    },
    {
        rank: 6,
        team_name: "BichdeHueDost",
        members: [
            "Md Sufiyan Sajid Sajan",
            "Shreyash Milind Chilip",
            "Ram Narendra Belitkar",
            "Ashwin Mathur",
        ],
    },
    {
        rank: 7,
        team_name: "VoID",
        members: [
            "Vinisha Kumar Bhagwani",
            "Maaz Qamar Khan",
            "Madhav Kiran Shah",
            "Apurva Ashok Khangal",
        ],
    },
    {
        rank: 8,
        team_name: "Pivot Squad",
        members: [
            "Trishit Guin",
            "Manas Narendra Yeola",
            "Sanket Sanjay Naikwade",
        ],
    },
    {
        rank: 9,
        team_name: "Avishkar",
        members: [
            "Aavishkar Suresh Bhusare",
            "Nilesh Satish Dhole",
            "Aditya Ravsaheb Jadhav",
            "Ashwin Fula",
        ],
    },
    {
        rank: 10,
        team_name: "ZeroKelvin",
        members: [
            "Yash Rao",
            "Darsh Nanavati",
            "Rashi Bahekar",
            "Aaradhya Sonawane",
        ],
    },
];

export default function ResultsSection() {
    return (
        <div className="min-h-screen text-primary-white p-6 md:p-12 lg:p-16 pt-24 sm:pt-28">
            <div className="max-w-5xl mx-auto animate-in fade-in duration-500">

                {/* Page Header */}
                <div className="space-y-4 text-center mb-16 md:mb-24">
                    <h1 className={cn("text-6xl md:text-7xl lg:text-9xl font-black leading-tight", vt323.className)}>
                        Final Results
                    </h1>
                    <p className={cn("text-supporting-mediumGray text-lg md:text-xl max-w-2xl mx-auto", space_mono.className)}>
                        Huge congratulations to every team for their hard work and dedication. We are thrilled to announce the final rankings below.
                    </p>
                </div>

                {/* Final Rankings Section */}
                <div className="mb-16 md:mb-24">
                    <div className="flex items-center gap-4 mb-8">
                        <Award className="h-10 w-10 text-yellow-400" />
                        <h2 className={cn("text-4xl md:text-5xl font-black text-yellow-400", vt323.className)}>
                            Final Rankings
                        </h2>
                    </div>

                    {/* Mobile View: Accordion Card Layout */}
                    <div className="md:hidden">
                        <Accordion type="single" collapsible className="space-y-4">
                            {finalResults.map(team => (
                                <AccordionItem value={`item-mobile-${team.rank}`} key={`mobile-final-${team.rank}`} className={cn(
                                    "bg-gray-900/50 border border-gray-800 rounded-lg data-[state=open]:border-primary-white",
                                    team.rank === 1 ? "border-yellow-400" :
                                        team.rank === 2 ? "border-gray-300" :
                                            team.rank === 3 ? "border-amber-700" : ""
                                )}>
                                    <AccordionTrigger className="p-4 w-full text-left hover:no-underline [&>svg]:text-primary-white" disabled={team.members.length === 0}>
                                        <div className="w-full">
                                            <p className={cn("text-2xl text-primary-white font-bold", space_mono.className)}>{team.team_name}</p>
                                            <p className={cn("text-sm",
                                                team.rank === 1 ? "text-yellow-400" :
                                                    team.rank === 2 ? "text-gray-300" :
                                                        team.rank === 3 ? "text-amber-700" : "text-supporting-mediumGray",
                                                "pt-2", space_mono.className)}>
                                                Rank: {team.rank}{team.rank <= 3 ? " 🏆" : ""}
                                            </p>
                                        </div>
                                    </AccordionTrigger>
                                    {team.members.length > 0 && (
                                        <AccordionContent className="px-4 pb-4">
                                            <h4 className={cn("text-md font-semibold text-primary-white mb-2", space_mono.className)}>Team Members:</h4>
                                            <ul className="list-disc pl-5 space-y-1">
                                                {team.members.map((member, index) => (
                                                    <li key={index} className={cn("text-sm text-supporting-mediumGray", space_mono.className)}>{member}</li>
                                                ))}
                                            </ul>
                                        </AccordionContent>
                                    )}
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>

                    {/* Desktop View: Accordion Table Layout */}
                    <div className="hidden md:block border border-gray-800 rounded-lg overflow-hidden">
                        <div className="flex border-b border-b-gray-800 bg-gray-900/50 font-bold">
                            <div className={cn("w-[120px] p-4 text-lg text-primary-white", space_mono.className)}>Rank</div>
                            <div className={cn("flex-1 p-4 text-lg text-primary-white", space_mono.className)}>Team Name</div>
                        </div>
                        <Accordion type="single" collapsible className="w-full">
                            {finalResults.map(team => (
                                <AccordionItem value={`item-desktop-${team.rank}`} key={`desktop-final-${team.rank}`} className="border-b border-gray-800 last:border-b-0">
                                    <AccordionTrigger className={cn(
                                        "flex w-full text-left p-0 hover:no-underline hover:bg-gray-900/70 data-[state=open]:bg-gray-900/90 [&>svg]:text-primary-white [&>svg]:mr-4",
                                        team.members.length === 0 ? "cursor-default" : "cursor-pointer",
                                        team.rank === 1 ? "bg-yellow-400/10" :
                                            team.rank === 2 ? "bg-gray-300/10" :
                                                team.rank === 3 ? "bg-amber-700/10" : ""
                                    )} disabled={team.members.length === 0}>
                                        <div className={cn(
                                            "w-[120px] p-4 font-medium text-lg shrink-0",
                                            team.rank === 1 ? "text-yellow-400" :
                                                team.rank === 2 ? "text-gray-300" :
                                                    team.rank === 3 ? "text-amber-700" : "text-supporting-mediumGray",
                                            space_mono.className
                                        )}>{team.rank}{team.rank <= 3 ? " 🏆" : ""}</div>
                                        <div className={cn("flex-1 p-4 text-primary-white text-lg font-bold text-left", space_mono.className)}>{team.team_name}</div>
                                    </AccordionTrigger>
                                    {team.members.length > 0 && (
                                        <AccordionContent className="bg-gray-900/50 p-4">
                                            <h4 className={cn("text-lg font-semibold text-primary-white mb-2", space_mono.className)}>Team Members:</h4>
                                            <ul className="list-disc pl-5 space-y-1">
                                                {team.members.map((member, index) => (
                                                    <li key={index} className={cn("text-supporting-mediumGray", space_mono.className)}>{member}</li>
                                                ))}
                                            </ul>
                                        </AccordionContent>
                                    )}
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>
            </div>
            <Footer className="my-20" />
        </div>
    );
}
