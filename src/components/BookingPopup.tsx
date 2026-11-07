"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { BookingForm } from "./BookingForm";
import { business } from "@/data/business";
import styles from "./BookingPopup.module.css";

export function BookingPopup({ className = "" }: { className?: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const previousOverflow = useRef<string | null>(null);
  const panel = useRef<HTMLDivElement>(null);
  const scrolling = useRef<Lenis | null>(null);

  function restore() {
    scrolling.current?.destroy();
    scrolling.current = null;
    if (previousOverflow.current !== null) {
      document.body.style.overflow = previousOverflow.current;
      previousOverflow.current = null;
    }
  }

  useEffect(() => () => restore(), []);

  return <>
    <button ref={trigger} type="button" className={className} aria-haspopup="dialog" onClick={() => {
      previousOverflow.current = document.body.style.overflow;
      dialog.current?.showModal();
      document.body.style.overflow = "hidden";
      if (dialog.current && panel.current) {
        scrolling.current = new Lenis({
          wrapper: dialog.current,
          content: panel.current,
          autoRaf: true,
          smoothWheel: true,
          lerp: 0.1,
          syncTouch: false,
          respectReducedMotion: true,
          allowNestedScroll: true,
          prevent: node => node.tagName === "SELECT",
        });
      }
    }}>Book a slot <span aria-hidden="true">↗</span></button>
    <dialog ref={dialog} className={styles.dialog} aria-label="Book a photography slot" data-lenis-prevent onClose={() => {
      restore();
      trigger.current?.focus();
    }} onClick={event => {
      if (event.target === event.currentTarget) dialog.current?.close();
    }}>
      <div ref={panel} className={styles.panel}>
        <button autoFocus type="button" className={styles.close} aria-label="Close booking popup" onClick={() => dialog.current?.close()}>×</button>
        <h2>Book <em>a slot.</em></h2>
        <p>Share your preferred date and shoot details.</p>
        <BookingForm email={business.email} />
      </div>
    </dialog>
  </>;
}
