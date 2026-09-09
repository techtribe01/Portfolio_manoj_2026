import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { PageTransitionProvider } from "@/components/PageTransition";

const geistSans = localFont({ src: "./fonts/GeistVF.woff", variable: "--font-geist-sans", weight: "100 900" });
const geistMono = localFont({ src: "./fonts/GeistMonoVF.woff", variable: "--font-geist-mono", weight: "100 900" });

export const metadata: Metadata = {
  title: "Manoj Kumar Thammisetti | AI Engineer & ML Builder",
  description: "Portfolio of Manoj Kumar Thammisetti — AI Engineer, Data Scientist, ML Engineer, LLM Engineer, and GenAI builder.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className="bg-background"><body className={`${geistSans.variable} ${geistMono.variable}`}><PageTransitionProvider>{children}<Navbar /></PageTransitionProvider></body></html>;
}
