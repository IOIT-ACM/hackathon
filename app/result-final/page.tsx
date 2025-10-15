import { Space_Mono, VT323 } from "next/font/google";
import { cn } from "@/lib/utils";
import Footer from "@/components/footer";
import { Award } from "lucide-react";
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

// Final rankings from the hackathon
const finalResults = [
    { rank: 1, team_name: "AgriVision" },
    { rank: 2, team_name: "Code Cortex" },
    { rank: 3, team_name: "DevCult" },
    { rank: 4, team_name: "VoID" },
    { rank: 5, team_name: "0xHackers" },
    { rank: 6, team_name: "BichdeHueDost" },
    { rank: 7, team_name: "Avishkar" },
    { rank: 8, team_name: "ZeroKelvin" },
    { rank: 9, team_name: "GOATS" },
    { rank: 10, team_name: "Pivot Squad" },
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

                    {/* Mobile View: Card Layout */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
                        {finalResults.map(team => (
                            <div key={`mobile-final-${team.rank}`} className={cn(
                                "bg-gray-900/50 border border-gray-800 rounded-lg p-4 space-y-2",
                                team.rank === 1 ? "border-yellow-400" :
                                    team.rank === 2 ? "border-gray-300" :
                                        team.rank === 3 ? "border-amber-700" : ""
                            )}>
                                <p className={cn("text-2xl text-primary-white font-bold", space_mono.className)}>{team.team_name}</p>
                                <p className={cn("text-sm",
                                    team.rank === 1 ? "text-yellow-400" :
                                        team.rank === 2 ? "text-gray-300" :
                                            team.rank === 3 ? "text-amber-700" : "text-supporting-mediumGray",
                                    "pt-2", space_mono.className)}>
                                    Rank: {team.rank}{team.rank <= 3 ? " 🏆" : ""}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Desktop View: Table Layout */}
                    <div className="hidden md:block border border-gray-800 rounded-lg overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow className="border-b-gray-800 bg-gray-900/50">
                                    <TableHead className={cn("w-[120px] text-lg text-primary-white", space_mono.className)}>Rank</TableHead>
                                    <TableHead className={cn("text-lg text-primary-white", space_mono.className)}>Team Name</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {finalResults.map(team => (
                                    <TableRow key={`desktop-final-${team.rank}`} className={cn(
                                        "border-b-gray-800",
                                        team.rank === 1 ? "bg-yellow-400/10" :
                                            team.rank === 2 ? "bg-gray-300/10" :
                                                team.rank === 3 ? "bg-amber-700/10" : ""
                                    )}>
                                        <TableCell className={cn(
                                            "font-medium text-lg",
                                            team.rank === 1 ? "text-yellow-400" :
                                                team.rank === 2 ? "text-gray-300" :
                                                    team.rank === 3 ? "text-amber-700" : "text-supporting-mediumGray",
                                            space_mono.className
                                        )}>{team.rank}{team.rank <= 3 ? " 🏆" : ""}</TableCell>
                                        <TableCell className={cn("text-primary-white text-lg font-bold", space_mono.className)}>{team.team_name}</TableCell>
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
