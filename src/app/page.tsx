import { Header } from "@/components/Header";
import { HeroVideo } from "@/components/HeroVideo";
import { HeroSection } from "@/components/HeroSection";
import { Footer } from "@/components/Footer";
import { ServiceSection } from "@/components/ServiceSection";
import { ServiceStack } from "@/components/ServiceStack";
import { ContactOptions } from "@/components/ContactOptions";
import { AboutSection } from "@/components/AboutSection";
import { WorkVideos } from "@/components/WorkVideos";
import { Testimonials } from "@/components/Testimonials";
import { PortfolioSection } from "@/components/PortfolioSection";
import { CreativeProcess } from "@/components/CreativeProcess";
import { collections } from "@/data/portfolio";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
export default function Home() {
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <Header overlay />
    <main id="main">
      <HeroSection>
        <HeroVideo />
        <div className="hero-shade" />
        <div className="cinematic-copy"><h1 id="hero-title">Every Moment,<br /><em>Beautifully Captured</em></h1><a className="hero-book" href="#weddings">Explore Our Work <span aria-hidden="true">↗</span></a></div>
      </HeroSection>
      <AboutSection />
      <WorkVideos />
      <section className="collections-heading" aria-labelledby="collections-title"><h2 id="collections-title">Your life.<br /><em>Beautifully documented.</em></h2></section>
      <ServiceStack>{collections.map((collection, index) => <ServiceSection collection={collection} index={index} key={collection.id} />)}</ServiceStack>
      <PortfolioSection />
      <CreativeProcess />
      <Testimonials />
      <section id="contact" className="contact" aria-labelledby="contact-title"><p className="eyebrow">YOUR NEXT CHAPTER STARTS HERE</p><span className="contact-star" aria-hidden="true">✧</span><h2 id="contact-title">Let&apos;s Capture Your Next<br /><em>Beautiful Moment</em></h2><p>Tell us your story, and we&apos;ll help you preserve it forever.</p><a className="button" href="/contact/">Let’s plan your shoot <span>↗</span></a><ContactOptions /><p className="contact-disclaimer">Contact preview · Dummy phone and email details until confirmed.</p><span className="contact-location">Peerumadara, Ramnagar · Uttarakhand</span></section>
    </main><Footer />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "ProfessionalService", name: "Arjun Photography", description: "Photography in Peerumadara, Ramnagar, Uttarakhand.", ...(siteUrl ? { url: siteUrl } : {}), address: { "@type": "PostalAddress", addressLocality: "Peerumadara, Ramnagar", addressRegion: "Uttarakhand", addressCountry: "IN" } }).replace(/</g, "\\u003c") }} />
  </>;
}

