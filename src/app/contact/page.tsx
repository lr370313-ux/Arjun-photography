import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Photo } from "@/components/Photo";
import { BookingForm } from "@/components/BookingForm";
import { BookingPopup } from "@/components/BookingPopup";
import { business } from "@/data/business";
import heroStyles from "../services/page.module.css";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Contact & Book a Shoot | Arjun Photography, Ramnagar",
  description: "Plan your photography session with Arjun Photography in Peerumadara, Ramnagar. Tell us about your celebration, preferred date and location.",
  ...(process.env.NEXT_PUBLIC_SITE_URL ? { alternates: { canonical: "/contact/" } } : {}),
};

export default function ContactPage() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Header overlay />
      <main id="main" className={styles.page}>
        <section className={heroStyles.hero} aria-labelledby="contact-heading">
          <Photo priority photo={{ src: "wedding-4", alt: "Bridal jewellery and henna at an Indian wedding" }} sizes="100vw" />
          <div>
            <p className={heroStyles.label}>Arjun Photography · Ramnagar</p>
            <h1 id="contact-heading">Contact <em>us</em></h1>
            <p>Tell us about the day you’re planning.</p>
            <a href="#enquiry" className={heroStyles.link}>Plan your shoot <span aria-hidden="true">↓</span></a>
          </div>
        </section>

        <section className={styles.contact} aria-labelledby="contact-team">
          <div className={styles.intro}>
            <h2 id="contact-team">Talk to our<br /><em>photography team.</em></h2>
            <p>Have a question about your shoot? Get in touch to discuss your date, location and the coverage you have in mind.</p>
          </div>
          <div className={styles.cards}>
            <article className={styles.card}>
              <div className={styles.cardTop}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 3h4l2 5-3 2c2 3 3 4 6 6l2-3 5 2v4c0 2-2 2-3 2C10 20 4 14 3 6c0-1 0-3 2-3Z" /></svg><span>01 / Call us</span></div>
              <h3>Let’s talk photography.</h3>
              <p>Ask about wedding coverage, a portrait session or your next celebration.</p>
              <div className={styles.detail}>{business.phone ? <a href={`tel:${business.phone}`}>{business.phone}</a> : <span>+91 XXXXX XXXXX · Sample number</span>}</div>
              {business.whatsapp ? <a className={styles.action} href={`https://wa.me/${business.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer">Message on WhatsApp <span>↗</span></a> : <a className={styles.action} href="#enquiry">Prepare an enquiry <span>↗</span></a>}
            </article>
            <article className={styles.card}>
              <div className={styles.cardTop}><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m2 6 10 7L22 6" /></svg><span>02 / Email us</span></div>
              <h3>Share your plans.</h3>
              <p>Send your date, venue and ideas. Let us know which moments matter most to you.</p>
              <div className={styles.detail}>{business.email ? <a href={`mailto:${business.email}`}>{business.email}</a> : <span>hello@example.com · Sample email</span>}</div>
              <a className={styles.action} href={business.email ? `mailto:${business.email}` : "#enquiry"}>Write to our team <span>↗</span></a>
            </article>
            <article className={`${styles.card} ${styles.location}`}>
              <div className={styles.cardTop}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg><span>03 / Find us</span></div>
              <h3>Visit us in Ramnagar.</h3>
              <address>{business.location}</address>
              <a className={styles.action} href={business.mapUrl} target="_blank" rel="noopener noreferrer">Get directions <span>↗</span></a>
            </article>
          </div>
        </section>

        <section id="enquiry" className={styles.enquiry} aria-labelledby="enquiry-title">
          <div className={styles.copy}>
            <p className={styles.eyebrow}>Your next occasion</p>
            <h2 id="enquiry-title">Let’s plan<br /><em>your shoot.</em></h2>
            <p>Tell us a little about your celebration, the location and your preferred date.</p>
            <p>If you’re still deciding on the details, share what you know so far. You can choose your photography service in the form.</p>
          </div>
          <div className={styles.form}><BookingForm email={business.email} /></div>
        </section>
        <section className={heroStyles.cta} aria-labelledby="contact-cta-title">
          <p className={heroStyles.label}>Your next celebration</p>
          <h2 id="contact-cta-title">Have a date <em>in mind?</em></h2>
          <p>Let’s talk about your plans and the photographs you’d love to take home.</p>
          <BookingPopup className={heroStyles.button} />
        </section>
      </main>
      <Footer />
    </>
  );
}
