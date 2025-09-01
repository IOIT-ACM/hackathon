import { cn } from "@/lib/utils";
import { VT323 } from "next/font/google";
import { StaticImageData } from "next/image"
import React, { ButtonHTMLAttributes, ReactHTMLElement, useState } from "react"



const vt323 = VT323({
    weight: '400',
    subsets: ['latin']
})
interface SelectInterestProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    title: string,
    isSelected?: boolean,
    onSelectChange: (isSelected: boolean) => void,
}
export default function SelectInterest({ title, isSelected = false, onSelectChange, ...props }: SelectInterestProps) {
    return <button type="button" className={cn("w-full px-6 py-2 border-3 border-primary-white hover:bg-supporting-mediumGray transition-all cursor-pointer hover:[&_p]:text-white", isSelected ? "border-supporting-mediumGray bg-supporting-mediumGray [&_p]:text-white" : "")} key={title} onClick={() => {
        onSelectChange(!isSelected);
    }}>
        <p className={cn("text-2xl text-primary-white", vt323.className)}>{title}</p>
    </button>

    // return <button style={{
    //     backgroundImage: `url(${background.src})`,
    // }} type="button" className={cn('px-6 py-6 border-3  text-white placeholder-white bg-cover  bg-no-repeat w-full flex flex-row gap-4 cursor-pointer hover:border-white transition-all hover:[&_p]:text-white hover:[&_div]:border-white [&_div]:transition-all', isSelected ? "border-white [&_div]:bg-white [&_div]:border-white  brightness-150 " : "border-[#C2C2C2]")} onClick={() => {
    //     onSelectChange(!isSelected);
    // }}>
    //     <div className='border-3 border-[#C2C2C2] h-6 w-6 my-auto'></div>
    //     <p className='text-[#C2C2C2] text-2xl'>{title}</p>
    // </button>
}