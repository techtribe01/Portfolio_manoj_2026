"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, Award, Sparkles, Code2, Globe } from "lucide-react";

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

interface ProjectItem {
  id: string;
  title: string;
  credential?: string;
  description: string;
  tags: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
}

const projects: ProjectItem[] = [
  {
    id: "qadis",
    title: "QADIS — Quantum Anomaly Detection",
    credential: "🥈 Runner-Up — Amaravati Quantum Valley Hackathon (AQVH918)",
    description: "Hybrid quantum-classical anomaly detection system built with Qiskit and PennyLane for real-time high-dimensional data security and quantum threat analysis.",
    tags: ["Qiskit", "PennyLane", "Quantum ML", "Python"],
    image: "/projects/qadis.png",
    liveUrl: "https://qadis.vercel.app",
    githubUrl: "https://github.com/techtribe01/Quantum_machine_Learning",
  },
  {
    id: "eyestalk",
    title: "EyesTalk — Brain-Computer Interface",
    credential: "📜 IEEE Paper Lead Author | Incubated at RTIH (Neurocommand Labs)",
    description: "EOG-based brain-computer interface achieving ~96% blink classification accuracy. Served as the founding tech for Neurocommand Labs startup.",
    tags: ["Neurotech", "BCI", "EOG", "Signal Processing", "Python"],
    image: "/projects/eyestalk.png",
    githubUrl: "https://github.com/techtribe01/eyetalk3",
  },
  {
    id: "skillarion",
    title: "Skillarion — Company Website",
    credential: "🚀 Production Marketing Site — Tech Lead Intern",
    description: "Production marketing site built for Skillarion featuring Next.js 14, TypeScript, Tailwind CSS, Framer Motion, and Zod form validation with Nodemailer API integration.",
    tags: ["Next.js 14", "TypeScript", "Tailwind CSS", "Framer Motion", "Zod"],
    image: "/projects/skillarion.png",
    liveUrl: "https://skillariondevelopment.netlify.app",
    githubUrl: "https://github.com/techtribe01/skillarion",
  },
  {
    id: "ccoin",
    title: "C Coin — Campus Currency",
    credential: "💎 Decentralized Blockchain Micro-Transactions",
    description: "Decentralized digital token and campus currency transaction platform engineered for seamless peer-to-peer campus micro-transfers and transparent smart contract auditing.",
    tags: ["Blockchain", "Ethereum", "Smart Contracts", "Solidity", "Web3"],
    image: "/projects/ccoin.png",
    liveUrl: "c-coin.vercel.app",
    githubUrl: "https://github.com/techtribe01/c2coin",
  },
];

export default function Projects() {
  const containerRef = useRef<HTMLElement>(null);

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
      y: -6,
      transition: { duration: 0.3 }
    }
  };

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#FEF8E8] text-[#161616] py-28 px-6 md:px-12 lg:px-20 flex flex-col items-center justify-center z-20 overflow-hidden font-jakarta"
    >
      {/* Decorative animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 -left-40 w-96 h-96 bg-[#F44A22]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl" />
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
        PROJECTS
      </motion.div>

      {/* Header Title Section */}
      <motion.div 
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="max-w-7xl w-full mx-auto mb-12 mt-8 z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-[#161616]/10 pb-6"
      >
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#F44A22] mb-2 block">
            Featured Innovations &amp; Builds
          </span>
          <h2 className="font-oswald text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-[#161616]">
            PROJECT PORTFOLIO
          </h2>
        </div>
        <p className="text-sm md:text-base text-[#161616]/70 max-w-md leading-relaxed">
          From quantum machine learning algorithms and brain-computer interfaces to high-performance enterprise web apps and blockchain solutions.
        </p>
      </motion.div>

      {/* Grid of Projects in Card Style */}
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 z-10">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            whileHover="hover"
            viewport={{ once: true, margin: "-100px" }}
            className="group bg-white/80 backdrop-blur-sm border-2 border-[#161616]/15 hover:border-[#F44A22]/60 rounded-2xl p-5 md:p-6 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden relative"
          >
            {/* Card Content Top */}
            <div>
              {/* Image Preview Banner */}
              <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden mb-6 bg-[#161616]/5 border border-[#161616]/10">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60" />
              </div>

              {/* Credential Badge */}
              {project.credential && (
                <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-wider text-[#F44A22] bg-[#F44A22]/10 border border-[#F44A22]/20 px-3 py-1 rounded-full mb-3 uppercase">
                  <span>{project.credential}</span>
                </div>
              )}

              {/* Project Title */}
              <h3 className="text-xl md:text-2xl font-bold font-jakarta text-[#161616] group-hover:text-[#F44A22] transition-colors duration-300 mb-3 tracking-tight">
                {project.title}
              </h3>

              {/* Project Description */}
              <p className="text-[#161616]/75 text-sm md:text-base leading-relaxed mb-6 font-normal">
                {project.description}
              </p>
            </div>

            {/* Card Content Bottom: Tags & Action Links */}
            <div>
              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-[#161616]/5 text-[#161616] text-xs font-semibold px-3 py-1 rounded-full border border-[#161616]/10 font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Icons Bar */}
              <div className="flex items-center gap-4 pt-4 border-t border-[#161616]/10">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#161616]/70 hover:text-[#F44A22] transition-colors duration-300 flex items-center gap-1.5 text-xs font-medium group/link"
                    title="View Source Code on GitHub"
                  >
                    <GithubIcon className="group-hover/link:text-[#F44A22] transition-colors" />
                    <span>Code</span>
                  </a>
                )}

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#161616]/70 hover:text-[#F44A22] transition-colors duration-300 flex items-center gap-1.5 text-xs font-medium group/link"
                    title="View Live Site"
                  >
                    <ExternalLink size={20} className="group-hover/link:text-[#F44A22] transition-colors" />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
