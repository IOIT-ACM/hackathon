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

                <div className="text-center p-8 border border-[#39ff14] animate-pulse">
                    <h2 className={cn("text-4xl mb-4", vt323.className)}>
                        Registrations Closed!
                    </h2>
                    <p className={cn("text-xl text-center", space_mono.className)}>
                        Thank you for Showing your interest in Tenet Hack 2025.
                    </p>

                </div>



            </main>
        </div>
    );
};

export default App;
