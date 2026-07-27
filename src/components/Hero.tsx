"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { usePageTransition } from "@/components/PageTransition";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { startTransition } = usePageTransition();

  const phrases = useMemo(() => [
    "QUANTUM ML ENGINEER",
    "FULL-STACK DEVELOPER",
    "NEUROTECH INNOVATOR",
    "AI SYSTEMS BUILDER",
    "TECH VISIONARY"
  ], []);

  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const currentPhrase = phrases[currentPhraseIndex];
    
    const typeSpeed = isDeleting ? 40 : 80;
    const holdTime = 2000;
    
    const handleTyping = () => {
      if (!isDeleting) {
        const nextText = currentPhrase.slice(0, displayText.length + 1);
        setDisplayText(nextText);
        
        if (nextText === currentPhrase) {
          timer = setTimeout(() => setIsDeleting(true), holdTime);
          return;
        }
      } else {
        const nextText = currentPhrase.slice(0, displayText.length - 1);
        setDisplayText(nextText);
        
        if (nextText === "") {
          setIsDeleting(false);
          setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
          return;
        }
      }
      
      timer = setTimeout(handleTyping, typeSpeed);
    };

    timer = setTimeout(handleTyping, typeSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentPhraseIndex, phrases]);

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.2 });
    
    // Position logo at screen center for initial scaling
    const xOffset = window.innerWidth / 2 - 120;
    const yOffset = window.innerHeight / 2 - 30;

    tl.from(logoRef.current, {
      x: xOffset,
      y: yOffset,
      xPercent: -50,
      yPercent: -50,
      scale: 3.0,
      duration: 1.5,
      ease: "power3.inOut"
    });

    tl.from(contentRef.current, {
      opacity: 0,
      duration: 1.2,
      ease: "power2.inOut"
    }, "-=0.3");
  }, { scope: containerRef });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let time = 0;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    resize();

    const warpPoint = (x: number, y: number) => {
      const dx = x - mouseX;
      const dy = y - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxDist = 250; // Warp radius

      if (dist < maxDist && dist > 0) {
        const norm = dist / maxDist;
        const smooth = 1 - norm * norm * (3 - 2 * norm);
        // Warp wave formula
        const warp = Math.sin(dist * 0.05 - time * 4.0) * 15.0 * smooth;
        return {
          x: x + (dx / dist) * warp,
          y: y + (dy / dist) * warp
        };
      }
      return { x, y };
    };

    const drawWarpedLine = (x1: number, y1: number, x2: number, y2: number) => {
      const segments = 15;
      const p0 = warpPoint(x1, y1);
      ctx.moveTo(p0.x, p0.y);
      for (let i = 1; i <= segments; i++) {
        const t = i / segments;
        const px = x1 + (x2 - x1) * t;
        const py = y1 + (y2 - y1) * t;
        const p = warpPoint(px, py);
        ctx.lineTo(p.x, p.y);
      }
    };

    function draw() {
      if (!ctx) return;
      time += 0.02;

      // Warm Gray Background matching palette-grey
      ctx.fillStyle = "#E4E2E3"; 
      ctx.fillRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      // Subtle charcoal strokes for the grid tunnel
      ctx.strokeStyle = "rgba(22, 22, 22, 0.08)"; 
      ctx.lineWidth = 1.5;
      
      ctx.beginPath();

      const numYSegments = 6;
      for (let i = 1; i < numYSegments; i++) {
        const yL = (height / numYSegments) * i;
        drawWarpedLine(centerX, centerY, 0, yL);
        const yR = (height / numYSegments) * i;
        drawWarpedLine(centerX, centerY, width, yR);
      }

      const numXSegments = 9;
      for (let i = 1; i < numXSegments; i++) {
        const xT = (width / numXSegments) * i;
        drawWarpedLine(centerX, centerY, xT, 0);
        const xB = (width / numXSegments) * i;
        drawWarpedLine(centerX, centerY, xB, height);
      }

      drawWarpedLine(centerX, centerY, 0, 0); 
      drawWarpedLine(centerX, centerY, width, 0); 
      drawWarpedLine(centerX, centerY, 0, height); 
      drawWarpedLine(centerX, centerY, width, height); 

      ctx.stroke();

      const numRects = 5;
      const innerZ = 1 + numRects * 0.4;
      const innerXOffset = (width / 2) / innerZ;
      const innerYOffset = (height / 2) / innerZ;

      // Fill back wall
      ctx.fillStyle = "#E4E2E3";
      ctx.fillRect(centerX - innerXOffset, centerY - innerYOffset, innerXOffset * 2, innerYOffset * 2);

      ctx.beginPath();
      for (let i = 1; i < numYSegments; i++) {
        const yScreen = (height / numYSegments) * i;
        const yBack = centerY + (yScreen - centerY) / innerZ;
        drawWarpedLine(centerX - innerXOffset, yBack, centerX + innerXOffset, yBack);
      }
      for (let i = 1; i < numXSegments; i++) {
        const xScreen = (width / numXSegments) * i;
        const xBack = centerX + (xScreen - centerX) / innerZ;
        drawWarpedLine(xBack, centerY - innerYOffset, xBack, centerY + innerYOffset);
      }
      ctx.stroke();

      ctx.beginPath();
      for (let i = 0; i <= numRects; i++) {
        const z = 1 + i * 0.4;
        const xOffset = (width / 2) / z;
        const yOffset = (height / 2) / z;

        drawWarpedLine(centerX - xOffset, centerY - yOffset, centerX + xOffset, centerY - yOffset);
        drawWarpedLine(centerX + xOffset, centerY - yOffset, centerX + xOffset, centerY + yOffset);
        drawWarpedLine(centerX + xOffset, centerY + yOffset, centerX - xOffset, centerY + yOffset);
        drawWarpedLine(centerX - xOffset, centerY + yOffset, centerX - xOffset, centerY - yOffset);
      }
      ctx.stroke();

      // Signature Orange mouse hover glow
      const glowGrad = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 180);
      glowGrad.addColorStop(0, "rgba(244, 74, 34, 0.18)");
      glowGrad.addColorStop(1, "rgba(244, 74, 34, 0)");
      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, 0, width, height);

      animationFrameId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-[#E4E2E3] overflow-hidden flex items-center justify-center select-none font-jakarta">
      {/* 1. Canvas Backdrop Tunnel (Interacts with Mouse Hover) */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-auto z-0" />

      {/* 2. Top Navigation Overlay Header */}
      <div className="absolute top-6 left-8 right-8 z-40 flex justify-between items-start pointer-events-none">
        {/* Custom Soni Logo (Animated in) */}
        <div ref={logoRef} className="pointer-events-auto origin-left pt-2">
          <div className="flex items-center gap-3">
            <svg className="w-9 h-9 text-[#F44A22] drop-shadow-[0_0_10px_rgba(244,74,34,0.4)] animate-pulse" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0L15.3 8.7L24 12L15.3 15.3L12 24L8.7 15.3L0 12L8.7 8.7Z" />
            </svg>
            <span 
              className="text-xl md:text-2xl tracking-widest text-[#F44A22] uppercase leading-none"
              style={{ fontFamily: "'Samarkan', sans-serif" }}
            >
              PORTFOLIO
            </span>
          </div>
        </div>

        {/* Custom Signature & Bio Block (Top-Right Corner) */}
        <div className="pointer-events-auto hidden lg:flex flex-col items-end text-right gap-3 max-w-[280px] pt-1">
          {/* Signature */}
          <div className="select-none origin-right">
            <div 
              className="text-[#161616] hover:text-[#F44A22] text-3xl font-medium tracking-wide whitespace-nowrap transform -rotate-6 transition-all duration-300 hover:scale-105 cursor-default"
              style={{ fontFamily: "'RonthelBrush', cursive" }}
            >
              Manoj Kumar Thammisetti
            </div>
          </div>
          {/* Bio Text */}
          <p className="text-[#161616]/85 text-xs font-jakarta leading-relaxed font-medium mt-1">
            Full-stack engineer &amp; innovator in quantum ML, neurotech, and AI systems. B.Tech in AI &amp; ML (SIETK, 2026). Founder of Neurocommand Labs &amp; Infinite Stackers.
          </p>
          {/* Call to Action Button */}
          <button 
            onClick={() => startTransition("/contact")}
            className="group relative flex items-center gap-2.5 px-4 py-2 border border-[#161616]/30 rounded-full text-[#161616] text-[10px] font-bold tracking-widest hover:border-[#F44A22] hover:text-[#F44A22] transition-all duration-300 active:scale-95 bg-white/10 backdrop-blur-sm shadow-sm mt-1"
          >
            <span>GET IN TOUCH</span>
            <svg 
              className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
          </button>
        </div>
      </div>

      {/* 3. Main Content Layer (Fades in) */}
      <div ref={contentRef} className="absolute inset-0 w-full h-full pointer-events-none z-10">
        
        {/* Layer 3A: Giant Background Display Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none z-10 mt-[-40px]">
          <h1 className="font-oswald font-black text-[9vw] uppercase leading-[0.8] text-[#161616] opacity-10 tracking-tighter">
            I&apos;M BORN TO
          </h1>
          <h1 className="font-oswald font-black text-[6.5vw] md:text-[8vw] uppercase leading-[0.8] text-stroke-orange tracking-tighter mt-4 min-h-[1.1em] text-center w-full px-4">
            {displayText}
            <span className="animate-pulse opacity-80 select-none">|</span>
          </h1>
        </div>

        {/* Layer 3B: Centered Cutout Person Image (Avatar) */}
        <img 
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20Jul%2023%2C%202026%2C%2007_56_27%20PM-c8czAe8bIOblZ0h6oPPUsQSIlvJUzg.png" 
          alt="Manoj Kumar Thammisetti" 
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 w-[95%] h-[82%] max-w-xl object-contain object-bottom drop-shadow-[0_20px_50px_rgba(0,0,0,0.25)] select-none pointer-events-none hidden lg:block" 
        />
        
        {/* Mobile/Tablet Fallback Image (Centered) */}
        <img 
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20Jul%2023%2C%202026%2C%2007_56_27%20PM-c8czAe8bIOblZ0h6oPPUsQSIlvJUzg.png" 
          alt="Manoj Kumar Thammisetti" 
          className="absolute bottom-40 left-1/2 -translate-x-1/2 z-20 w-[85%] h-[58%] object-contain object-bottom drop-shadow-[0_15px_30px_rgba(0,0,0,0.25)] select-none pointer-events-none lg:hidden"
        />

        {/* Layer 3C: Left Column Metric Overlay (Desktop only) */}
        <div className="absolute bottom-24 left-8 z-30 hidden lg:flex flex-col items-start text-left pointer-events-auto">
          {/* Metrics Stack */}
          <div className="flex flex-col gap-5 text-[#161616] font-jakarta w-48">
            <div className="border-t border-[#161616]/10 pt-3">
              <h3 className="text-3xl font-extrabold text-[#F44A22] font-oswald tracking-tight">3+</h3>
              <p className="text-[#161616]/60 text-[10px] tracking-wider uppercase mt-0.5">Years Experience</p>
            </div>
            <div className="border-t border-[#161616]/10 pt-3">
              <h3 className="text-3xl font-extrabold text-[#F44A22] font-oswald tracking-tight">30+</h3>
              <p className="text-[#161616]/60 text-[10px] tracking-wider uppercase mt-0.5">Projects Done</p>
            </div>
            <div className="border-t border-[#161616]/10 pt-3">
              <h3 className="text-3xl font-extrabold text-[#F44A22] font-oswald tracking-tight">100%</h3>
              <p className="text-[#161616]/60 text-[10px] tracking-wider uppercase mt-0.5">Creative Drive</p>
            </div>
          </div>
        </div>


        {/* Mobile/Tablet Overlay Card (Frosted light glass layout) */}
        <div className="absolute bottom-20 left-6 right-6 z-30 flex flex-col items-center justify-center text-center lg:hidden bg-white/45 backdrop-blur-md p-5 rounded-2xl border border-white/30 pointer-events-auto max-w-md mx-auto">
          <p className="text-[#161616] text-xs font-jakarta leading-relaxed mb-4">
            Full-stack engineer &amp; innovator in quantum ML, neurotech, and AI systems. B.Tech in AI &amp; ML (SIETK, 2026).
          </p>
          <div className="flex items-center gap-4 w-full justify-center">
            <button 
              onClick={() => startTransition("/contact")}
              className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[#F44A22] text-white rounded-full text-xs font-bold tracking-widest active:scale-95 transition-transform shadow-md"
            >
              <span>GET IN TOUCH</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* 4. Bottom Horizontal Scrolling Marquee (Tilted Orange Banner with Cream Text) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[110vw] max-w-[110%] bg-[#F44A22] py-3.5 border-t border-b border-[#161616]/20 overflow-hidden z-40 select-none rotate-[-2deg] origin-center shadow-lg">
        <div className="animate-marquee font-oswald text-[#FEF8E8] text-base md:text-lg font-extrabold uppercase tracking-widest flex items-center gap-12 whitespace-nowrap">
          {Array.from({ length: 4 }).map((_, idx) => (
            <span key={idx} className="flex items-center gap-12">
              <span>QUANTUM ML</span>
              <span className="text-[#FEF8E8]/55">✦</span>
              <span>FULL-STACK ENGINEER</span>
              <span className="text-[#FEF8E8]/55">✦</span>
              <span>NEUROTECH FOUNDER</span>
              <span className="text-[#FEF8E8]/55">✦</span>
              <span>AI SYSTEMS</span>
              <span className="text-[#FEF8E8]/55">✦</span>
              <span>INNOVATION LEADER</span>
              <span className="text-[#FEF8E8]/55">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
