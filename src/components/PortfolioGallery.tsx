"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { allPortfolioItems, portfolioCategories } from "@/data/portfolioGallery";
import { Photo } from "./Photo";

const categories = [{ id: "all", label: "All" }, ...portfolioCategories];

export function PortfolioGallery({ full = false }: { full?: boolean }) {
  const [active, setActive] = useState("all");
  const [index, setIndex] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const prefix = full ? "full-portfolio" : "home-portfolio";
  const category = portfolioCategories.find(item => item.id === active);
  const filtered = category ? category.photos.map(photo => ({ photo, category: category.label, categoryId: category.id })) : allPortfolioItems;
  const shown = full ? filtered : filtered.slice(0, 6);

  useEffect(() => {
    const element = dialog.current;
    return () => { if (element?.open) document.body.style.overflow = ""; };
  }, []);

  function select(id: string) { setActive(id); setIndex(0); }
  function navigateTabs(event: KeyboardEvent<HTMLButtonElement>, position: number) {
    let next = position;
    if (event.key === "ArrowRight") next = (position + 1) % categories.length;
    else if (event.key === "ArrowLeft") next = (position - 1 + categories.length) % categories.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = categories.length - 1;
    else return;
    event.preventDefault(); select(categories[next].id); tabs.current[next]?.focus();
  }
  function open(position: number, button: HTMLButtonElement) {
    setIndex(position); trigger.current = button; dialog.current?.showModal(); document.body.style.overflow = "hidden";
  }
  const move = (step: number) => setIndex(current => (current + step + shown.length) % shown.length);

  return <>
    <div className="portfolio-tabs" role="tablist" aria-label="Portfolio categories">
      {categories.map((item, position) => <button key={item.id} ref={element => { tabs.current[position] = element; }} type="button" role="tab" id={`${prefix}-tab-${item.id}`} aria-selected={active === item.id} aria-controls={`${prefix}-photos`} tabIndex={active === item.id ? 0 : -1} onKeyDown={event => navigateTabs(event, position)} onClick={() => select(item.id)}>{item.label}</button>)}
    </div>
    <div id={`${prefix}-photos`} role="tabpanel" aria-labelledby={`${prefix}-tab-${active}`} tabIndex={0}>
      <div className="portfolio-photo-grid" key={active}>
        {shown.map((item, position) => <button type="button" className="portfolio-photo" key={item.photo.src} aria-label={`View ${item.photo.alt.toLowerCase()}`} aria-haspopup="dialog" onClick={event => open(position, event.currentTarget)}>
          <Photo photo={{ ...item.photo, position: item.photo.position || "center 35%" }} sizes="(max-width: 700px) 45vw, 30vw" />
          <span className="portfolio-photo-category">{item.category}</span><span className="portfolio-photo-arrow" aria-hidden="true">↗</span>
        </button>)}
      </div>
    </div>
    <div className="portfolio-bottom">{!full && <Link className="button portfolio-full-link" href="/portfolio/">See full portfolio <span aria-hidden="true">↗</span></Link>}<p className="portfolio-sample">Sample photographs</p></div>
    <dialog ref={dialog} className="lightbox" aria-label="Portfolio photograph" onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }} onClose={() => { document.body.style.overflow = ""; trigger.current?.focus(); }} onKeyDown={event => { if (event.key === "ArrowRight") { event.preventDefault(); move(1); } if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); } }}>
      <button type="button" className="lightbox-close" aria-label="Close portfolio photograph" onClick={() => dialog.current?.close()}>×</button>
      <div className="lightbox-content">
        {shown[index] && <Photo photo={shown[index].photo} sizes="90vw" />}
        <div className="lightbox-controls"><button type="button" onClick={() => move(-1)} aria-label="Previous portfolio photograph">←</button><p aria-live="polite">{shown[index]?.category} · {index + 1} / {shown.length}</p><button type="button" onClick={() => move(1)} aria-label="Next portfolio photograph">→</button></div>
        <p className="lightbox-note">Sample photographs</p>
      </div>
    </dialog>
  </>;
}
