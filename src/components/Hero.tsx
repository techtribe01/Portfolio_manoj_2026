"use client";

import Link from "next/link";
import { ArrowUpRight, BrainCircuit, Database, Sparkles } from "lucide-react";

const focusAreas = ["AI ENGINEERING", "MACHINE LEARNING", "LLM SYSTEMS", "GENERATIVE AI"];

export default function Hero() {
  return (
    <section id="home" className="relative isolate min-h-screen overflow-hidden bg-background text-foreground">
      <div className="absolute inset-0 -z-10 bg-grid opacity-60" />
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 pb-12 pt-32 md:px-10 lg:px-16 lg:pt-40">
        <div className="flex flex-1 flex-col justify-center">
          <div className="mb-8 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.24em] text-primary">
            <span className="size-2 rounded-full bg-primary shadow-[0_0_18px_hsl(var(--primary))]" />
            Available for ambitious AI products
          </div>
          <div className="grid items-end gap-12 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="mb-5 font-mono text-sm text-muted-foreground">MANOJ KUMAR THAMMISETTI / 2026</p>
              <h1 className="max-w-5xl font-sans text-[clamp(3.7rem,10vw,9.5rem)] font-semibold leading-[0.86] tracking-[-0.075em] text-balance">
                I BUILD <span className="text-primary">INTELLIGENT</span> SYSTEMS.
              </h1>
            </div>
            <div className="flex flex-col gap-7 pb-2 lg:max-w-sm">
              <p className="text-lg leading-relaxed text-muted-foreground">
                AI Engineer and builder working across machine learning, LLM applications, data science, and generative AI.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="#projects" className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-1">
                  Explore my work <ArrowUpRight className="size-4" />
                </Link>
                <Link href="#contact" className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-semibold transition-colors hover:border-primary hover:text-primary">
                  Let&apos;s connect
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-20 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3">
            {[
              [BrainCircuit, "01", "Model to product", "Research-minded systems with a path to production."],
              [Database, "02", "Data in motion", "Reliable pipelines, meaningful signals, measurable outcomes."],
              [Sparkles, "03", "Human impact", "Technology that feels useful, clear, and considered."],
            ].map(([Icon, number, title, copy]) => (
              <div key={number as string} className="bg-card p-6">
                <div className="mb-10 flex items-center justify-between text-primary"><Icon className="size-5" /><span className="font-mono text-xs text-muted-foreground">{number as string}</span></div>
                <h2 className="mb-2 text-base font-semibold">{title as string}</h2>
                <p className="text-sm leading-relaxed text-muted-foreground">{copy as string}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10 overflow-hidden border-y border-border py-3 font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
          <div className="animate-marquee"><span>AI ENGINEER &nbsp; / &nbsp; DATA SCIENTIST &nbsp; / &nbsp; ML ENGINEER &nbsp; / &nbsp; LLM ENGINEER &nbsp; / &nbsp; GENAI ENGINEER &nbsp; / &nbsp;</span><span>AI ENGINEER &nbsp; / &nbsp; DATA SCIENTIST &nbsp; / &nbsp; ML ENGINEER &nbsp; / &nbsp; LLM ENGINEER &nbsp; / &nbsp; GENAI ENGINEER &nbsp; / &nbsp;</span></div>
        </div>
      </div>
    </section>
  );
}
