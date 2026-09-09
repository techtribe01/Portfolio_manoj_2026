"use client";

import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";

const strengths = ["Applied machine learning", "LLM and RAG systems", "Data analysis with Python", "Production-ready AI products"];

export default function About() {
  return (
    <section id="about" className="bg-surface px-6 py-28 text-foreground md:px-10 lg:px-16">
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        <div>
          <p className="eyebrow">01 / About</p>
          <h2 className="mt-6 max-w-md font-sans text-5xl font-semibold leading-[0.95] tracking-[-0.06em] md:text-7xl">AI systems, built with purpose.</h2>
        </div>
        <div className="max-w-3xl">
          <p className="text-2xl leading-snug text-foreground md:text-4xl">I&apos;m Manoj, an AI engineer building practical systems across machine learning, data science, LLMs, and generative AI.</p>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground">I work across the full loop: data, models, evaluation, and deployment—with a focus on clarity and measurable impact.</p>
          <div className="mt-12 grid gap-3 border-y border-border py-6 sm:grid-cols-2">
            {strengths.map((strength) => <div key={strength} className="flex items-center gap-3 text-sm font-medium"><Check className="size-4 text-primary" />{strength}</div>)}
          </div>
          <Link href="#contact" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">More about my approach <ArrowUpRight className="size-4" /></Link>
        </div>
      </div>
    </section>
  );
}
