"use client";

import { useProgress } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function MatrixLoading() {
    const { progress } = useProgress(); // loading %
    const [done, setDone] = useState(false);

    useEffect(() => {
        if (progress === 100) {
            const timeout = setTimeout(() => setDone(true), 800);
            return () => clearTimeout(timeout);
        }
    }, [progress]);

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
