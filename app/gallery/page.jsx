"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Space_Mono, VT323 } from "next/font/google";
import Footer from "@/components/footer";
import { X } from "lucide-react";

const vt323 = VT323({
	weight: "400",
	subsets: ["latin"],
});

const space_mono = Space_Mono({
	weight: "400",
	subsets: ["latin"],
});

export default function GalleryPage() {
    const imageCount = 45;
    const images = Array.from({ length: imageCount }, (_, i) => `/ImageGallery/${i + 1}.jpeg`);
    const [selectedImage, setSelectedImage] = useState(null);

	return (
        <>
            <div
                className={cn(
                    "w-full text-primary-white p-6 md:p-12 lg:p-20 md:py-16 pt-[32px] sm:pt-[48px] md:px-35",
                    space_mono.className
                )}
            >
                <div className="max-w-7xl mx-auto space-y-12">
                    <div className="text-center">
                        <h1
                            className={cn(
                                "text-[42px] md:text-6xl lg:text-8xl font-black leading-tight",
                                vt323.className
                            )}
                        >
                            Gallery
                        </h1>
                        <p className="text-supporting-mediumGray xxs:text-lg md:text-xl font-medium max-w-2xl mx-auto mt-4">
                            Moments from the Tenet Hackathon 2025.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                        {images.map((src, index) => (
                            <div 
                                key={index} 
                                className="relative aspect-square w-full h-auto rounded-lg overflow-hidden border-2 border-supporting-darkGray hover:border-primary-white transition-all cursor-pointer group"
                                onClick={() => setSelectedImage(src)}
                            >
                                <Image
                                    src={src}
                                    alt={`Gallery image ${index + 1}`}
                                    fill
                                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                    className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <Footer className="mt-20" />
            </div>

            {selectedImage && (
                <div 
                    className="fixed inset-0 z-50 bg-black bg-opacity-90 flex justify-center items-center p-4 animate-in fade-in-25"
                    onClick={() => setSelectedImage(null)}
                >
                    <button 
                        className="absolute top-5 right-5 text-white z-50 hover:text-primary-white transition-colors"
                        onClick={() => setSelectedImage(null)}
                        aria-label="Close image view"
                    >
                        <X size={32} />
                    </button>
                    <div 
                        className="relative w-full h-full max-w-5xl max-h-[90vh]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={selectedImage}
                            alt="Enlarged gallery image"
                            fill
                            className="object-contain"
                            sizes="100vw"
                        />
                    </div>
                </div>
            )}
        </>
	);
}