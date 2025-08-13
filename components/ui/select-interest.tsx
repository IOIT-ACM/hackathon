import { cn } from "@/lib/utils";
import { StaticImageData } from "next/image"
import React, { ButtonHTMLAttributes, ReactHTMLElement, useState } from "react"

interface SelectInterestProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    background: StaticImageData,
    title: string,
    isSelected?: boolean,
    onSelectChange: (isSelected: boolean) => void,
}
export default function SelectInterest({ background, title, isSelected = false, onSelectChange, ...props }: SelectInterestProps) {


    return <button style={{
        backgroundImage: `url(${background.src})`,
    }} type="button" className={cn('px-6 py-6 border-3  text-white placeholder-white bg-cover  bg-no-repeat w-full flex flex-row gap-4 cursor-pointer hover:border-white transition-all hover:[&_p]:text-white hover:[&_div]:border-white [&_div]:transition-all', isSelected ? "border-white [&_div]:bg-white [&_div]:border-white bg-blend-darken " : "border-[#C2C2C2]")} onClick={() => {
        onSelectChange(!isSelected);
    }}>
        <div className='border-3 border-[#C2C2C2] h-6 w-6 my-auto'></div>
        <p className='text-[#C2C2C2] text-2xl'>{title}</p>
    </button>
}