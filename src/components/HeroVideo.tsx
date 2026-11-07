"use client";
import { useEffect, useRef, useState } from "react";

export function HeroVideo() {
  const video = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const element = video.current;
    if (!element) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let inView = false;
    const syncPlayback = () => {
      if (inView && document.visibilityState === "visible" && !motion.matches && !userPaused.current && !document.querySelector("dialog[open]")) void element.play().catch(() => {});
      else element.pause();
    };
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting && entry.intersectionRatio >= 0.1;
      syncPlayback();
    }, { threshold: [0, 0.1] });
    const dialogObserver = new MutationObserver(syncPlayback);
    document.querySelectorAll("dialog").forEach(dialog => dialogObserver.observe(dialog, { attributes: true, attributeFilter: ["open"] }));
    observer.observe(element);
    motion.addEventListener("change", syncPlayback);
    document.addEventListener("visibilitychange", syncPlayback);
    return () => { observer.disconnect(); dialogObserver.disconnect(); motion.removeEventListener("change", syncPlayback); document.removeEventListener("visibilitychange", syncPlayback); element.pause(); };
  }, []);

  function toggle() {
    if (!video.current) return;
    if (video.current.paused) { userPaused.current = false; void video.current.play().catch(() => {}); }
    else { userPaused.current = true; video.current.pause(); }
  }

  return <>
    <video ref={video} className="hero-video" muted loop playsInline preload="metadata" poster="/images/premium-indian-wedding-poster.jpg" aria-label="Cinematic Indian wedding portrait of a bride and groom in natural light" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => setFailed(true)}>
      <source src="/videos/previews/hero-background-large.mp4" media="(min-width: 1600px)" type="video/mp4" />
      <source src="/videos/previews/hero-background.mp4" type="video/mp4" />
    </video>
    {!failed && <button type="button" className="video-toggle" onClick={toggle} aria-label={playing ? "Pause background video" : "Play background video"}><span aria-hidden="true">{playing ? "Ⅱ" : "▷"}</span>{playing ? "Pause video" : "Play video"}</button>}
  </>;
}
