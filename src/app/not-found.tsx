import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import styles from "./not-found.module.css";
export const metadata: Metadata = { title: "Page Not Found | Arjun Photography", robots: { index: false, follow: true } };
export default function NotFound() {
  return <><a className="skip-link" href="#main">Skip to content</a><Header /><main id="main" className={styles.error}><p className={styles.number} aria-hidden="true">404</p><h1>This page is<br /><em>out of the frame.</em></h1><p>The link may have changed, or the page may no longer be available.</p><div className={styles.actions}><a className="button" href="/">Back to home ↗</a><a className="text-link" href="/portfolio/">Explore our work ↗</a></div></main><Footer /></>;
}
