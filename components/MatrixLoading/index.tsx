"use client";

import { useProgress } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useLoader } from "@/app/context/LoaderContext";

export default function MatrixLoading() {
    const { progress } = useProgress();
    const { hasLoaded, setHasLoaded } = useLoader();
    const [done, setDone] = useState(false);

    useEffect(() => {
        if (!hasLoaded && progress === 100) {
            const timeout = setTimeout(() => {
                setDone(true);
                setHasLoaded(true);
            }, 800);
            return () => clearTimeout(timeout);
        }
    }, [progress, hasLoaded, setHasLoaded]);

    if (hasLoaded) return null;

    return (
        <AnimatePresence>
            {!done && (
                <motion.div
                    className="fixed inset-0 flex items-center justify-center bg-black z-50 overflow-hidden"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 1.2, ease: "easeInOut" } }}
                >
                    <motion.div
                        className="relative text-primary-white font-mono text-3xl"
                        animate={{
                            textShadow: [
                                "0 0 4px #00ff00",
                                "2px 0 #0f0",
                                "-2px 0 #0f0",
                                "0 0 4px #00ff00",
                            ],
                        }}
                        transition={{ repeat: Infinity, duration: 0.2 }}
                    >
                        LOADING {Math.floor(progress)}%
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
