import { cn } from "@/lib/utils";
import { VT323 } from "next/font/google";
import React from "react";


const vt323 = VT323({
    weight: '400',
    subsets: ['latin']
})

interface InputInterestProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string,

}
export default function InputInterest({ className, label, name, ...props }: InputInterestProps) {

    return <div className={cn("flex flex-col ", className)}>

        <label htmlFor={name} className={cn("text-white text-3xl", vt323.className)}>{`> ${label} `}</label>
        <input name={name} {...props} className={cn("border-b-3 outline-0 border-primary-white placeholder-[#1D4E1C] px-4 py-2 text-white text-2xl focus:border-[#03FF3A] transition-all", vt323.className)} />
    </div>
}