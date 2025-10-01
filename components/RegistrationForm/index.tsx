'use client';
import React, { useState } from 'react';
import InputInterest from '../ui/input-interest';
import { Canvas } from '@react-three/fiber';
import { BlendFunction } from 'postprocessing';
import { Bloom, EffectComposer, Scanline } from '@react-three/postprocessing';
import { Svg } from '@react-three/drei';
import { Space_Mono, VT323 } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Phone } from 'lucide-react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import registrationFormSchema from './schema';
import axios from 'axios';
import { toast } from '@/hooks/use-toast';

interface TeamLeader {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
}
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

    const { register, setValue, getValues, handleSubmit, formState: { errors }, reset, watch } = useForm({
        resolver: zodResolver(registrationFormSchema),
        defaultValues: {
            teamLeader: {
                firstName: "",
                lastName: "",
                phoneNumber: "",
                email: ""
            },
            teamMembers: [],
            transactionId: ""
        },
    });
    const onSubmit = async (data: {
        teamLeader: {
            firstName: string,
            lastName: string,
            phoneNumber: string,
            email: string
        },
        teamMembers: string[],
        transactionId: string
    }) => {
        console.log(data);
        setIsSubmitted(true);
        try {
            await axios.post("/api/round2_register", {
                data
            },);

            toast({
                title: "Registration submitted successfully!",
                description: "Thank you for showing your interest in TENET Hackathon!",
            });
            reset();
        } catch (error) {
            console.error("Error submitting form:", error);
            toast({
                title: "Failed to submit form. Please try again.",
                variant: "destructive",
            });
        }
    };
    const [currentStep, setCurrentStep] = useState(1);
    const teamMembers = watch('teamMembers');
    const onInvalid = async (err: typeof errors) => {
        // if (err.teamLeader) {
        //     toast({
        //         title: "Invalid Form. Please try again",
        //         description: `${err.firstName?.message || err.lastName?.message || err.email?.message || err.phoneNumber?.message}`,
        //         variant: "destructive",
        //     });
        // }
    }
    return (
        <div className="relative text-[#39ff14] min-h-screen  scanlines">
            <div className="absolute inset-0 bg-[#141710] opacity-90 -z-10"></div>
            <header className=" text-center">
                <Canvas className='w-screen '>
                    <EffectComposer >
                        <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
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
                        <h2 className={cn("text-4xl mb-4", vt323.className)}>Registration Submitted!</h2>
                        <p className={cn("text-xl", space_mono.className)}>Thank you for registering for Tenet Hack 2025.</p>
                        <p className={cn("text-xl", space_mono.className)}>We will be in touch with you shortly.</p>
                    </div>
                ) : (
                    <form className="space-y-12 flex flex-col" onSubmit={handleSubmit(onSubmit, onInvalid)}>

                        {currentStep == 1 &&
                            <>
                                <section>
                                    <section>
                                        <h2 className={cn("text-4xl mb-2 text-white", vt323.className)}>Congratulations on getting shortlisted!</h2>
                                        <p className={cn("text-lg text-white", space_mono.className)}>We need just a few more details before you can join us at Tenet Hack 2025.</p>
                                    </section>
                                    <h3 className={cn("text-4xl mb-2 mt-6 text-white", vt323.className)}>Team Leader Details</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8  gap-y-6">
                                        <InputInterest label='First Name' placeholder="John" {...register("teamLeader.firstName")} />
                                        <InputInterest label='Last Name' placeholder="Doe" {...register("teamLeader.lastName")} />
                                    </div>
                                    <div className="mt-2">
                                        <InputInterest label="Phone Number" placeholder='+91 98765 43210' {...register("teamLeader.phoneNumber")} />
                                    </div>
                                    <div className="mt-2">
                                        <InputInterest label="Email" placeholder='example@email.com' {...register("teamLeader.email")} />
                                    </div>
                                </section>

                                <section>
                                    <h3 className={cn("text-4xl mb-2 text-white", vt323.className)}>Team Members</h3>
                                    <p className={cn("text-lg mb-4 text-white", space_mono.className)}>Add the names of all your team members here except team leader.</p>
                                    <div className="space-y-6">
                                        {teamMembers.map((member, index) => (
                                            <div className="flex flex-row items-end gap-2" key={index}>
                                                <InputInterest
                                                    key={index}
                                                    label={`Member ${index + 1}`}
                                                    {...register(`teamMembers.${index}`)}
                                                    className='flex-grow'
                                                />
                                                {teamMembers.length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => { setValue("teamMembers", teamMembers.filter((_, i) => i !== index)) }}
                                                        className="text-2xl text-red-500 border border-red-500 px-4 py-2 mb-1 hover:bg-red-500 hover:text-[#0a1a0a] transition-colors duration-300"
                                                        aria-label={`Remove Member ${index + 1}`}
                                                    >
                                                        -
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    {teamMembers.length < 3 && (
                                        <button type="button" onClick={() => { if (teamMembers.length < 4) { setValue("teamMembers", [...teamMembers, ""]) } }} className="w-full border-2 border-[#39ff14] mt-6 py-1 text-2xl font-bold hover:bg-[#39ff14] cursor-pointer hover:text-[#0a1a0a] transition-colors duration-300">
                                            +
                                        </button>
                                    )}
                                </section>

                                <button
                                    type="button"
                                    onClick={() => {
                                        // Validate required fields before proceeding
                                        const values = getValues();
                                        const leader = values.teamLeader;
                                        const members = values.teamMembers;
                                        const isLeaderFilled =
                                            leader.firstName &&
                                            leader.lastName &&
                                            leader.phoneNumber &&
                                            leader.email;
                                        const areMembersFilled = members.every((m: string) => m && m.trim() !== "");
                                        if (isLeaderFilled && (members.length === 0 || areMembersFilled)) {
                                            setCurrentStep(2);
                                        } else {
                                            toast({
                                                title: "Please fill all required fields before proceeding.",
                                                variant: "destructive",
                                            });
                                        }
                                    }}
                                    className="relative cursor-pointer mt-2 w-full py-2 text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed text-black bg-[#141710]  hover:bg-primary-white  transition-all"
                                >
                                    <p className={cn("text-2xl text-white mx-auto text-center", vt323.className)} >Proceed to Payment</p>
                                    {/* Left bracket */}
                                    <span className="absolute left-0 top-0 h-full w-3 border-l-3 border-t-3 border-b-3 border-primary-white"></span>
                                    {/* Right bracket */}
                                    <span className="absolute right-0 top-0 h-full w-3 border-r-3 border-t-3 border-b-3 border-primary-white"></span>
                                </button>
                            </>}

                        {currentStep == 2 &&
                            <>
                                <section>
                                    <div className='flex flex-row justify-between items-center'>
                                        <h3 className={cn("text-4xl mb-2 text-white", vt323.className)}>Payment</h3>
                                        <button onClick={() => setCurrentStep(1)} type="button" className="relative cursor-pointer w-40 text-lg font-medium text-black bg-[#141710]  hover:bg-primary-white  transition-all" >
                                            <p className={cn("text-2xl text-white mx-auto text-center", vt323.className)} >Go Back</p>
                                            {/* Left bracket */}
                                            <span className="absolute left-0 top-0 h-full w-3 border-l-3 border-t-3 border-b-3 border-primary-white"></span>
                                            {/* Right bracket */}
                                            <span className="absolute right-0 top-0 h-full w-3 border-r-3 border-t-3 border-b-3 border-primary-white"></span>
                                        </button>
                                    </div>

                                    <p className={cn("text-lg mb-6 text-white", space_mono.className)}>Make your payment on this QR Code and enter your transaction ID.</p>
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                        <div className="md:col-span-2 border-[#1D4E1C] border-3">
                                            <div className='py-2 items-center flex border-b-2 border-[#1D4E1C]'>
                                                <p className={cn('text-3xl mx-auto text-white', vt323.className)}>UPI QR Code</p>
                                            </div>
                                            <Image src={`/RegistrationForm/THack${(teamMembers.length + 1) * 150}.png`} width={1000} height={1000} className='w-full' alt={''} />
                                        </div>
                                        <div className='md:col-span-2'>
                                            <h4 className={cn("text-3xl text-white mb-4", vt323.className)}>Contact</h4>
                                            <p className={cn("mb-4 text-white", space_mono.className)}>If you face any issues please contact us here</p>
                                            <div className="space-y-3">
                                                <div>
                                                    <p className={cn("font-bold text-2xl text-white", vt323.className)}>Aayush Musale</p>
                                                    <div className="inline-flex items-center gap-2 text-white   transition-colors">
                                                        <Phone className="h-5" />
                                                        <p className={cn(space_mono.className)}> +91 90210 20740</p>
                                                    </div>
                                                </div>
                                                <div>
                                                    <p className={cn("font-bold text-2xl text-white", vt323.className)}>Manasi Chaudhari</p>
                                                    <div className="inline-flex items-center gap-2 text-white   transition-colors">
                                                        <Phone className="h-5" />
                                                        <p className={cn(space_mono.className)}> +91 77418 83030</p>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-8">
                                        <InputInterest label="Transaction ID" {...register("transactionId")} />
                                    </div>
                                </section>

                                <button type="submit" className="relative  cursor-pointer mt-2 w-full py-2 text-lg font-medium text-black bg-[#141710]  hover:bg-primary-white  transition-all" >
                                    <p className={cn("text-2xl text-white mx-auto text-center", vt323.className)} >Submit</p>
                                    {/* Left bracket */}
                                    <span className="absolute left-0 top-0 h-full w-3 border-l-3 border-t-3 border-b-3 border-primary-white"></span>
                                    {/* Right bracket */}
                                    <span className="absolute right-0 top-0 h-full w-3 border-r-3 border-t-3 border-b-3 border-primary-white"></span>
                                </button>
                            </>}
                    </form>
                )}
            </main>
        </div>
    );
};

export default App;
