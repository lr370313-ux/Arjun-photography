"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function ServiceStack({ children }: { children: ReactNode }) {
  const stack = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const container = stack.current;
    if (!container) return;
    const sections = [...container.querySelectorAll<HTMLElement>(":scope > .collection")];
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let lastTime = 0;
    let disposed = false;
    let distance = 1;
    let metrics: { inner: HTMLElement; start: number; previous: number }[] = [];

    const update = (time: number) => {
      frame = 0;
      const elapsed = lastTime ? Math.min(64, time - lastTime) : 16;
      lastTime = time;
      const blend = 1 - Math.exp(-elapsed / 240);
      let settling = false;
      const scroll = window.scrollY;
      for (const item of metrics) {
        const progress = motion.matches ? 1 : Math.min(1, Math.max(0, (scroll - item.start) / distance));
        const target = progress * progress * (3 - 2 * progress);
        let value = item.previous < 0 || motion.matches ? target : item.previous + (target - item.previous) * blend;
        if (Math.abs(target - value) < .0005) value = target;
        else settling = true;
        if (value === item.previous) continue;
        item.inner.style.setProperty("--service-enter", value.toFixed(4));
        item.previous = value;
      }
      // Smooth only the visual zoom; the page keeps responding immediately.
      if (settling) frame = requestAnimationFrame(update);
    };
    const schedule = () => { if (!frame) { lastTime = 0; frame = requestAnimationFrame(update); } };
    const measure = () => {
      if (disposed) return;
      // Sticky offsetTop changes during scrolling. Cache normal-flow starts
      // from the stack position and section heights instead.
      let naturalTop = container.getBoundingClientRect().top + window.scrollY;
      distance = Math.max(1, window.innerHeight * 1.2);
      metrics = [];
      for (const section of sections) {
        const height = section.offsetHeight;
        section.style.setProperty("--service-height", `${height}px`);
        const inner = section.querySelector<HTMLElement>(".collection-inner");
        if (inner) metrics.push({ inner, start: naturalTop - window.innerHeight * .88, previous: -1 });
        naturalTop += height;
      }
      schedule();
    };
    const observer = new ResizeObserver(measure);
    observer.observe(container);
    sections.forEach(section => observer.observe(section));
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", measure);
    motion.addEventListener("change", schedule);
    void document.fonts.ready.then(measure);
    measure();
    return () => {
      disposed = true;
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", measure);
      motion.removeEventListener("change", schedule);
      sections.forEach(section => {
        section.style.removeProperty("--service-height");
        section.querySelector<HTMLElement>(".collection-inner")?.style.removeProperty("--service-enter");
      });
    };
  }, []);
  return <div ref={stack} className="service-stack">{children}</div>;
}

