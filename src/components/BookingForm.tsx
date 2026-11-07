"use client";
import { useRef, useState, type FormEvent } from "react";
import { collections } from "@/data/portfolio";

export function BookingForm({ email }: { email: string }) {
  const [draft, setDraft] = useState("");
  const [copyStatus, setCopyStatus] = useState("");
  const result = useRef<HTMLElement>(null);
  function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    setDraft(`Hello Arjun Photography,\n\nMy name is ${String(values.get("name")).trim()}.\nI’m interested in ${values.get("service")}.\nPreferred date: ${values.get("date") || "To be decided"}\nLocation: ${String(values.get("location")).trim() || "To be decided"}\nMy email: ${String(values.get("email")).trim()}\n\n${String(values.get("message")).trim()}\n\nPlease share your availability and further details.`);
    setCopyStatus("");
    requestAnimationFrame(() => result.current?.focus());
  }
  async function copy() {
    try { await navigator.clipboard.writeText(draft); setCopyStatus("Enquiry copied. Share it once the studio’s verified contact is available."); }
    catch { setCopyStatus("Copy is unavailable in this browser. Select and copy the enquiry text above."); }
  }
  return <form className="booking-form" onSubmit={prepare}>
    <div className="form-row"><label>Your name <input name="name" autoComplete="name" required maxLength={100} placeholder="Your full name" /></label><label>Email address <input name="email" type="email" autoComplete="email" required maxLength={150} placeholder="you@example.com" /></label></div>
    <div className="form-row"><label>What are we capturing? <select name="service" required defaultValue=""><option value="" disabled>Select a service</option>{collections.map(item => <option key={item.id}>{item.label}</option>)}</select></label><label>Preferred date <input name="date" type="date" min={new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata" }).format(new Date())} /></label></div>
    <label>Celebration / shoot location <input name="location" maxLength={200} placeholder="Town, venue, or somewhere you love" /></label>
    <label>A little about your plans <textarea name="message" required maxLength={3000} rows={4} placeholder="Tell us about the moments you’d like to preserve…" /></label>
    <p className="form-note">This preview prepares an enquiry on your device. Nothing is sent or saved by the website. {email ? "You can then send it using your email app." : "Bookings open once the studio’s contact details are confirmed."}</p>
    <button className="button" type="submit">Prepare my enquiry <span>↗</span></button>
    {draft && <section className="draft-preview" tabIndex={-1} ref={result} aria-label="Your enquiry draft"><h2>Your story starts here.</h2><pre>{draft}</pre><div className="draft-actions"><button className="button" type="button" onClick={copy}>Copy enquiry</button>{email && <a className="button button-outline" href={`mailto:${email}?subject=${encodeURIComponent("Photography booking enquiry")}&body=${encodeURIComponent(draft)}`}>Open email app ↗</a>}</div><p className="copy-status" role="status">{copyStatus || "Draft prepared. It has not been sent."}</p></section>}
  </form>;
}
