"use client";
import React, { useEffect, useRef, useState } from "react";
import InputInterest from "../ui/input-interest";
import { Canvas } from "@react-three/fiber";
import { BlendFunction } from "postprocessing";
import { Bloom, EffectComposer, Scanline } from "@react-three/postprocessing";
import { Svg } from "@react-three/drei";
import { Space_Mono, VT323 } from "next/font/google";
import { cn } from "@/lib/utils";
import { Phone } from "lucide-react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import registrationFormSchema from "./schema";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { teams } from "@/data/round1Teams";

const vt323 = VT323({
    weight: "400",
    subsets: ["latin"],
});
const space_mono = Space_Mono({
    weight: "400",
    subsets: ["latin"],
});

const App: React.FC = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);


    const [teamMemberCount, setTeamMemberCount] = useState(0);
    const [isFetchingTeamDetails, setIsFetchingTeamDetails] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");


    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    const {
        register,
        setValue,
        getValues,
        handleSubmit,
        formState: { errors },
        watch,
        trigger,
    } = useForm({
        resolver: zodResolver(registrationFormSchema),
        defaultValues: {
            teamId: "",
            teamLeader: {
                firstName: "",
                lastName: "",
                email: "",
            },
            transactionId: "",
        },
    });
    const selectedTeamId = watch("teamId");
    const onSubmit = async (data: {
        teamId: string;
        teamLeader: {
            firstName: string;
            lastName: string;
            phoneNumber: string;
            email: string;
        };
        transactionId: string;
    }) => {
        console.log(data);

        try {
            await axios.post("/api/round2_register", {
                data,
            });

            setIsSubmitted(true);
        } catch (error) {
            toast({
                title: "Failed to submit form. Please try again.",
                variant: "destructive",
            });
        }
    };
    const [currentStep, setCurrentStep] = useState(0);
    const onInvalid = async (err: typeof errors) => {
        console.log(err);
        if (err.teamLeader || err.transactionId || err.declaration) {
            toast({
                title: "Invalid Form. Please try again",
                description: `${err.teamLeader?.message ||
                    err.transactionId?.message ||
                    err.declaration?.message
                    }`,
                variant: "destructive",
            });
        }
    };
    const handleProceedToVerification = async () => {
        const isValid = await trigger("teamId");
        if (isValid) {
            setCurrentStep(1);
        } else {

        }
    };
    const handleProceedToPayment = async () => {
        const values = getValues();
        const leader = values.teamLeader;
        const missingFields = [];



        setIsFetchingTeamDetails(true);

        try {
            const leaderPhoneNumber = getValues("teamLeader.phoneNumber");

            const res = await axios.post<{ count: number }>(
                "/api/round2_getmembers",
                { phoneNumber: leaderPhoneNumber, teamId: selectedTeamId }
            );

            console.log(res.data.count);
            setTeamMemberCount(res.data.count);
            setCurrentStep(2);
        } catch (error) {
            console.error("Failed to fetch team details:", error);
            toast({
                title:
                    "Could not fetch team details. Please check your details and try again.",
                variant: "destructive",
            });
        } finally {
            setIsFetchingTeamDetails(false);
        }
    };
    const filteredTeams = teams.filter((team) =>
        team.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const selectedTeamName =
        teams.find((team) => team.id === selectedTeamId)?.name ||
        "Select your team";
    return (
        <div className="relative text-[#39ff14] min-h-screen  scanlines">
            <div className="absolute inset-0 bg-[#141710] opacity-90 -z-10"></div>
            <header className=" text-center">
                <Canvas className="w-screen ">
                    <EffectComposer>
                        <Bloom
                            luminanceThreshold={0}
                            luminanceSmoothing={0.9}
                            height={300}
                        />
                        <Scanline
                            blendFunction={BlendFunction.OVERLAY} // blend mode
                            density={1.25} // scanline density
                        />
                    </EffectComposer>
                    <Svg src={"TenetHack.svg"} position={[-5.5, 2, 0]} scale={0.05} />
                </Canvas>
            </header>
            <main className="md:max-w-3xl  py-10 mx-4 md:mx-auto">
                {isSubmitted ? (
                    <div className="text-center p-8 border border-[#39ff14] animate-pulse">
                        <h2 className={cn("text-4xl mb-4", vt323.className)}>
                            Registration Submitted!
                        </h2>
                        <p className={cn("text-xl", space_mono.className)}>
                            Thank you for registering for Tenet Hack 2025.
                        </p>
                        <p className={cn("text-xl", space_mono.className)}>
                            We will be in touch with you shortly.
                        </p>
                    </div>
                ) : (
                    <form
                        className="space-y-12 flex flex-col"
                        onSubmit={handleSubmit(onSubmit, onInvalid)}
                    >

                        <>
                            {currentStep == 0 && (
                                <>
                                    <section>
                                        <h2 className={cn("text-4xl mb-2 text-white", vt323.className)}>
                                            Congratulations on getting shortlisted!
                                        </h2>
                                        <p className={cn("text-lg text-white", space_mono.className)}>
                                            Please select your team to begin the registration
                                            process.
                                        </p>
                                    </section>
                                    <section>
                                        <label
                                            htmlFor="team-search"
                                            className={cn(
                                                "text-3xl flex items-center mb-2 text-white ",
                                                vt323.className
                                            )}
                                        >
                                            <span className="mr-3">{">"}</span> Team Name
                                        </label>
                                        <div className="relative" ref={dropdownRef}>
                                            <button
                                                type="button"
                                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                                className={cn(
                                                    "w-full bg-transparent border-2 border-primary-white focus:outline-none focus:ring-2 focus:ring-primary-white focus:ring-opacity-50 p-2 pl-4 pr-10 text-lg text-white text-left flex justify-between items-center cursor-pointer",
                                                    space_mono.className
                                                )}
                                            >
                                                <span>{selectedTeamName}</span>
                                                <div className=" flex items-center px-1 text-primary-white">
                                                    <svg
                                                        className={`h-6 w-6 transform transition-transform ${isDropdownOpen ? "rotate-180" : ""
                                                            }`}
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </div>
                                            </button>
                                            {isDropdownOpen && (
                                                <div className="relative  left-0 right-0 mt-2 bg-[#0a1a0a] border-2 border-primary-white z-10">
                                                    <input
                                                        id="team-search"
                                                        type="text"
                                                        placeholder="Search for your team..."
                                                        value={searchTerm}
                                                        onChange={(e) => setSearchTerm(e.target.value)}
                                                        className={cn(
                                                            "w-full bg-transparent border-b-2 border-primary-white p-2 text-lg text-white focus:outline-none",
                                                            space_mono.className
                                                        )}
                                                    />

                                                    <ul className="max-h-60 overflow-y-auto ">
                                                        {filteredTeams.length > 0 ? (
                                                            filteredTeams.map((team) => (
                                                                <li
                                                                    key={team.id}
                                                                    onClick={() => {
                                                                        setValue("teamId", team.id, {
                                                                            shouldValidate: true,
                                                                        });
                                                                        setIsDropdownOpen(false);
                                                                        setSearchTerm("");
                                                                    }}
                                                                    className={cn(
                                                                        "p-2 text-lg text-white hover:bg-primary-white hover:text-[#0a1a0a] cursor-pointer",
                                                                        space_mono.className
                                                                    )}
                                                                >
                                                                    {team.name}
                                                                </li>
                                                            ))
                                                        ) : (
                                                            <li
                                                                className={cn(
                                                                    "p-2 text-lg text-gray-400",
                                                                    space_mono.className
                                                                )}
                                                            >
                                                                No teams found.
                                                            </li>
                                                        )}
                                                    </ul>

                                                </div>
                                            )}
                                        </div>
                                        {errors.teamId && (
                                            <p className="text-red-500 mt-2 text-base">
                                                {errors.teamId.message}
                                            </p>
                                        )}
                                    </section>
                                    <button
                                        type="button"
                                        onClick={handleProceedToVerification}
                                        className="relative cursor-pointer mt-2 w-full py-2 text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed text-black bg-[#141710]  hover:bg-primary-white  transition-all"
                                    >
                                        <p
                                            className={cn(
                                                "text-2xl text-white mx-auto text-center",
                                                vt323.className
                                            )}
                                        >
                                            Proceed
                                        </p>
                                        <span className="absolute left-0 top-0 h-full w-3 border-l-2 border-t-2 border-b-2 border-[#39ff14]"></span>
                                        <span className="absolute right-0 top-0 h-full w-3 border-r-2 border-t-2 border-b-2 border-[#39ff14]"></span>
                                    </button>
                                </>
                            )}
                            {currentStep == 1 && (
                                <>
                                    <section>
                                        <div className="flex flex-row justify-between items-center"><h3
                                            className={cn(
                                                "text-4xl mb-2 mt-6 text-white",
                                                vt323.className
                                            )}
                                        >
                                            Team Leader Details
                                        </h3><button
                                            onClick={() => setCurrentStep(0)}
                                            type="button"
                                            className="relative cursor-pointer w-40 text-lg font-medium text-black bg-[#141710]  hover:bg-primary-white  transition-all"
                                        >

                                                <p
                                                    className={cn(
                                                        "text-2xl text-white mx-auto text-center",
                                                        vt323.className
                                                    )}
                                                >
                                                    Go Back
                                                </p>
                                                {/* Left bracket */}
                                                <span className="absolute left-0 top-0 h-full w-3 border-l-3 border-t-3 border-b-3 border-primary-white"></span>
                                                {/* Right bracket */}
                                                <span className="absolute right-0 top-0 h-full w-3 border-r-3 border-t-3 border-b-3 border-primary-white"></span>
                                            </button></div>
                                        <p
                                            className={cn(
                                                "text-lg mb-2 text-white",
                                                space_mono.className
                                            )}
                                        >
                                            Please make sure these details are the same as you
                                            entered on unstop.
                                        </p>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8  gap-y-6">
                                            <InputInterest
                                                label="First Name"
                                                placeholder="John"
                                                {...register("teamLeader.firstName")}
                                            />
                                            <InputInterest
                                                label="Last Name"
                                                placeholder="Doe"
                                                {...register("teamLeader.lastName")}
                                            />
                                        </div>
                                        <div className="mt-2">
                                            <InputInterest
                                                label="Phone Number"
                                                placeholder="9876543210"
                                                {...register("teamLeader.phoneNumber")}
                                            />
                                        </div>
                                        <div className="mt-2">
                                            <InputInterest
                                                label="Email"
                                                placeholder="example@email.com"
                                                {...register("teamLeader.email")}
                                            />
                                        </div>
                                    </section>

                                    <button
                                        type="button"
                                        onClick={() => {
                                            const values = getValues();
                                            const leader = values.teamLeader;
                                            const missingFields = [];

                                            if (
                                                !leader.firstName ||
                                                leader.firstName.trim() === ""
                                            ) {
                                                missingFields.push("Team Leader's First Name");
                                            }
                                            if (!leader.lastName || leader.lastName.trim() === "") {
                                                missingFields.push("Team Leader's Last Name");
                                            }
                                            if (!leader.phoneNumber) {
                                                missingFields.push("Team Leader's Phone Number");
                                            }
                                            if (!leader.email || leader.email.trim() === "") {
                                                missingFields.push("Team Leader's Email");
                                            }

                                            if (missingFields.length > 0) {
                                                toast({
                                                    title: "Please fill all required fields",
                                                    description: `The following fields are missing: ${missingFields.join(
                                                        ", "
                                                    )}.`,
                                                    variant: "destructive",
                                                });
                                            } else {
                                                handleProceedToPayment();
                                            }
                                        }}
                                        disabled={isFetchingTeamDetails}
                                        className="relative cursor-pointer mt-2 w-full py-2 text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed text-black bg-[#141710]  hover:bg-primary-white  transition-all"
                                    >
                                        <p
                                            className={cn(
                                                "text-2xl text-white mx-auto text-center",
                                                vt323.className
                                            )}

                                        >
                                            {" "}
                                            {isFetchingTeamDetails
                                                ? "FETCHING..."
                                                : "Proceed to Payment"}
                                        </p>
                                        {/* Left bracket */}
                                        <span className="absolute left-0 top-0 h-full w-3 border-l-3 border-t-3 border-b-3 border-primary-white"></span>
                                        {/* Right bracket */}
                                        <span className="absolute right-0 top-0 h-full w-3 border-r-3 border-t-3 border-b-3 border-primary-white"></span>
                                    </button>
                                </>
                            )}

                            {currentStep == 2 && (
                                <>
                                    <section>
                                        <div className="flex flex-row justify-between items-center">
                                            <h3
                                                className={cn(
                                                    "text-4xl mb-2 text-white",
                                                    vt323.className
                                                )}
                                            >
                                                Payment
                                            </h3>
                                            <button
                                                onClick={() => setCurrentStep(1)}
                                                type="button"
                                                className="relative cursor-pointer w-40 text-lg font-medium text-black bg-[#141710]  hover:bg-primary-white  transition-all"
                                            >
                                                <p
                                                    className={cn(
                                                        "text-2xl text-white mx-auto text-center",
                                                        vt323.className
                                                    )}
                                                >
                                                    Go Back
                                                </p>
                                                {/* Left bracket */}
                                                <span className="absolute left-0 top-0 h-full w-3 border-l-3 border-t-3 border-b-3 border-primary-white"></span>
                                                {/* Right bracket */}
                                                <span className="absolute right-0 top-0 h-full w-3 border-r-3 border-t-3 border-b-3 border-primary-white"></span>
                                            </button>
                                        </div>

                                        <p
                                            className={cn(
                                                "text-lg mb-6 text-white",
                                                space_mono.className
                                            )}
                                        >
                                            {` Make your payment on this QR Code and enter your
                                            transaction ID. Since your team has ${teamMemberCount} members, you must pay Rs. ${teamMemberCount * 150} for the second round.`}
                                        </p>
                                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                            <div className="md:col-span-2 border-[#1D4E1C] border-3">
                                                <div className="py-2 items-center flex border-b-2 border-[#1D4E1C]">
                                                    <p
                                                        className={cn(
                                                            "text-3xl mx-auto text-white",
                                                            vt323.className
                                                        )}
                                                    >
                                                        UPI QR Code
                                                    </p>
                                                </div>
                                                <Image
                                                    src={`/RegistrationForm/THack${teamMemberCount * 150
                                                        }.png`}
                                                    width={1000}
                                                    height={1000}
                                                    className="w-full"
                                                    alt={""}
                                                />
                                            </div>
                                            <div className="md:col-span-2">
                                                <h4
                                                    className={cn(
                                                        "text-3xl text-white mb-4",
                                                        vt323.className
                                                    )}
                                                >
                                                    Contact
                                                </h4>
                                                <p
                                                    className={cn(
                                                        "mb-4 text-white",
                                                        space_mono.className
                                                    )}
                                                >
                                                    If you face any issues please contact us here
                                                </p>
                                                <div className="space-y-3">
                                                    <div>
                                                        <p
                                                            className={cn(
                                                                "font-bold text-2xl text-white",
                                                                vt323.className
                                                            )}
                                                        >
                                                            Aayush Musale
                                                        </p>
                                                        <div className="inline-flex items-center gap-2 text-white   transition-colors">
                                                            <Phone className="h-5" />
                                                            <p className={cn(space_mono.className)}>
                                                                {" "}
                                                                +91 90210 20740
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <p
                                                            className={cn(
                                                                "font-bold text-2xl text-white",
                                                                vt323.className
                                                            )}
                                                        >
                                                            Manasi Chaudhari
                                                        </p>
                                                        <div className="inline-flex items-center gap-2 text-white   transition-colors">
                                                            <Phone className="h-5" />
                                                            <p className={cn(space_mono.className)}>
                                                                {" "}
                                                                +91 77418 83030
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-8">
                                            <InputInterest
                                                label="Transaction ID"
                                                {...register("transactionId")}
                                            />
                                        </div>
                                    </section>
                                    <div className="mt-8">
                                        <div className="flex items-start space-x-3">
                                            <input
                                                id="declaration"
                                                type="checkbox"
                                                {...register("declaration")}
                                                className="mt-1 h-5 w-5 shrink-0 bg-transparent border-2 border-[#39ff14] text-[#39ff14] focus:ring-0 focus:ring-offset-0 rounded-sm cursor-pointer"
                                                style={{ accentColor: "currentColor" }}
                                            />
                                            <label
                                                htmlFor="declaration"
                                                className={cn(
                                                    "text-lg text-white cursor-pointer",
                                                    space_mono.className
                                                )}
                                            >
                                                I declare that I will be present for Tenet Hack at
                                                7:30 am at AISSMS IOIT with my team on 11 October,
                                                2025.
                                            </label>
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        className="relative  cursor-pointer mt-2 w-full py-2 text-lg font-medium text-black bg-[#141710]  hover:bg-primary-white  transition-all"
                                    >
                                        <p
                                            className={cn(
                                                "text-2xl text-white mx-auto text-center",
                                                vt323.className
                                            )}
                                        >
                                            Submit
                                        </p>
                                        {/* Left bracket */}
                                        <span className="absolute left-0 top-0 h-full w-3 border-l-3 border-t-3 border-b-3 border-primary-white"></span>
                                        {/* Right bracket */}
                                        <span className="absolute right-0 top-0 h-full w-3 border-r-3 border-t-3 border-b-3 border-primary-white"></span>
                                    </button>
                                </>
                            )}
                        </>

                    </form>
                )}
            </main>
        </div>
    );
};

export default App;
