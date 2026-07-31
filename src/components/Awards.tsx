"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";

interface Award {
  id: number;
  title: string;
  event: string;
  description: string;
  medal: string;
  year: number;
  icon: string;
  color: string;
  images?: string[];
  autoScroll?: boolean;
  autoScrollInterval?: number;
}

const awards: Award[] = [
  {
    id: 1,
    title: "Runner-Up",
    event: "Amaravati Quantum Valley Hackathon (AQVH918)",
    description: "A state-level quantum computing initiative by the Andhra Pradesh Government (APSCHE); led Team TechTribe (Hybrid Quantum-Classical Anomaly Detection System - QADIS). Shared the stage with Andhra Pradesh Chief Minister Nara Chandrababu Naidu, AP IT Minister Nara Lokesh, and Union Minister Dr. Jitendra Singh at the felicitation ceremony. Cash award of ₹30,000/-.",
    medal: "🥈",
    year: 2025,
    icon: "⚛️",
    color: "from-blue-500/20 to-cyan-500/20",
    images: [
      "/achievements/aqvh-1.jpg",
      "/achievements/aqvh-2.jpg",
      "/achievements/aqvh-3.jpg",
      "/achievements/aqvh-4.jpg",
      "/achievements/aqvh-5.jpg"
    ]
  },
  {
    id: 2,
    title: "1st Place",
    event: "Impact X Hackathon 2025",
    description: "Won 1st Prize at the Impact X Hackathon held at MITS Deemed to be University, awarded with ₹25,000/- prize money.",
    medal: "🥇",
    year: 2025,
    icon: "🚀",
    color: "from-amber-500/20 to-orange-500/20",
    images: ["/achievements/impactx-1.jpg"]
  },
  {
    id: 3,
    title: "1st Prize",
    event: "Project Expo 2025 — SIET",
    description: "Project EyesTalk – Eye-Blink Controlled Communication System won 1st Prize at the Project Expo held on 31st January at Siddharth Institute of Engineering and Technology.",
    medal: "🥇",
    year: 2025,
    icon: "👁️",
    color: "from-emerald-500/20 to-teal-500/20",
    images: [
      "/achievements/eyestalk-expo-1.jpg",
      "/achievements/eyestalk-expo-2.jpg"
    ],
    autoScroll: true,
    autoScrollInterval: 1000
  },
  {
    id: 4,
    title: "3rd Place",
    event: "Siddharth Hackfest 2k25",
    description: "Secured 3rd Prize at the Siddharth Hackfest 2k25, held on 27 & 28 March 2025 at Siddharth Institute of Engineering & Technology, Puttur, with a reward of ₹5,000.",
    medal: "🥉",
    year: 2025,
    icon: "🏆",
    color: "from-orange-500/20 to-red-500/20",
    images: ["/achievements/siddharth-1.png"]
  },
  {
    id: 5,
    title: "Special Mention (5th Place)",
    event: "VIBEAITHON 2025",
    description: "We secured the 5th place (Special Mention Award) for our innovative project EyeStalk 👁️, an IoT-based assistive device that enables paralyzed individuals to operate a computer screen using eye blinks.",
    medal: "🎖️",
    year: 2025,
    icon: "✨",
    color: "from-purple-500/20 to-pink-500/20",
    images: ["/achievements/vibeaithon-1.jpg"]
  },
  {
    id: 6,
    title: "Recognized Innovator",
    event: "Confluence: The Innovators Summit 2026",
    description: "Awarded Certificate of Participation for project EyesTalk in recognition of outstanding creativity, innovation, and dedication at CONFLUENCE - The Innovators Summit 2026, organized by Ratan Tata Innovation Hub (RTIH) - Tirupati.",
    medal: "🌟",
    year: 2026,
    icon: "🧠",
    color: "from-indigo-500/20 to-purple-500/20",
    images: ["/achievements/confluence-2026.jpg"]
  }
];

function AwardImageGallery({
  images,
  eventTitle,
  autoScroll,
  autoScrollInterval = 3000
}: {
  images?: string[];
  eventTitle: string;
  autoScroll?: boolean;
  autoScrollInterval?: number;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedImgIndex, setSelectedImgIndex] = useState<number | null>(null);

  if (!images || images.length === 0) return null;

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  React.useEffect(() => {
    if (!autoScroll || !images || images.length <= 1) return;
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scrollRef.current.scrollTo({ left: scrollLeft + clientWidth, behavior: "smooth" });
        }
      }
    }, autoScrollInterval);
    return () => clearInterval(interval);
  }, [autoScroll, images, autoScrollInterval]);

  return (
    <>
      <div className="relative w-full aspect-[16/9] overflow-hidden rounded-xl mb-6 bg-[#161616]/5 border border-[#161616]/10 group/gallery">
        {/* Scroll Container */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth w-full"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {images.map((imgSrc, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedImgIndex(idx)}
              className="relative flex-shrink-0 w-full h-full overflow-hidden snap-center cursor-pointer group/item bg-black/10"
            >
              <img
                src={imgSrc}
                alt={`${eventTitle} photo ${idx + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/item:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="bg-black/70 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs font-mono flex items-center gap-1.5 border border-white/20">
                  <Maximize2 size={12} /> Click to expand
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Floating Navigation Controls if multiple images */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleScroll("left");
              }}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full backdrop-blur-sm opacity-0 group-hover/gallery:opacity-100 transition-all duration-200 border border-white/20 z-10"
              aria-label="Previous image"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleScroll("right");
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full backdrop-blur-sm opacity-0 group-hover/gallery:opacity-100 transition-all duration-200 border border-white/20 z-10"
              aria-label="Next image"
            >
              <ChevronRight size={16} />
            </button>

            {/* Image counter indicator */}
            <div className="absolute bottom-3 right-3 bg-black/60 text-white text-[10px] font-mono px-2.5 py-1 rounded-full backdrop-blur-md border border-white/10 z-10">
              {images.length} photos (Swipe ↔)
            </div>
          </>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedImgIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
          onClick={() => setSelectedImgIndex(null)}
        >
          <button
            onClick={() => setSelectedImgIndex(null)}
            className="absolute top-6 right-6 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-colors border border-white/10 z-10"
          >
            <X size={24} />
          </button>

          <div
            className="relative max-w-5xl max-h-[85vh] w-full h-full flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[selectedImgIndex]}
              alt={`${eventTitle} full view`}
              className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl border border-white/10"
            />
            <div className="mt-4 text-white/80 font-mono text-sm flex items-center gap-4">
              <span>{eventTitle}</span>
              {images.length > 1 && (
                <span>({selectedImgIndex + 1} / {images.length})</span>
              )}
            </div>

            {/* Modal Lightbox Prev/Next */}
            {images.length > 1 && (
              <>
                <button
                  onClick={() => setSelectedImgIndex((prev) => (prev! > 0 ? prev! - 1 : images.length - 1))}
                  className="absolute left-2 md:-left-12 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full backdrop-blur-md transition-colors"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={() => setSelectedImgIndex((prev) => (prev! < images.length - 1 ? prev! + 1 : 0))}
                  className="absolute right-2 md:-right-12 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full backdrop-blur-md transition-colors"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default function Awards() {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const itemVariants = {
    hidden: { y: 40, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.34, 1.56, 0.64, 1] as any
      }
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: { duration: 0.3 }
    }
  };

  return (
    <section
      id="awards"
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#FEF8E8] text-[#161616] py-28 px-6 md:px-12 lg:px-20 flex flex-col items-center justify-center z-20 overflow-hidden font-jakarta"
    >
      {/* Decorative animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#F44A22]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-10 w-80 h-80 bg-blue-400/5 rounded-full blur-3xl"></div>
      </div>

      {/* Top-Left Page Logo */}
      <motion.div 
        initial={{ y: -30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="absolute top-6 left-8 z-20 text-[#F44A22] text-4xl tracking-widest pointer-events-none drop-shadow-md origin-center"
        style={{ fontFamily: "'Samarkan', sans-serif" }}
      >
        AWARDS
      </motion.div>

      <div className="max-w-7xl w-full mx-auto relative z-10 mt-12">
        {/* Title Section */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="w-full mb-12 md:mb-16"
        >
          <h1 className="font-oswald font-black text-[9vw] md:text-[10vw] uppercase leading-[0.9] text-[#161616] tracking-tighter mb-4">
            RECOGNITION
          </h1>
          <p className="font-jakarta font-light text-base md:text-lg leading-relaxed text-[#161616]/70 max-w-2xl">
            Achievements from hackathons, competitions, and innovation recognitions. Each award represents dedication to pushing the boundaries of technology and creativity.
          </p>
        </motion.div>

        <div 
          ref={cardsRef}
          className="max-w-7xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 z-10"
        >
          {awards.map((award) => (
            <motion.div
              key={award.id}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true, margin: "-100px" }}
              className="group bg-white/80 backdrop-blur-sm border-2 border-[#161616]/15 hover:border-[#F44A22]/60 rounded-2xl p-5 md:p-6 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden relative"
            >
              <div className="w-full h-full flex flex-col justify-between">
                
                {/* 1. Top Section: Side Scrolling Image Gallery */}
                {award.images && award.images.length > 0 && (
                  <AwardImageGallery
                    images={award.images}
                    eventTitle={award.event}
                    autoScroll={award.autoScroll ?? award.id === 1}
                    autoScrollInterval={award.autoScrollInterval}
                  />
                )}

                {/* 2. Bottom Section: Details Box */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    {/* Inline Header: Medal + Title on the SAME LINE */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h3 className="font-oswald font-bold text-2xl md:text-3xl uppercase leading-tight text-[#161616] flex items-center gap-2">
                        <span className="text-3xl md:text-4xl group-hover:scale-110 transition-transform duration-300 leading-none">
                          {award.medal}
                        </span>
                        <span>{award.title}</span>
                      </h3>
                      <span className="text-2xl opacity-60 group-hover:opacity-100 transition-opacity">
                        {award.icon}
                      </span>
                    </div>

                    {/* Event Subtitle */}
                    <p className="font-jakarta font-semibold text-xs md:text-sm text-[#F44A22] mb-3">
                      {award.event}
                    </p>

                    {/* Description */}
                    <p className="font-jakarta font-light text-xs md:text-sm leading-relaxed text-[#161616]/80 mb-4">
                      {award.description}
                    </p>
                  </div>

                  {/* Footer with Year */}
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#161616]/10">
                    <span className="text-[10px] font-mono text-[#161616]/50 uppercase tracking-wider">
                      Achievement
                    </span>
                    <span className="font-oswald font-bold text-base text-[#F44A22]">
                      {award.year}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Accent Text */}
        <motion.div
          className="mt-16 md:mt-24 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="font-jakarta font-light text-base text-[#161616]/70">
            Each award is a milestone in my journey of innovation and technical excellence.
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="w-8 h-px bg-[#F44A22]/30"></div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#F44A22]">Continuous Growth</span>
            <div className="w-8 h-px bg-[#F44A22]/30"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

