"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Send, 
  Check, 
  X
} from "lucide-react";
import { useForm, ValidationError } from "@formspree/react";

export default function Contact() {
  const containerRef = useRef<HTMLElement>(null);
  const contactLogoRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const constraintsRef = useRef<HTMLDivElement>(null);
  const footerEmailRef = useRef<HTMLDivElement>(null);

  const [copied, setCopied] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);

  // Formspree state hook
  const [state, handleSubmitToFormspree, resetFormspree] = useForm("xpwdwykv");

  // Form fields state
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // Sync Formspree success state
  useEffect(() => {
    if (state.succeeded) {
      setShowSuccess(true);
      setShowFormModal(false);
      setFormState({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    }
  }, [state.succeeded]);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("nandkishorsoni098765@gmail.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleSubmitToFormspree(e);
  };

  useGSAP(
    () => {
      const tl = gsap.timeline({ delay: 0.2 });

      tl.from(contactLogoRef.current, {
        y: -20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      })
        .from(logoRef.current, {
          y: -30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        }, "-=0.6")
        .from(
          infoRef.current ? infoRef.current.children : [],
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .from(
          constraintsRef.current ? constraintsRef.current.children : [],
          {
            scale: 0,
            opacity: 0,
            rotate: () => Math.random() * 40 - 20,
            duration: 0.8,
            stagger: 0.08,
            ease: "back.out(1.5)",
          },
          "-=0.4"
        )
        .from(
          footerEmailRef.current,
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.4"
        );
    },
    { scope: containerRef }
  );

  // Drag constraints helper
  const stickers = [
    {
      id: "badge-rock",
      type: "badge",
      badgeType: "rock",
      initialX: "8%",
      initialY: "18%",
      rotate: 8,
    },
    {
      id: "whatsapp",
      type: "capsule",
      label: "WHATSAPP ↗",
      href: "https://wa.me/7982402954?text=Hi%20Nandkishore!%20I%20just%20came%20across%20your%20amazing%20portfolio%20and%20would%20love%20to%20connect.",
      initialX: "18%",
      initialY: "32%",
      rotate: 5,
    },
    {
      id: "twitter",
      type: "capsule",
      label: "X (TWITTER) ↗",
      href: "https://x.com/x_nandkishore",
      initialX: "65%",
      initialY: "18%",
      rotate: -8,
    },
    {
      id: "telegram",
      type: "capsule",
      label: "TELEGRAM ↗",
      href: "https://t.me/@Tm_nandkishore",
      initialX: "78%",
      initialY: "55%",
      rotate: 12,
    },
    {
      id: "instagram",
      type: "capsule",
      label: "INSTAGRAM ↗",
      href: "https://www.instagram.com/ig_nandkishore_soni",
      initialX: "32%",
      initialY: "12%",
      rotate: -12,
    },
    {
      id: "badge-lips",
      type: "badge",
      badgeType: "lips",
      initialX: "24%",
      initialY: "48%",
      rotate: -8,
    },
    {
      id: "linkedin",
      type: "capsule",
      label: "LINKEDIN ↗",
      href: "https://www.linkedin.com/in/nand-kishore-soni-036783317/",
      initialX: "8%",
      initialY: "68%",
      rotate: 15,
    },
    {
      id: "google-skills",
      type: "capsule",
      label: "GOOGLE SKILLS ↗",
      href: "https://www.skills.google/public_profiles/17fd8191-5307-48d9-b9cd-dcd29428e518",
      initialX: "42%",
      initialY: "38%",
      rotate: -6,
    },
    {
      id: "github",
      type: "capsule",
      label: "GITHUB ↗",
      href: "https://github.com/legendxdevil",
      initialX: "46%",
      initialY: "64%",
      rotate: -10,
    },
    {
      id: "badge-heart",
      type: "badge",
      badgeType: "heart",
      initialX: "72%",
      initialY: "35%",
      rotate: 14,
    },
    {
      id: "send-message",
      type: "capsule",
      label: "SEND MESSAGE ✦",
      isAction: true,
      initialX: "62%",
      initialY: "68%",
      rotate: 6,
      isPrimary: true,
    },
  ];

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen bg-palette-grey text-[#161616] py-24 flex flex-col justify-between z-20 overflow-hidden"
    >
      {/* Top-Left Page Logo */}
      <div
        ref={contactLogoRef}
        className="absolute top-6 left-8 z-20 text-[#F44A22] text-4xl tracking-widest pointer-events-none drop-shadow-md origin-center"
        style={{ fontFamily: "'Samarkan', sans-serif" }}
      >
        CONTACT
      </div>

      {/* 1. Top Section: Marquee Title */}
      <div ref={logoRef} className="w-full select-none overflow-hidden pb-4">
        {/* Repeating text marquee */}
        <div className="animate-marquee font-cormorant text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] font-medium uppercase tracking-tight text-[#161616] flex items-center gap-8 whitespace-nowrap">
          <span>CONTACT ✦ CONTACT ✦ CONTACT ✦ CONTACT ✦ CONTACT ✦&nbsp;</span>
          <span>CONTACT ✦ CONTACT ✦ CONTACT ✦ CONTACT ✦ CONTACT ✦&nbsp;</span>
        </div>

        {/* Thin Divider Rule */}
        <div className="border-t border-[#161616] w-full my-4 md:my-6 px-8" />

        {/* Subheadings */}
        <div 
          ref={infoRef}
          className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-4 text-[10px] md:text-xs font-semibold font-jakarta tracking-wider text-[#161616]/70 uppercase"
        >
          <div className="text-center md:text-left">
            I&apos;m here to help you turn your brief into something brilliant.
          </div>
          <div className="text-center">
            Just drop me a line or interact with the stickers.
          </div>
          <div className="text-center md:text-right">
            © 2026 Nand Kishore Soni. All rights reserved
          </div>
        </div>
      </div>

      {/* 2. Middle Section: Stickers Draggable Canvas */}
      <div 
        ref={constraintsRef} 
        className="relative w-full flex-grow min-h-[380px] md:min-h-[480px] overflow-hidden select-none pointer-events-auto px-6"
      >
        {stickers.map((sticker) => {
          const isCapsule = sticker.type === "capsule";

          return (
            <motion.div
              key={sticker.id}
              drag
              dragConstraints={constraintsRef}
              dragElastic={0.15}
              whileDrag={{ 
                scale: 1.05, 
                rotate: 0,
                boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2)",
                zIndex: 50 
              }}
              initial={{ 
                left: sticker.initialX, 
                top: sticker.initialY, 
                rotate: sticker.rotate 
              }}
              className="absolute select-none group cursor-grab active:cursor-grabbing"
              style={{
                touchAction: "none"
              }}
            >
              {isCapsule ? (
                // Capsule Sticker Layout
                <div
                  onClick={() => {
                    if (sticker.isAction) {
                      setShowFormModal(true);
                    } else if (sticker.href) {
                      window.open(sticker.href, "_blank", "noopener,noreferrer");
                    }
                  }}
                  className={`flex items-center gap-2 px-6 py-3.5 rounded-full border border-[#161616] font-jakarta font-bold text-sm md:text-base shadow-md transition-all duration-300 ${
                    sticker.isPrimary
                      ? "bg-[#F44A22] text-[#FEF8E8] hover:bg-[#F44A22]/90 border-[#161616] shadow-lg shadow-[#F44A22]/15"
                      : "bg-[#FEF8E8] text-[#161616] hover:bg-white border-[#161616]"
                  }`}
                >
                  <span>{sticker.label}</span>
                </div>
              ) : (
                // Circular Badge Sticker Layout
                <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-full bg-[#FEF8E8] border border-[#161616] flex items-center justify-center shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                  
                  {/* Rotating Circular Sticker Border Text */}
                  <svg 
                    viewBox="0 0 100 100" 
                    className="absolute inset-0 w-full h-full animate-[spin_30s_linear_infinite]"
                  >
                    <path 
                      id={`circlePath-${sticker.id}`} 
                      d="M 50,50 m -35,0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" 
                      fill="none" 
                    />
                    <text className="text-[6.5px] font-bold font-jakarta fill-[#161616] tracking-[0.19em]">
                      <textPath href={`#circlePath-${sticker.id}`} startOffset="0%">
                        DRAG ME ✦ DRAG ME ✦ DRAG ME ✦ DRAG ME ✦
                      </textPath>
                    </text>
                  </svg>

                  {/* SVG Center Illustrations */}
                  <div className="relative z-10 flex items-center justify-center">
                    {sticker.badgeType === "rock" && (
                      <svg 
                        viewBox="0 0 24 24" 
                        className="w-9 h-9 md:w-11 md:h-11 text-[#161616]" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="1.8" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      >
                        {/* Rock Hand Gesture */}
                        <path d="M18 10h-2V6a2 2 0 0 0-4 0v4H9V5a2 2 0 0 0-4 0v6.5a4.5 4.5 0 0 0 9 0V10" />
                        <path d="M5 11.5V7a2 2 0 0 1 4 0v4.5" />
                        <path d="M17 11.5v3.5a5 5 0 0 1-10 0v-3.5" />
                      </svg>
                    )}

                    {sticker.badgeType === "lips" && (
                      <svg 
                        viewBox="0 0 24 24" 
                        className="w-10 h-10 md:w-12 md:h-12 text-[#161616]" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="1.8" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      >
                        {/* Upper Lip */}
                        <path d="M3 12c3-2 5-3 9-1 4-2 6-1 9 1" fill="#F44A22" />
                        {/* Lower Lip */}
                        <path d="M3 12c4 3 14 3 18 0" fill="#F44A22" />
                        {/* Tongue */}
                        <path d="M10 12v3c0 1.5 1 2 2 2s2-.5 2-2v-3" fill="#FFEAA7" />
                      </svg>
                    )}

                    {sticker.badgeType === "heart" && (
                      <svg 
                        viewBox="0 0 24 24" 
                        className="w-9 h-9 md:w-11 md:h-11 text-[#161616]" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="1.8" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      >
                        {/* Heart */}
                        <path 
                          d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" 
                          fill="#F44A22" 
                        />
                        {/* Lightning bolt inside heart */}
                        <path d="M13 6l-3.5 5.5h3l-2 6 4.5-6.5h-3.5Z" fill="#FFEAA7" />
                      </svg>
                    )}
                  </div>

                  {/* Curvaceous Sticker Peel Fold Effect for the Lips badge */}
                  {sticker.badgeType === "lips" && (
                    <div 
                      className="absolute bottom-[3px] right-[4px] w-6 h-6 md:w-8 md:h-8 bg-[#E4E2E3] border-l border-t border-[#161616] rounded-tl-full shadow-inner rotate-12 pointer-events-none"
                      style={{ transformOrigin: "bottom right" }}
                    />
                  )}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* 3. Bottom Section: Giant Footer Email */}
      <div 
        ref={footerEmailRef}
        className="w-full flex flex-col items-center justify-center relative mt-auto px-6 py-4"
      >
        <span className="text-[10px] md:text-xs font-semibold font-jakarta tracking-[0.25em] text-[#161616]/50 uppercase mb-2">
          Click To Copy Email
        </span>

        {/* Large Email Link */}
        <h1
          onClick={handleCopyEmail}
          className="font-cormorant font-normal text-4xl sm:text-6xl md:text-7xl lg:text-[7.5rem] leading-none text-[#161616] hover:text-[#F44A22] active:scale-95 transition-all duration-500 text-center select-none cursor-pointer tracking-tighter w-full max-w-7xl break-all"
        >
          nandkishorsoni098765@gmail.com
        </h1>

        {/* Floating Tooltip Indicator */}
        <AnimatePresence>
          {copied && (
            <motion.span
              initial={{ opacity: 0, y: 15, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.9 }}
              className="absolute -top-12 bg-[#F44A22] text-[#FEF8E8] text-xs font-bold px-4 py-2 rounded-xl shadow-lg border border-[#161616] flex items-center gap-1.5"
            >
              <Check size={14} /> Copied to Clipboard!
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* 4. Form Modal Overlay */}
      <AnimatePresence>
        {showFormModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-sm px-6"
          >
            {/* Modal Body Card */}
            <motion.div
              initial={{ scale: 0.95, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="bg-[#FEF8E8] border border-[#161616] shadow-2xl rounded-3xl p-6 md:p-10 max-w-xl w-full text-[#161616] relative flex flex-col justify-between overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowFormModal(false)}
                className="absolute top-6 right-6 w-9 h-9 rounded-full border border-[#161616] flex items-center justify-center hover:bg-[#F44A22] hover:text-white transition-colors duration-300 cursor-pointer"
              >
                <X size={18} />
              </button>

              <div>
                <span className="text-xs font-bold tracking-widest text-[#F44A22] uppercase font-jakarta">
                  Direct Line
                </span>
                <h3 className="text-3xl font-bold mt-1 mb-6 tracking-tight font-sans">
                  Drop A Message
                </h3>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  {/* Name Input */}
                  <div className="relative w-full">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleInputChange}
                      placeholder=" "
                      required
                      disabled={state.submitting}
                      className="peer w-full pt-6 pb-2 px-4 bg-white/20 border border-[#161616] rounded-2xl text-palette-midnight focus:outline-none focus:border-[#F44A22] focus:bg-white/60 transition-all duration-300 text-base"
                    />
                    <label
                      htmlFor="name"
                      className="absolute left-4 top-4 text-palette-stone text-base pointer-events-none transition-all duration-300 
                      peer-placeholder-shown:top-4 peer-placeholder-shown:text-base 
                      peer-focus:top-1 peer-focus:text-xs peer-focus:text-[#F44A22] peer-focus:font-semibold
                      peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-[#161616]/75"
                    >
                      Your Name
                    </label>
                  </div>
                  <ValidationError field="name" errors={state.errors} className="text-[#F44A22] text-xs -mt-3 font-semibold font-jakarta" />

                  {/* Email Input */}
                  <div className="relative w-full">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleInputChange}
                      placeholder=" "
                      required
                      disabled={state.submitting}
                      className="peer w-full pt-6 pb-2 px-4 bg-white/20 border border-[#161616] rounded-2xl text-palette-midnight focus:outline-none focus:border-[#F44A22] focus:bg-white/60 transition-all duration-300 text-base"
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-4 top-4 text-palette-stone text-base pointer-events-none transition-all duration-300 
                      peer-placeholder-shown:top-4 peer-placeholder-shown:text-base 
                      peer-focus:top-1 peer-focus:text-xs peer-focus:text-[#F44A22] peer-focus:font-semibold
                      peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-[#161616]/75"
                    >
                      Your Email
                    </label>
                  </div>
                  <ValidationError field="email" errors={state.errors} className="text-[#F44A22] text-xs -mt-3 font-semibold font-jakarta" />

                  {/* Subject Input */}
                  <div className="relative w-full">
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formState.subject}
                      onChange={handleInputChange}
                      placeholder=" "
                      required
                      disabled={state.submitting}
                      className="peer w-full pt-6 pb-2 px-4 bg-white/20 border border-[#161616] rounded-2xl text-palette-midnight focus:outline-none focus:border-[#F44A22] focus:bg-white/60 transition-all duration-300 text-base"
                    />
                    <label
                      htmlFor="subject"
                      className="absolute left-4 top-4 text-palette-stone text-base pointer-events-none transition-all duration-300 
                      peer-placeholder-shown:top-4 peer-placeholder-shown:text-base 
                      peer-focus:top-1 peer-focus:text-xs peer-focus:text-[#F44A22] peer-focus:font-semibold
                      peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-[#161616]/75"
                    >
                      Subject
                    </label>
                  </div>
                  <ValidationError field="subject" errors={state.errors} className="text-[#F44A22] text-xs -mt-3 font-semibold font-jakarta" />

                  {/* Message Input */}
                  <div className="relative w-full">
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formState.message}
                      onChange={handleInputChange}
                      placeholder=" "
                      required
                      disabled={state.submitting}
                      className="peer w-full pt-6 pb-3 px-4 bg-white/20 border border-[#161616] rounded-2xl text-palette-midnight focus:outline-none focus:border-[#F44A22] focus:bg-white/60 transition-all duration-300 text-base resize-none"
                    />
                    <label
                      htmlFor="message"
                      className="absolute left-4 top-4 text-palette-stone text-base pointer-events-none transition-all duration-300 
                      peer-placeholder-shown:top-4 peer-placeholder-shown:text-base 
                      peer-focus:top-1 peer-focus:text-xs peer-focus:text-[#F44A22] peer-focus:font-semibold
                      peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-[#161616]/75"
                    >
                      Message
                    </label>
                  </div>
                  <ValidationError field="message" errors={state.errors} className="text-[#F44A22] text-xs -mt-3 font-semibold font-jakarta" />

                  {/* Submit Form Button */}
                  <button
                    type="submit"
                    disabled={state.submitting}
                    className="w-full py-4 bg-[#F44A22] text-[#FEF8E8] font-semibold border border-[#161616] rounded-2xl hover:bg-[#F44A22]/90 hover:scale-[1.01] active:scale-[0.99] disabled:bg-gray-400 disabled:scale-100 disabled:cursor-not-allowed transition-all duration-300 shadow-lg shadow-[#F44A22]/20 flex items-center justify-center gap-2 group cursor-pointer"
                  >
                    {state.submitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send
                          size={18}
                          className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                        />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Modal Overlay */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md px-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="bg-[#FEF8E8] border border-[#161616] shadow-2xl rounded-3xl p-8 md:p-10 max-w-md w-full text-center relative overflow-hidden flex flex-col items-center justify-center"
            >
              {/* Draw-in SVG Checkmark */}
              <div className="w-20 h-20 text-[#F44A22] mb-6 flex items-center justify-center">
                <svg
                  className="w-full h-full"
                  viewBox="0 0 52 52"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <motion.circle
                    cx="26"
                    cy="26"
                    r="23"
                    stroke="currentColor"
                    strokeWidth="4"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                  <motion.path
                    d="M16 26L23 33L36 18"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 0.5, duration: 0.4, ease: "easeOut" }}
                  />
                </svg>
              </div>

              {/* Title & Success Message */}
              <h4
                className="text-3xl font-semibold tracking-wider text-[#F44A22] mb-3"
                style={{ fontFamily: "'Samarkan', sans-serif" }}
              >
                Message Sent!
              </h4>
              <p className="text-[#161616]/80 font-light leading-relaxed mb-8">
                Thank you for reaching out! Your message was sent successfully. Nand Kishore Soni will get back to you shortly.
              </p>

              {/* Close Button */}
              <button
                onClick={() => {
                  setShowSuccess(false);
                  resetFormspree();
                }}
                className="px-8 py-3 bg-palette-midnight border border-[#161616] hover:bg-[#F44A22] hover:text-[#FEF8E8] text-white rounded-xl shadow-lg transition-colors duration-300 font-semibold cursor-pointer"
              >
                Back to Site
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
