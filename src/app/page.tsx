import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Awards from "@/components/Awards";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="relative w-full bg-[#0a0a0a] overflow-x-hidden">
      <Hero />
      <About />
      <Projects />
      <Awards />
      <Contact />
    </main>
  );
}
