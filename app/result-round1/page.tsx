import { Space_Mono, VT323 } from "next/font/google";
import { cn } from "@/lib/utils";
import Footer from "@/components/footer";
import { Star, Award } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const vt323 = VT323({
    weight: '400',
    subsets: ['latin']
});

const space_mono = Space_Mono({
    weight: "400",
    subsets: ['latin']
});

const shortlistedTeams = [
    { sr_no: 1, team_name: "Byte Builders", team_leader_name: "Jaishree Epili" },
    { sr_no: 2, team_name: "0xHackers", team_leader_name: "Deep Pawar" },
    { sr_no: 3, team_name: "Stranger Strings", team_leader_name: "Varun Rahatgaonkar" },
    { sr_no: 4, team_name: "Hacktrix", team_leader_name: "Anushka Kawalkar" },
    { sr_no: 5, team_name: "Fsociety", team_leader_name: "Kundan Sachin Patil" },
    { sr_no: 6, team_name: "CKL", team_leader_name: "Ajay Singh Tomar" },
    { sr_no: 7, team_name: "Pivot Squad", team_leader_name: "Trishit Guin" },
    { sr_no: 8, team_name: "GitGoneWild", team_leader_name: "Hetansh" },
    { sr_no: 9, team_name: "Techno Tribe", team_leader_name: "Piyush Diwakar Joshi" },
    { sr_no: 10, team_name: "CONFUSION MATRIX", team_leader_name: "Ketan Talegave" },
    { sr_no: 11, team_name: "Code Cortex", team_leader_name: "Akshit Rai" },
    { sr_no: 12, team_name: "ArgoNauts", team_leader_name: "Aditya Sahu" },
    { sr_no: 13, team_name: "DevCult", team_leader_name: "Devansh Singh" },
    { sr_no: 14, team_name: "GreenGrid", team_leader_name: "Shaunak Hawaldar" },
    { sr_no: 15, team_name: "404 Error", team_leader_name: "Sanika Bavaskar" },
    { sr_no: 16, team_name: "rocks", team_leader_name: "Hrushikesh Pandarkar" },
    { sr_no: 17, team_name: "MEDIMATES", team_leader_name: "Harsh Pawar" },
    { sr_no: 18, team_name: "Cheetah", team_leader_name: "Anshul Sharma" },
    { sr_no: 19, team_name: "Falcons", team_leader_name: "Sarthak Patil" },
    { sr_no: 20, team_name: "The LuckyHackers", team_leader_name: "Yash Pakale" },
    { sr_no: 21, team_name: "Manas", team_leader_name: "Tejas Uplanchwar" },
    { sr_no: 22, team_name: "BichdeHueDost", team_leader_name: "Md Sufiyan Sajid Sajan" },
    { sr_no: 23, team_name: "Team Techolic", team_leader_name: "Arun Govind" },
    { sr_no: 24, team_name: "GOATS", team_leader_name: "Jacell Jamble" },
    { sr_no: 25, team_name: "Avishkar", team_leader_name: "Aavishkar Bhusare" },
    { sr_no: 26, team_name: "Green Karma", team_leader_name: "Renuka Patil" },
    { sr_no: 27, team_name: "Dot Developers", team_leader_name: "Mohammad Ali Ansari" },
    { sr_no: 28, team_name: "Tech Trio", team_leader_name: "Jidnyasa Patil" },
    { sr_no: 29, team_name: "Data Drivers", team_leader_name: "Yash Gunjal" },
    { sr_no: 30, team_name: "AgriVision", team_leader_name: "Mayuresh Marade" },
    { sr_no: 31, team_name: "ETL Sapiens", team_leader_name: "Dawkhar Sandesh Prakash" },
    { sr_no: 32, team_name: "Hackronauts", team_leader_name: "Harsh Kumar" },
    { sr_no: 33, team_name: "VoID", team_leader_name: "Vinisha Kumar Bhagwani" },
    { sr_no: 34, team_name: "full stack force", team_leader_name: "Vijaya Kumar" },
    { sr_no: 35, team_name: "XtraFusion", team_leader_name: "Om Sachin Salunke" },
    { sr_no: 36, team_name: "ZeroKelvin", team_leader_name: "Yash Rao" },
    { sr_no: 37, team_name: "Athenians", team_leader_name: "Tanishka Nikam" },
    { sr_no: 38, team_name: "Rookie Geeks", team_leader_name: "Pruthviraj Gawande" },
    { sr_no: 39, team_name: "Oppenheimer", team_leader_name: "Sarthak Viche" },
    { sr_no: 40, team_name: "CodeNomads", team_leader_name: "Aditya Chaubey" },
    { sr_no: 41, team_name: "CodeFusion", team_leader_name: "Mehek Khan" },
    { sr_no: 42, team_name: "AlgoAlliance", team_leader_name: "Yash Kanse" },
    { sr_no: 43, team_name: "HackaHolics", team_leader_name: "Atharva Akhil Salitri" },
    { sr_no: 44, team_name: "Runtime Terror", team_leader_name: "Srinidhi Kulkarni" },
    { sr_no: 45, team_name: "Bug busters", team_leader_name: "Sumeet Attri" },
];


export default function ResultsSection() {
    return (
        <div className="min-h-screen text-primary-white p-6 md:p-12 lg:p-16 pt-24 sm:pt-28">
            <div className="max-w-5xl mx-auto animate-in fade-in duration-500">

                {/* Page Header */}
                <div className="space-y-4 text-center mb-16 md:mb-24">
                    <h1 className={cn("text-6xl md:text-7xl lg:text-9xl font-black leading-tight", vt323.className)}>
                        Round 1 Results
                    </h1>
                    <p className={cn("text-supporting-mediumGray text-lg md:text-xl max-w-2xl mx-auto", space_mono.className)}>
                        Huge congratulations to every team for their hard work and dedication. We are thrilled to announce the results below.
                    </p>
                </div>

                {/* Shortlisted Teams Section */}
                <div className="mb-16 md:mb-24">
                    <div className="flex items-center gap-4 mb-8">
                        <Star className="h-10 w-10 text-yellow-400" />
                        <h2 className={cn("text-4xl md:text-5xl font-black text-yellow-400", vt323.className)}>
                            Shortlisted Teams
                        </h2>
                    </div>

                    {/* Mobile View: Card Layout */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
                        {shortlistedTeams.map(team => (
                            <div key={`mobile-shortlisted-${team.sr_no}`} className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 space-y-2">
                                <p className={cn("text-2xl text-primary-white font-bold", space_mono.className)}>{team.team_name}</p>
                                <p className={cn("text-supporting-mediumGray", space_mono.className)}>Led by: {team.team_leader_name}</p>
                                <p className={cn("text-sm text-yellow-400 pt-2", space_mono.className)}>Sr. No: {team.sr_no}</p>
                            </div>
                        ))}
                    </div>

                    {/* Desktop View: Table Layout */}
                    <div className="hidden md:block border border-gray-800 rounded-lg overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow className="border-b-gray-800 bg-gray-900/50">
                                    <TableHead className={cn("w-[120px] text-lg text-primary-white", space_mono.className)}>Sr. No.</TableHead>
                                    <TableHead className={cn("text-lg text-primary-white", space_mono.className)}>Team Name</TableHead>
                                    <TableHead className={cn("text-lg text-primary-white", space_mono.className)}>Team Leader</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {shortlistedTeams.map(team => (
                                    <TableRow key={`desktop-shortlisted-${team.sr_no}`} className="border-b-gray-800">
                                        <TableCell className={cn("font-medium text-supporting-mediumGray text-lg", space_mono.className)}>{team.sr_no}</TableCell>
                                        <TableCell className={cn("text-primary-white text-lg font-bold", space_mono.className)}>{team.team_name}</TableCell>
                                        <TableCell className={cn("text-supporting-mediumGray text-lg", space_mono.className)}>{team.team_leader_name}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
            <Footer className="my-20" />
        </div>
    );
}