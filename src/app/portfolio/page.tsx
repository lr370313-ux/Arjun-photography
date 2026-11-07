import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PortfolioGallery } from "@/components/PortfolioGallery";

export const metadata: Metadata = {
  title: "Photography Portfolio | Arjun Photography, Ramnagar",
  description: "Browse wedding, pre-wedding, birthday, engagement, maternity and event photography categories from Arjun Photography in Ramnagar.",
  ...(process.env.NEXT_PUBLIC_SITE_URL ? { alternates: { canonical: "/portfolio/" } } : {}),
};

export default function PortfolioPage() {
  return <><a className="skip-link" href="#main">Skip to content</a><Header /><main id="main" className="portfolio-page"><section className="portfolio-section" aria-labelledby="full-portfolio-title"><h1 id="full-portfolio-title">Our <em>Portfolio</em></h1><PortfolioGallery full /></section></main><Footer /></>;
}
