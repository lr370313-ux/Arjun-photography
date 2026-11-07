import { business } from "@/data/business";

export function ContactOptions() {
  return <div className="contact-options">
    {business.whatsapp ? <a className="button button-outline" href={`https://wa.me/${business.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer">WhatsApp us ↗</a> : <button className="button button-outline" disabled>WhatsApp · Coming soon</button>}
    {business.phone ? <a className="button button-outline" href={`tel:${business.phone.replace(/[^+\d]/g, "")}`}>Call the studio ↗</a> : <button className="button button-outline" disabled>Call · +91 XXXXX XXXXX</button>}
  </div>;
}
