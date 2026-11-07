"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

export function SmoothScrolling() {
  const pathname = usePathname();

  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      smoothWheel: true,
      lerp: 0.1,
      wheelMultiplier: 1,
      syncTouch: false,
      anchors: { offset: -25 },
      naiveDimensions: true,
      stopInertiaOnNavigate: true,
      respectReducedMotion: true,
      allowNestedScroll: true,
      prevent: node => Boolean(node.closest("dialog, select, [data-lenis-prevent]")),
    });

    // A gallery must stop both native scrolling and any remaining scroll momentum.
    const syncLock = () => {
      const locked = Boolean(document.querySelector("dialog[open]")) || document.body.style.overflow === "hidden";
      if (locked && !lenis.isStopped) lenis.stop();
      else if (!locked && lenis.isStopped) lenis.start();
    };
    const lockObserver = new MutationObserver(syncLock);
    lockObserver.observe(document.body, { attributes: true, attributeFilter: ["style"] });
    document.querySelectorAll("dialog").forEach(dialog => lockObserver.observe(dialog, { attributes: true, attributeFilter: ["open"] }));
    syncLock();

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const targets = [...document.querySelectorAll<HTMLElement>(".testimonials, .contact, .booking-intro, .booking-form, .booking-aside")];
    let revealObserver: IntersectionObserver | undefined;
    const setupReveals = () => {
      revealObserver?.disconnect();
      if (motion.matches) {
        targets.forEach(element => element.removeAttribute("data-scroll-reveal"));
        return;
      }
      revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          (entry.target as HTMLElement).dataset.scrollReveal = "visible";
          revealObserver?.unobserve(entry.target);
        });
      }, { threshold: 0.08, rootMargin: "0px 0px -30px 0px" });
      targets.forEach(element => {
        if (element.dataset.scrollReveal === "visible") return;
        if (element.getBoundingClientRect().top < window.innerHeight * 0.95) element.dataset.scrollReveal = "visible";
        else {
          element.dataset.scrollReveal = "pending";
          revealObserver?.observe(element);
        }
      });
    };
    setupReveals();
    motion.addEventListener("change", setupReveals);

    return () => {
      motion.removeEventListener("change", setupReveals);
      revealObserver?.disconnect();
      lockObserver.disconnect();
      targets.forEach(element => element.removeAttribute("data-scroll-reveal"));
      lenis.destroy();
    };
  }, [pathname]);

  return null;
}

