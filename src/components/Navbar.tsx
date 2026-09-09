"use client";

import { useEffect, useState } from "react";
import { BriefcaseBusiness, Home, Mail, UserRound } from "lucide-react";

const items = [
  { label: "Home", id: "home", icon: Home },
  { label: "About", id: "about", icon: UserRound },
  { label: "Work", id: "projects", icon: BriefcaseBusiness },
  { label: "Contact", id: "contact", icon: Mail },
];

export default function Navbar() {
  const [active, setActive] = useState("home");
  useEffect(() => {
    const onScroll = () => {
      const current = items.findLast((item) => window.scrollY + 180 >= (document.getElementById(item.id)?.offsetTop ?? 0));
      if (current) setActive(current.id);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return <nav aria-label="Primary navigation" className="fixed inset-x-0 top-5 z-50 mx-auto flex w-fit items-center gap-1 rounded-full border border-border bg-background/85 p-1.5 shadow-2xl backdrop-blur-xl">{items.map(({ label, id, icon: Icon }) => <a key={id} href={`#${id}`} onClick={() => setActive(id)} className={`flex items-center gap-2 rounded-full px-3 py-2 text-xs font-medium transition-colors md:px-4 ${active === id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}><Icon className="size-4" /><span className="hidden sm:inline">{label}</span></a>)}</nav>;
}
