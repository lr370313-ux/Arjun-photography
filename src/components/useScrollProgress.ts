"use client";

import { useEffect, type RefObject } from "react";

type ScrollPhase = "exit" | "enter";

export function useScrollProgress(ref: RefObject<HTMLElement | null>, phase: ScrollPhase, property: string) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let start = 0;
    let distance = 1;
    let previous = -1;

    const update = () => {
      frame = 0;
      const progress = motion.matches
        ? phase === "enter" ? 1 : 0
        : Math.min(1, Math.max(0, (window.scrollY - start) / distance));
      const eased = progress * progress * (3 - 2 * progress);
      if (Math.abs(eased - previous) < 0.0005) return;
      element.style.setProperty(property, eased.toFixed(4));
      previous = eased;
    };
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    const measure = () => {
      start = phase === "exit" ? element.offsetTop : element.offsetTop - window.innerHeight * 0.94;
      distance = Math.max(1, phase === "exit" ? element.offsetHeight * 0.85 : window.innerHeight * 0.76);
      schedule();
    };
    const resize = new ResizeObserver(measure);
    resize.observe(element);
    // The preceding hero changes height with the viewport, so remeasure both phases on resize.
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", measure);
    motion.addEventListener("change", schedule);
    measure();

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      resize.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", measure);
      motion.removeEventListener("change", schedule);
      element.style.removeProperty(property);
    };
  }, [ref, phase, property]);
}
