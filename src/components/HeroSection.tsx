"use client";

import { useRef, type ReactNode } from "react";
import { useScrollProgress } from "./useScrollProgress";

export function HeroSection({ children }: { children: ReactNode }) {
  const section = useRef<HTMLElement>(null);

  useScrollProgress(section, "exit", "--hero-scroll");

  return <section ref={section} id="home" className="cinematic-hero hero-scroll" aria-labelledby="hero-title">{children}</section>;
}
