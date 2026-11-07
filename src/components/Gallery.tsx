"use client";
import { useEffect, useRef, useState } from "react";
import type { Collection } from "@/data/portfolio";
import { Photo } from "./Photo";
export function Gallery({ collection }: { collection: Collection }) {
  const [index, setIndex] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    const element = dialog.current;
    const onClose = () => { document.body.style.overflow = ""; trigger.current?.focus(); };
    element?.addEventListener("close", onClose);
    return () => { element?.removeEventListener("close", onClose); document.body.style.overflow = ""; };
  }, []);
  function show(i: number, button: HTMLButtonElement) {
    setIndex(i); trigger.current = button; dialog.current?.showModal(); document.body.style.overflow = "hidden";
  }
  function move(step: number) { setIndex(current => (current + step + collection.photos.length) % collection.photos.length); }
  return <>
    <button className="button gallery-button" aria-haspopup="dialog" aria-controls={`${collection.id}-gallery`} data-destination={collection.destination} onClick={e => show(0, e.currentTarget)}>{collection.cta}<span aria-hidden="true">↗</span></button>
    <div className={`photo-grid photos-${collection.photos.length}`}>
      {collection.photos.map((photo, i) => <button key={`${photo.src}-${i}`} className={`photo-tile tile-${i}`} onClick={e => show(i, e.currentTarget)} aria-label={`Enlarge ${photo.alt.toLowerCase()}`} aria-haspopup="dialog">
        <Photo photo={photo} />
        {collection.presentation === "album" && <span className="album-caption">{i === 0 ? "OUR FOREVER" : i === 1 ? "The little moments" : "A story to keep"}<small>ALBUM DESIGN CONCEPT</small></span>}
        {collection.presentation === "film" && i === 0 && <span className="film-still-label">CINEMATIC MOODBOARD · STILL IMAGE</span>}
        <span className="photo-enlarge" aria-hidden="true">↗</span>
      </button>)}
    </div>
    <dialog ref={dialog} id={`${collection.id}-gallery`} aria-label={`${collection.label} preview`} className="lightbox" onClick={e => { if (e.target === e.currentTarget) dialog.current?.close(); }} onKeyDown={e => { if (e.key === "ArrowRight") { e.preventDefault(); move(1); } if (e.key === "ArrowLeft") { e.preventDefault(); move(-1); } }}>
      <button className="lightbox-close" onClick={() => dialog.current?.close()} aria-label="Close gallery">×</button>
      <div className="lightbox-content"><Photo photo={collection.photos[index]} sizes="90vw" />
        <div className="lightbox-controls"><button onClick={() => move(-1)} aria-label="Previous photograph">←</button><p aria-live="polite">{collection.label} · {index + 1} / {collection.photos.length}</p><button onClick={() => move(1)} aria-label="Next photograph">→</button></div>
        <p className="lightbox-note">{collection.presentation === "film" ? "Film preview pending · These are illustrative stills. Client films will appear here once supplied." : collection.presentation === "album" ? "Illustrative album design concepts · Final album photography pending." : "Design preview · Sample photographs, not client work."}</p>
      </div>
    </dialog>
  </>;
}
