'use client';

import { cn } from "@/lib/utils";
import {
    AnimatePresence,
    MotionValue,
    motion,
    useMotionValue,
    useSpring,
    useTransform,
} from "motion/react";

import { useRef, useState } from "react";
import MobileSidebar from "../MobileSidebar";
import Link from "next/link";

export const FloatingDock = ({
    items,
    desktopClassName,
    mobileClassName,
}: {
    items: { title: string; icon: React.ReactNode; href: string }[];
    desktopClassName?: string;
    mobileClassName?: string;
}) => {
    return (
        <>
            <FloatingDockDesktop items={items} className={desktopClassName} />
            <MobileSidebar items={items} className={mobileClassName} />
            {/* <FloatingDockMobile items={items} className={mobileClassName} /> */}
        </>
    );
};



const FloatingDockDesktop = ({
    items,
    className,
}: {
    items: { title: string; icon: React.ReactNode; href: string }[];
    className?: string;
}) => {
    const mouseY = useMotionValue(Infinity);
    return (
        <motion.div
            onMouseMove={(e) => mouseY.set(e.clientY)}
            onMouseLeave={() => mouseY.set(Infinity)}
            className={cn(
                "mx-auto hidden w-16  items-center my-auto py-4 gap-4   px-4 pb-3 md:flex flex-col ",
                className,
            )}
        >
            {/* <div className="bg-[#141710] items-center my-auto -m-1 px-4 py-4 pb-3 "> */}
            {items.map((item) => (
                <IconContainer mouseY={mouseY} key={item.title} {...item} />
            ))}
            {/* </div> */}
        </motion.div>
    );
};

function IconContainer({
    mouseY,
    title,
    icon,
    href,
}: {
    mouseY: MotionValue;
    title: string;
    icon: React.ReactNode;
    href: string;
}) {
    const ref = useRef<HTMLDivElement>(null);

    const distance = useTransform(mouseY, (val) => {
        const bounds = ref.current?.getBoundingClientRect() ?? { y: 0, height: 0 };

        return val - bounds.y - bounds.height / 2;
    });

    const widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
    const heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);

    const widthTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);
    const heightTransformIcon = useTransform(
        distance,
        [-150, 0, 150],
        [20, 40, 20],
    );

    const width = useSpring(widthTransform, {
        mass: 0.1,
        stiffness: 150,
        damping: 12,
    });
    const height = useSpring(heightTransform, {
        mass: 0.1,
        stiffness: 150,
        damping: 12,
    });

    const widthIcon = useSpring(widthTransformIcon, {
        mass: 0.1,
        stiffness: 150,
        damping: 12,
    });
    const heightIcon = useSpring(heightTransformIcon, {
        mass: 0.1,
        stiffness: 150,
        damping: 12,
    });

    const [hovered, setHovered] = useState(false);

    return (
        <Link href={href} shallow={true}>
            <motion.div
                ref={ref}
                style={{ width, height }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                className="relative flex aspect-square items-center justify-center rounded-full  bg-opacity-50"
            >
                <AnimatePresence>
                    {hovered && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, x: "-50%" }}
                            animate={{ opacity: 1, y: 0, x: "-50%" }}
                            exit={{ opacity: 0, y: 2, x: "-50%" }}
                            className="absolute w-fit ml-48 rounded-md border text-left border-gray-200 bg-gray-100 px-2 py-0.5 text-xs whitespace-pre text-neutral-700 dark:border-neutral-900 dark:bg-neutral-800 dark:text-white"

                        >
                            {title}
                        </motion.div>
                    )}
                </AnimatePresence>
                <motion.div
                    style={{ width: widthIcon, height: heightIcon }}
                    className="flex items-center justify-center text-[#117B20] "
                >
                    {icon}
                </motion.div>
            </motion.div>
        </Link>
    );
}
