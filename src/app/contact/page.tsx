import Contact from "@/components/Contact";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Nand Kishore Soni",
  description: "Get in touch with Nand Kishore Soni for freelance projects, design collaborations, or development opportunities.",
};

export default function ContactPage() {
  return (
    <main className="relative min-h-screen bg-palette-grey overflow-hidden">
      <Contact />
    </main>
  );
}
