import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Photo } from "@/components/Photo";
import { collections } from "@/data/portfolio";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Our Services | Arjun Photography, Ramnagar",
  description: "Explore wedding, pre-wedding, birthday, engagement, maternity and event photography, cinematic films and photo album creation in Ramnagar.",
  ...(process.env.NEXT_PUBLIC_SITE_URL ? { alternates: { canonical: "/services/" } } : {}),
};

export default function ServicesPage() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Header overlay />
      <main id="main" className={styles.page}>
        <section className={styles.hero} aria-labelledby="services-title">
          <Photo priority photo={{ src: "wedding-4", alt: "Bridal jewellery and henna during an Indian wedding" }} sizes="100vw" />
          <div>
            <p className={styles.label}>Photography & films</p>
            <h1 id="services-title">Our <em>services</em></h1>
            <p>From the first portrait to the finished album.</p>
            <a href="#services-list" className={styles.link}>Explore services <span aria-hidden="true">↓</span></a>
          </div>
        </section>
        <section id="services-list" className={styles.services} aria-labelledby="services-heading">
          <div className={styles.intro}>
            <h2 id="services-heading">For every <em>occasion.</em></h2>
            <p>Choose the coverage that fits your day. Tell us your date, location and plans, and we’ll talk through the details.</p>
          </div>
          <div className={styles.grid}>
            {collections.map((service) => (
              <article key={service.id} id={service.id} className={styles.card}>
                <div className={styles.image}>
                  <Photo photo={service.photos[0]} sizes="(max-width: 740px) 90vw, (max-width: 1050px) 43vw, 28vw" />
                </div>
                <div className={styles.cardContent}>
                  <h3>{service.label}</h3>
                  <p>{service.description}</p>
                  <a className={styles.cardButton} href="/contact/" aria-label={"Enquire about " + service.label}>Plan your shoot</a>
                </div>
              </article>
            ))}
            <article className={`${styles.card} ${styles.enquiryCard}`}>
              <div className={styles.cardContent}>
                <h3>Let’s plan<br />your shoot.</h3>
                <p>Have something in mind? Share your date, location and ideas, and we’ll help you choose the photography and film coverage for your day.</p>
                <div className={styles.cardActions}>
                  <a className={styles.cardButton} href="/contact/">Book a shoot</a>
                  <a className={styles.secondaryButton} href="/portfolio/">View portfolio <span aria-hidden="true">↗</span></a>
                </div>
              </div>
            </article>
          </div>
        </section>
        <section className={styles.cta} aria-labelledby="booking-title">
          <p className={styles.label}>Let’s plan your shoot</p>
          <h2 id="booking-title">Have a date <em>in mind?</em></h2>
          <p>Tell us what you’re celebrating and where. We’ll help you plan the photography and films.</p>
          <a className={styles.button} href="/contact/">Book a shoot <span aria-hidden="true">↗</span></a>
        </section>
      </main>
      <Footer />
    </>
  );
}
