import type { Metadata } from "next";
import { SmoothScrolling } from "@/components/SmoothScrolling";
import "lenis/dist/lenis.css";
import "./globals.css";
import "./header-hero.css";
import "./about.css";
import "./motion.css";
import "./work-videos.css";
import "./service-galleries.css";
import "./service-stack.css";
import "./testimonials.css";
import "./portfolio.css";
import "./creative-process.css";
import "./wide-desktop.css";
import "./footer.css";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl), alternates: { canonical: "/" } } : {}),
  title: "Arjun Photography | Wedding Photographer in Ramnagar",
  description: "Wedding and pre-wedding photography in Peerumadara, Ramnagar, Nainital and Jim Corbett. Explore Arjun Photography’s collections and plan your story.",
  openGraph: { title: "Arjun Photography — Stories to keep, forever.", description: "Wedding & pre-wedding photography · Peerumadara, Ramnagar, Uttarakhand", type: "website", locale: "en_IN", ...(siteUrl ? { images: [{ url: "/images/hero-center.webp", width: 1200, height: 1800, alt: "Wedding photography inspiration" }] } : {}) },
  twitter: { card: siteUrl ? "summary_large_image" : "summary" }
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><SmoothScrolling />{children}</body></html>;
}
