"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { BookingPopup } from "./BookingPopup";
const menu = [
  { label: "Home", href: "/", id: "home" },
  { label: "About Us", href: "/about/", id: "about" },
  { label: "Services", href: "/services/", id: "services" },
  { label: "Our Work", href: "/portfolio/", id: "portfolio" },
  { label: "Contact Us", href: "/contact/", id: "contact" },
];
export function Header({ overlay = false }: { overlay?: boolean }) {
  const pathname = usePathname();
  const pageId = menu.find(item => item.href === pathname || item.href === pathname + "/")?.id;
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [keyboardFocus, setKeyboardFocus] = useState(false);
  const [active, setActive] = useState(pageId ?? "");
  useEffect(() => {
    const sync = () => {
      const sectionId = menu.find(item => item.href === "/" + window.location.hash)?.id;
      setActive(pageId === "home" ? sectionId ?? "home" : pageId ?? "");
      setOpen(false);
    };
    sync();
    window.addEventListener("hashchange", sync);
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", close);
    return () => { window.removeEventListener("hashchange", sync); window.removeEventListener("keydown", close); };
  }, [overlay, pageId]);
  useEffect(() => {
    let lastY = Math.max(0, window.scrollY);
    let direction = 0;
    let travel = 0;
    let frame = 0;
    setScrolled(lastY > 32);
    setHidden(false);
    const update = () => {
      frame = 0;
      const y = Math.max(0, window.scrollY);
      const delta = y - lastY;
      setScrolled(y > 32);
      if (y < 20 || open || keyboardFocus) { setHidden(false); travel = 0; }
      else if (Math.abs(delta) > .2) {
        const nextDirection = delta > 0 ? 1 : -1;
        if (nextDirection !== direction) travel = 0;
        direction = nextDirection;
        travel += delta;
        if (Math.abs(travel) > 10) setHidden(direction > 0 && y > 110);
      }
      lastY = y;
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    window.addEventListener("scroll", schedule, { passive: true });
    return () => { window.removeEventListener("scroll", schedule); if (frame) cancelAnimationFrame(frame); };
  }, [pathname, open, keyboardFocus]);

  return <>{!overlay && <div className="header-spacer" aria-hidden="true" />}<header className={`header header-fixed ${overlay ? "header-overlay" : "header-solid"} ${hidden ? "header-hidden" : ""} ${scrolled ? "header-scrolled" : ""} ${open ? "header-menu-open" : ""}`} onFocusCapture={event => { if (event.target.matches(":focus-visible")) setKeyboardFocus(true); }} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setKeyboardFocus(false); }}>
    <a className="header-brand" href="/" aria-label="Arjun Photography home"><span className="brand-icon" aria-hidden="true"><svg viewBox="0 0 32 32" fill="none"><path d="M5 10h6l2-4h7l2 4h5v16H5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><circle cx="16" cy="18" r="5" stroke="currentColor" strokeWidth="1.5" /></svg></span><span className="wordmark">ARJUN<span>Photography</span></span></a>
    <button className="menu-toggle" aria-expanded={open} aria-controls="main-nav" onClick={() => setOpen(!open)}>{open ? "Close −" : "Menu +"}</button>
    <nav id="main-nav" className={open ? "nav open" : "nav"} aria-label="Main navigation">
      {menu.map(item => <a key={item.id} href={item.href} className={active === item.id ? "is-active" : undefined} aria-current={active === item.id ? !item.href.includes("#") ? "page" : "location" : undefined} onClick={() => { setActive(item.id); setOpen(false); }}>{item.label}</a>)}
      <BookingPopup className="mobile-book" />
    </nav>
    <BookingPopup className="header-cta" />
  </header></>;
}

