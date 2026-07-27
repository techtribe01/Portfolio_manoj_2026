"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const awards = [
  {
    id: 1,
    title: "Runner-Up",
    event: "Amaravati Quantum Valley Hackathon (AQVH918)",
    description: "Hybrid Quantum-Classical Anomaly Detection System (QADIS) with Team TechTribe",
    medal: "🥈",
    year: 2025,
    icon: "⚛️",
    color: "from-blue-500/20 to-cyan-500/20"
  },
  {
    id: 2,
    title: "1st Place",
    event: "ImpactX Hackathon 2025",
    description: "MITS College - Innovation-focused project development",
    medal: "🥇",
    year: 2025,
    icon: "🚀",
    color: "from-amber-500/20 to-orange-500/20"
  },
  {
    id: 3,
    title: "3rd Place",
    event: "Siddharth HackFest 2025",
    description: "SIET Puttur - Technical Excellence in Full-Stack Development",
    medal: "🥉",
    year: 2025,
    icon: "🏆",
    color: "from-orange-500/20 to-red-500/20"
  },
  {
    id: 4,
    title: "Special Mention",
    event: "VIBEAITHON 2025",
    description: "Kingston Engineering College - AI/ML Innovation",
    medal: "🎖️",
    year: 2025,
    icon: "✨",
    color: "from-purple-500/20 to-pink-500/20"
  },
  {
    id: 5,
    title: "Recognized Innovator",
    event: "Confluence: The Innovators Summit 2026",
    description: "Featured through RTIH for Neurotech Startup (Neurocommand Labs)",
    medal: "🌟",
    year: 2026,
    icon: "🧠",
    color: "from-indigo-500/20 to-purple-500/20"
  }
];

export default function Awards() {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.2 });

    tl.from(titleRef.current, {
      y: -30,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    })
      .from(textRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out"
      }, "-=0.4")
      .from(cardsRef.current ? cardsRef.current.querySelectorAll(".award-card") : [], {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out"
      }, "-=0.3");
  }, { scope: containerRef });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

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
      className="relative w-full min-h-screen bg-[#FEF8E8] text-[#161616] py-32 px-6 md:px-12 lg:px-20 flex flex-col items-center justify-center z-20 overflow-hidden font-jakarta"
    >
      {/* Decorative animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#F44A22]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-10 w-80 h-80 bg-blue-400/5 rounded-full blur-3xl"></div>
      </div>

      {/* Top-Left Page Logo */}
      <div 
        ref={titleRef}
        className="absolute top-6 left-8 z-20 text-[#F44A22] text-4xl tracking-widest pointer-events-none drop-shadow-md origin-center"
        style={{ fontFamily: "'Samarkan', sans-serif" }}
      >
        AWARDS
      </div>

      <div className="max-w-7xl w-full mx-auto relative z-10 mt-12">
        {/* Title Section */}
        <div ref={textRef} className="w-full mb-12 md:mb-16">
          <h1 className="font-oswald font-black text-[9vw] md:text-[10vw] uppercase leading-[0.9] text-[#F44A22] tracking-tighter mb-4">
            RECOGNITION
          </h1>
          <p className="font-jakarta font-light text-base md:text-lg leading-relaxed text-[#161616]/70 max-w-2xl">
            Achievements from hackathons, competitions, and innovation recognitions. Each award represents dedication to pushing the boundaries of technology and creativity.
          </p>
        </div>

        {/* Awards Grid */}
        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full"
        >
          {awards.map((award, index) => (
            <motion.div
              key={award.id}
              className="award-card"
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className={`h-full bg-gradient-to-br ${award.color} backdrop-blur-sm rounded-2xl border-2 border-[#161616]/20 p-8 md:p-10 flex flex-col justify-between hover:border-[#F44A22]/50 transition-all duration-300 shadow-sm hover:shadow-lg group`}>
                
                {/* Header with Icon and Medal */}
                <div className="flex items-start justify-between mb-6">
                  <div className="text-5xl group-hover:scale-110 transition-transform duration-300">
                    {award.medal}
                  </div>
                  <div className="text-4xl opacity-60 group-hover:opacity-100 transition-opacity">
                    {award.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="font-oswald font-bold text-2xl md:text-3xl uppercase leading-tight text-[#161616] mb-2">
                    {award.title}
                  </h3>
                  <p className="font-jakarta font-semibold text-sm md:text-base text-[#F44A22] mb-3">
                    {award.event}
                  </p>
                  <p className="font-jakarta font-light text-sm md:text-base leading-relaxed text-[#161616]/70">
                    {award.description}
                  </p>
                </div>

                {/* Footer with Year */}
                <div className="flex items-center justify-between mt-6 pt-6 border-t border-[#161616]/10">
                  <span className="text-xs font-mono text-[#161616]/50 uppercase tracking-wider">
                    Achievement
                  </span>
                  <span className="font-oswald font-bold text-lg text-[#F44A22]">
                    {award.year}
                  </span>
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
          <p className="font-jakarta font-light text-base text-[#161616]/60">
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
