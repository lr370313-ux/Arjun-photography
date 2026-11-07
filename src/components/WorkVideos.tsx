"use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { workVideos } from "@/data/workVideos";

type Film = (typeof workVideos)[number];
const wrap = (index: number) => ((index % workVideos.length) + workVideos.length) % workVideos.length;

function Preview({ film, playing }: { film: Film; playing: boolean }) {
  const video = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const element = video.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      const shown = entry.isIntersecting && entry.intersectionRatio >= 0.15;
      setInView(shown);
      if (shown) setLoaded(true);
    }, { threshold: [0, 0.15] });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const element = video.current;
    if (!element) return;
    if (playing && inView && loaded) void element.play().catch(() => {});
    else element.pause();
    return () => element.pause();
  }, [playing, inView, loaded]);
  return <video ref={video} src={loaded ? film.preview : undefined} poster={film.poster} muted loop playsInline preload="none" disablePictureInPicture aria-label={`${film.title} sample preview`} />;
}

export function WorkVideos() {
  const [active, setActive] = useState(2);
  const [watching, setWatching] = useState(2);
  const [visible, setVisible] = useState(false);
  const [motionAllowed, setMotionAllowed] = useState(false);
  const [paused, setPaused] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [sliderPaused, setSliderPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [dragging, setDragging] = useState(false);
  const stage = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const player = useRef<HTMLVideoElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const pointer = useRef<{ x: number; y: number } | null>(null);
  const swiped = useRef(false);
  const move = (step: number) => setActive(current => current + step);

  useEffect(() => {
    const element = stage.current;
    if (!element) return;
    let intersects = false;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => { setVisible(intersects && document.visibilityState === "visible"); setMotionAllowed(!motion.matches); };
    const observer = new IntersectionObserver(([entry]) => { intersects = entry.isIntersecting && entry.intersectionRatio >= 0.1; sync(); }, { threshold: [0, 0.1] });
    observer.observe(element);
    motion.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    sync();
    return () => { observer.disconnect(); motion.removeEventListener("change", sync); document.removeEventListener("visibilitychange", sync); };
  }, []);

  useEffect(() => {
    if (!visible || !motionAllowed || paused || sliderPaused || modalOpen || hovered || focused || dragging) return;
    const timer = window.setTimeout(() => setActive(current => current + 1), 5000);
    return () => window.clearTimeout(timer);
  }, [active, visible, motionAllowed, paused, sliderPaused, modalOpen, hovered, focused, dragging]);

  function open(index: number, button: HTMLButtonElement) {
    setWatching(index); setModalOpen(true); trigger.current = button;
    dialog.current?.showModal(); document.body.style.overflow = "hidden";
  }
  return <section id="our-work" className="work-videos" aria-labelledby="work-title" aria-roledescription="carousel" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onFocusCapture={event => { if (event.target.matches(":focus-visible")) setFocused(true); }} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false); }} onKeyDown={event => {
    if (dialog.current?.open) return;
    if (event.key === "ArrowRight") { event.preventDefault(); move(1); }
    if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); }
  }}>
    <h2 id="work-title">Our <em>Work</em></h2><p>Weddings, pre-weddings and celebrations.</p>
    <div ref={stage} className="work-stage" onPointerDown={event => { if (event.pointerType === "touch") { pointer.current = { x: event.clientX, y: event.clientY }; setDragging(true); } }} onPointerUp={event => {
      setDragging(false);
      if (!pointer.current) return;
      const dx = event.clientX - pointer.current.x, dy = event.clientY - pointer.current.y;
      pointer.current = null;
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) { swiped.current = true; move(dx < 0 ? 1 : -1); }
    }} onPointerCancel={() => { pointer.current = null; setDragging(false); }}>
      {Array.from({ length: 7 }, (_, slot) => {
        const offset = slot - 3, position = active + offset, index = wrap(position), film = workVideos[index], hidden = Math.abs(offset) > 2;
        return <button key={position} className={`work-card distance-${Math.abs(offset)}`} style={{ "--side": Math.sign(offset), zIndex: 5 - Math.abs(offset) } as CSSProperties} tabIndex={hidden ? -1 : 0} aria-hidden={hidden || undefined} aria-label={offset === 0 ? `Watch ${film.title} film` : `Select ${film.title} film`} data-film={film.title} onClick={event => {
          if (swiped.current) { swiped.current = false; return; }
          if (offset === 0) open(index, event.currentTarget); else move(offset);
        }}>
          <Preview film={film} playing={!hidden && visible && motionAllowed && !paused && !modalOpen} />
          <span className="work-card-category">{film.title}</span><span className="work-card-bottom">Watch film <span aria-hidden="true">↗</span></span>
        </button>;
      })}
    </div>
    <div className="work-controls"><button onClick={() => move(-1)} aria-label="Previous film">←</button><p aria-live={sliderPaused || focused ? "polite" : "off"}>{workVideos[wrap(active)].title}</p><button onClick={() => move(1)} aria-label="Next film">→</button></div>
    <div className="work-preview-options"><span>Sample films</span><button onClick={() => setSliderPaused(value => !value)} aria-pressed={sliderPaused}>{sliderPaused ? "Resume slider" : "Pause slider"}</button><button onClick={() => setPaused(value => !value)} aria-pressed={paused}>{paused ? "Resume previews" : "Pause previews"}</button></div>
    <dialog ref={dialog} className="work-player" aria-label={`${workVideos[watching].title} sample film`} onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }} onClose={() => { player.current?.pause(); setModalOpen(false); document.body.style.overflow = ""; trigger.current?.focus(); }}>
      <button className="lightbox-close" aria-label="Close film" onClick={() => dialog.current?.close()}>×</button>
      {modalOpen && <video key={workVideos[watching].src} ref={player} src={workVideos[watching].src} poster={workVideos[watching].poster} controls autoPlay playsInline preload="none" />}
    </dialog>
  </section>;
}


