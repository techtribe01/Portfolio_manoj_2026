"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
export default function About() {
  const containerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const block1Ref = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.2 });

    tl.from(logoRef.current, {
      y: -20,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    })
      .from(titleRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.4")
      .from(portraitRef.current, {
        scale: 0.95,
        opacity: 0,
        duration: 1.0,
        ease: "power3.out"
      }, "-=0.6")
      .from(block1Ref.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.6");
  }, { scope: containerRef });

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative w-full min-h-screen bg-white text-[#161616] py-24 px-6 md:px-12 lg:px-20 flex flex-col items-center justify-center z-20 overflow-hidden font-jakarta"
    >
      {/* Top-Left Page Logo */}
      <div 
        ref={logoRef}
        className="absolute top-6 left-8 z-20 text-[#F44A22] text-4xl tracking-widest pointer-events-none drop-shadow-md origin-center"
        style={{ fontFamily: "'Samarkan', sans-serif" }}
      >
        ABOUT
      </div>

      <div className="max-w-6xl w-full mx-auto mt-8 flex flex-col">
        {/* Giant Bold Oswald Title Block */}
        <div ref={titleRef} className="w-full relative select-none mb-8 md:mb-12">
          <h1 className="font-oswald font-black text-[clamp(2.25rem,7vw,7rem)] uppercase leading-none text-[#F44A22] tracking-tighter whitespace-nowrap">
            MANOJ KUMAR THAMMISETTI
          </h1>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full items-stretch">
          
          {/* Left Column: Text Blocks */}
          <div className="lg:col-span-7 flex flex-col gap-6 order-2 lg:order-1">
            
            <div
              ref={block1Ref}
              className="bg-[#161616] text-[#FEF8E8] rounded-3xl p-8 md:p-10 border-4 border-[#161616] shadow-sm"
            >
              <p className="font-jakarta font-light text-base md:text-lg leading-relaxed text-[#E4E2E3]/95 max-w-3xl">
                I&apos;m Manoj, an <span className="text-[#F44A22]">AI engineer</span> building <span className="text-[#F44A22]">agentic AI</span> and exploring emerging tech like <span className="text-[#F44A22]">quantum</span>, which I picked up fast enough to build QADIS, a quantum anomaly detection system. QADIS took me to the Amaravati Quantum Valley Hackathon, organized by the <span className="text-[#F44A22]">AP government</span>, where I led Team TechTribe to <span className="text-[#F44A22]">runner-up</span> and shared the stage with <span className="text-[#F44A22]">CM Nara Chandrababu Naidu</span>, Union Minister Dr. Jitendra Singh and IT Minister Nara Lokesh. In total I&apos;ve placed at three national-level hackathons. I founded Neurocommand Labs, a neurotech startup in collaboration with the <span className="text-[#F44A22]">AP government</span> (Ratan Tata Innovation Hub). In 2025-26, I was <span className="text-[#F44A22]">AIML Department President</span> at Siddharth Institute of Engineering and Technology, Puttur, where I taught <span className="text-[#F44A22]">1,000+</span> students Python and AI tools. During my internship at <span className="text-[#F44A22]">Skillarion Development</span>, I served as Tech Lead and built their entire website and infrastructure.
              </p>
            </div>

          </div>

          {/* Right Column: Grayscale-to-Color Portrait Block */}
          <div 
            ref={portraitRef} 
            className="lg:col-span-5 relative w-full h-[450px] md:h-[500px] lg:h-[540px] rounded-3xl border-4 border-[#161616] overflow-hidden bg-gradient-to-b from-[#FEF8E8] via-[#FDE68A]/30 to-[#F44A22]/20 group order-1 lg:order-2 flex items-end justify-center pt-6"
          >
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_20260812_174622942_PORTRAIT~2-bu3lhE4zQR54VxLmRiEMVbrsJHpnEq.jpg"
              alt="Manoj Kumar Thammisetti standing outdoors"
              className="h-full w-full object-contain object-center"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
