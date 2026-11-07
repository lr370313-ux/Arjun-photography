"use client";

import { useEffect, useRef, useState } from "react";
import { sampleTestimonials } from "@/data/testimonials";

export function Testimonials() {
  const section = useRef<HTMLElement>(null);
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(3);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);
  const pageCount = Math.ceil(sampleTestimonials.length / perPage);

  useEffect(() => {
    const element = section.current;
    if (!element) return;
    const small = window.matchMedia("(max-width: 700px)");
    const medium = window.matchMedia("(max-width: 1100px)");
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let intersects = false;
    const resize = () => { setPerPage(small.matches ? 1 : medium.matches ? 2 : 3); setPage(0); };
    const sync = () => { setVisible(intersects && document.visibilityState === "visible"); setReducedMotion(motion.matches); };
    const observer = new IntersectionObserver(([entry]) => { intersects = entry.isIntersecting && entry.intersectionRatio >= .15; sync(); }, { threshold: [0, .15] });
    observer.observe(element);
    small.addEventListener("change", resize);
    medium.addEventListener("change", resize);
    motion.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    resize(); sync();
    return () => { observer.disconnect(); small.removeEventListener("change", resize); medium.removeEventListener("change", resize); motion.removeEventListener("change", sync); document.removeEventListener("visibilitychange", sync); };
  }, []);

  useEffect(() => {
    if (!visible || paused || hovered || focused || reducedMotion) return;
    const timer = window.setInterval(() => setPage(current => (current + 1) % pageCount), 7000);
    return () => window.clearInterval(timer);
  }, [visible, paused, hovered, focused, reducedMotion, pageCount]);

  const move = (direction: number) => setPage(current => (current + direction + pageCount) % pageCount);

  return <section ref={section} className="testimonials testimonials-glass" id="testimonials" aria-labelledby="testimonials-title" aria-roledescription="carousel" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onFocusCapture={() => setFocused(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false); }}>
    <p className="eyebrow">CLIENT FEEDBACK</p>
    <h2 id="testimonials-title"><span>Words From</span><br /><em>the Heart</em></h2>
    <div className="testimonial-cards" key={`${page}-${perPage}`}>
      {sampleTestimonials.slice(page * perPage, (page + 1) * perPage).map(review => <figure className="testimonial-glass-card" key={review.name}>
        <span className="testimonial-initials" aria-hidden="true">{review.initials}</span>
        <span className="testimonial-quote" aria-hidden="true">”</span>
        <blockquote><p>“{review.quote}”</p></blockquote>
        <figcaption><span className="testimonial-name">{review.name}</span><span className="testimonial-sample">Sample review · fictional client</span></figcaption>
      </figure>)}
    </div>
    <div className="testimonial-controls">
      <button type="button" onClick={() => move(-1)} aria-label="Previous client reviews">←</button>
      <span className="testimonial-controls-label">More client reviews</span>
      <button type="button" onClick={() => move(1)} aria-label="Next client reviews">→</button>
      <button type="button" onClick={() => setPaused(value => !value)} aria-label={paused ? "Resume review slideshow" : "Pause review slideshow"} aria-pressed={paused}>{paused ? <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 10 7-10 7Z" /></svg> : <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14M16 5v14" /></svg>}</button>
    </div>
    <span className="sr-only" aria-live={focused || paused ? "polite" : "off"}>Review group {page + 1} of {pageCount}</span>
  </section>;
}
