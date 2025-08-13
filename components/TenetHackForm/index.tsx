'use client';
import FormPanelBg from '@/public/Formpanel.svg';
import AIOption from '@/public/AI.png';
import FinanceOption from '@/public/finance.png';
import SoftwareOption from '@/public/software.png';
import HardwareOption from '@/public/hardware.png';
import ButtonPanel from '@/public/ButtonPanel.svg';
import Image from 'next/image';
import { Pixelify_Sans } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { useState } from 'react';
import SelectInterest from '../ui/select-interest';
import ButtonInterest from '../ui/button-interest';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { toast } from '@/hooks/use-toast';
import interestFormSchema from './schema';

const pixelify_sans = Pixelify_Sans({
    weight: 'variable',
    subsets: ['latin']
})

export default function TenetHackForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { register, setValue, handleSubmit, formState: { errors }, reset, watch } = useForm({
        resolver: zodResolver(interestFormSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            phoneNumber: "",
            email: "",
            twitterHandle: "",
            interests: {
                ai: false,
                finance: false,
                software: false,
                hardware: false
            }
        },
    });
    const onSubmit = async (data: {
        firstName: string;
        lastName: string;
        phoneNumber: string;
        email: string;
        twitterHandle: string;
        interests: {
            ai: boolean;
            finance: boolean;
            software: boolean;
            hardware: boolean;
        };
    }) => {
        setIsSubmitting(true);
        try {
            await axios.post("/api/submit", {
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
        } finally {
            setIsSubmitting(false);
        }
    };
    const onInvalid = async (err: typeof errors) => {
        if (err.firstName || err.lastName || err.email || err.phoneNumber) {
            toast({
                title: "Invalid Form. Please try again",
                description: `${err.firstName?.message || err.lastName?.message || err.email?.message || err.phoneNumber?.message}`,
                variant: "destructive",
            });
        }
    }
    const interests = watch("interests");

    return <form className={cn('flex flex-col bg-no-repeat bg-cover p-10 gap-10', pixelify_sans.className)} onSubmit={handleSubmit(onSubmit, onInvalid)} style={{
        backgroundImage: `url(${FormPanelBg.src})`,
        backgroundSize: '100% 100%',
        backgroundPosition: 'center'

    }}>

        <h2 className={" text-white text-4xl text-center font-bold"}>Show your Interest</h2>
        <div className='flex flex-col gap-5'>
            <div className='flex flex-col md:flex-row gap-5'>

                <input className={'border-3 border-[#C2C2C2] text-white  px-6 py-2 text-2xl font-normal md:w-1/2 outline-none focus:border-white'} placeholder='First Name' {...register("firstName")} />
                <input className={'border-3 border-[#C2C2C2] text-white  px-6 py-2 text-2xl font-normal md:w-1/2 outline-none focus:border-white'} placeholder='Last Name' {...register("lastName")} />
            </div>

            <input className={'border-3 border-[#C2C2C2] text-white  px-6 py-2 text-2xl font-normal outline-none focus:border-white'} placeholder='Email Address' {...register("email")} />
            <input className={'border-3 border-[#C2C2C2] text-white  px-6 py-2 text-2xl font-normal outline-none focus:border-white'} placeholder='Phone Number'  {...register("phoneNumber")} />
            <input className={'border-3 border-[#C2C2C2] text-white  px-6 py-2 text-2xl font-normal outline-none focus:border-white'} placeholder='Twitter Handle' {...register("twitterHandle")} />
            <p className={"text-2xl text-white"}>Select your interests</p>
            <div className='flex flex-col gap-5'>
                <SelectInterest background={AIOption} title={"AI"} onSelectChange={(selected) => { setValue("interests.ai", selected) }} isSelected={interests.ai} />
                <SelectInterest background={FinanceOption} title={"Finance"} onSelectChange={(selected) => { setValue("interests.finance", selected) }} isSelected={interests.finance} />
                <SelectInterest background={SoftwareOption} title={"Software"} onSelectChange={(selected) => { setValue("interests.software", selected) }} isSelected={interests.software} />
                <SelectInterest background={HardwareOption} title={"Hardware"} onSelectChange={(selected) => { setValue("interests.hardware", selected) }} isSelected={interests.hardware} />
                <ButtonInterest disabled={isSubmitting} />
            </div>

        </div>

    </form>
}