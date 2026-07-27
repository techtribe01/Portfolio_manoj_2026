"use client";

import React, { createContext, useContext, useRef } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";

interface TransitionContextType {
  startTransition: (href: string) => void;
}

const TransitionContext = createContext<TransitionContextType | null>(null);

export const usePageTransition = () => {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error("usePageTransition must be used within a PageTransitionProvider");
  }
  return context;
};

const ColumnWithCurves = () => {
  return (
    <div className="absolute inset-0 w-full h-full bg-[#161616]">
      {/* Top Curve (pointing upwards) */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute bottom-full left-0 w-full h-[15vh] fill-[#161616] pointer-events-none"
      >
        <path d="M 0 100 C 30 0, 70 0, 100 100 Z" />
      </svg>

      {/* Bottom Curve (pointing downwards) */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute top-full left-0 w-full h-[15vh] fill-[#161616] pointer-events-none"
      >
        <path d="M 0 0 C 30 100, 70 100, 100 0 Z" />
      </svg>
    </div>
  );
};

export const PageTransitionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const isTransitioning = useRef(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const ladderRefs = useRef<(HTMLDivElement | null)[]>([]);

  const startTransition = (href: string) => {
    if (isTransitioning.current) return;
    isTransitioning.current = true;

    // Enable pointer events to block clicks during transition
    if (overlayRef.current) {
      overlayRef.current.style.pointerEvents = "auto";
    }

    const tl = gsap.timeline({
      onComplete: () => {
        router.push(href);
        // Wait a tiny bit for hydration/render, then retract
        setTimeout(() => {
          retractLadders();
        }, 150);
      },
    });

    // Descent animation: Panels slide down one by one
    // Animate from -115% to 0% to completely clear/cover the screen including the curve
    tl.to(ladderRefs.current, {
      y: "0%",
      duration: 0.7,
      stagger: 0.08,
      ease: "power2.inOut",
    });
  };

  const retractLadders = () => {
    const tl = gsap.timeline({
      onComplete: () => {
        isTransitioning.current = false;
        if (overlayRef.current) {
          overlayRef.current.style.pointerEvents = "none";
        }
      },
    });

    // Retract animation: Panels slide back up in reverse order
    tl.to(ladderRefs.current, {
      y: "-115%", // Translate past viewport plus the 15vh curve
      duration: 0.7,
      stagger: {
        each: 0.08,
        from: "end", // Reverse order
      },
      ease: "power2.inOut",
    });
  };

  return (
    <TransitionContext.Provider value={{ startTransition }}>
      {children}

      {/* Ladder Transitions Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[9999] pointer-events-none flex"
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              ladderRefs.current[i] = el;
            }}
            className="w-[16.667%] h-[100vh] relative flex-shrink-0"
            style={{ transform: "translateY(-115%)" }}
          >
            <ColumnWithCurves />
          </div>
        ))}
      </div>
    </TransitionContext.Provider>
  );
};
