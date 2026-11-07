import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PortfolioSection } from "@/components/PortfolioSection";
import { Photo } from "@/components/Photo";
import { business } from "@/data/business";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "About Us | Arjun Photography, Ramnagar",
  description: "Get to know Arjun Photography in Peerumadara, Ramnagar, and see how we plan, photograph and edit weddings, portraits and celebrations.",
  ...(process.env.NEXT_PUBLIC_SITE_URL ? { alternates: { canonical: "/about/" } } : {}),
};



export default function AboutPage() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Header overlay />
      <main id="main" className={styles.page}>
        <section className={styles.hero} aria-labelledby="about-page-title">
          <div>
            <p className={styles.label}>About Arjun Photography</p>
            <h1 id="about-page-title">Behind <em>the lens</em></h1>
            <p>Wedding photography, films and portraits in Ramnagar, Uttarakhand.</p>
          </div>
          <Photo priority photo={{ src: "wedding-4", alt: "Henna-decorated hands during an Indian wedding", position: "center" }} sizes="(max-width: 740px) 90vw, 55vw" />
        </section>

        <section className={styles.story} aria-labelledby="studio-story">
          <div><p className={styles.label}>Ramnagar, Uttarakhand</p><h2 id="studio-story">Studio <em>story</em></h2><Photo photo={{ src: "wedding-3", alt: "A bridal bouquet in warm natural light" }} /></div>
          <div>
            <p>Arjun Photography is based in {business.location}. Our work covers weddings, pre-wedding sessions, portraits and family celebrations.</p>
            <p>You can come to us for photographs, a wedding film or an album. We start with the date, the place and the people you want to remember.</p>
          </div>
        </section>

        <section className={styles.photographer} aria-labelledby="photographer">
          <Photo photo={{ src: "couple-1", alt: "A couple sharing a quiet moment beside the sea", position: "center 38%" }} sizes="(max-width: 740px) 90vw, 38vw" />
          <div>
            <p className={styles.label}>The photographer</p>
            <h2 id="photographer">Meet <em>Arjun</em></h2>
            <p>Before a shoot, Arjun asks who’s coming, which parts of the day matter most to you and whether you have any photographs in mind. That conversation gives everyone a plan for the day, including when to set aside time for portraits.</p>
            <p className={styles.extraParagraph}>Bring along your ideas, favourite locations and any questions about being in front of the camera. From a quiet couple session to a celebration with the whole family, the shoot begins with what feels comfortable to you.</p><a className="text-link" href="/contact/">Talk about your shoot <span aria-hidden="true">↗</span></a>
          </div>
        </section>

        <section className={styles.team} aria-labelledby="studio-team">
          <h2 id="studio-team">The <em>studio team</em></h2>
          <dl className={styles.roles}>
            <div><Photo photo={{ src: "wedding-4", alt: "Bridal details photographed during an Indian wedding" }} /><dt>Photography</dt><dd>Portraits, family groups and candid coverage throughout the day.</dd></div>
            <div><Photo photo={{ src: "wedding-1", alt: "A couple together beside the sea" }} /><dt>Filmmaking</dt><dd>Coverage of the ceremony, speeches and celebrations, edited into a wedding film.</dd></div>
            <div><Photo photo={{ src: "detail-1", alt: "Floral details and glassware at a celebration" }} /><dt>Editing & albums</dt><dd>Photo selection, colour editing and arranging the final photographs for print.</dd></div>
          </dl>
        </section>

        <section className={styles.story} aria-labelledby="studio-experience">
          <h2 id="studio-experience">Our <em>experience</em></h2>
          <div>
            <p>A wedding brings together rituals, family groups and a fast-moving reception. A pre-wedding session gives us more time to work with a location and its light. Our portfolio also includes birthdays, engagements, maternity sessions and events.</p>
            <a className="text-link" href="/portfolio/">Explore the portfolio <span aria-hidden="true">↗</span></a>
          </div>
        </section>

        <section className={styles.approach} aria-labelledby="creative-approach">
          <Photo photo={{ src: "couple-1", alt: "A relaxed couple portrait in natural light" }} /><div><p className={styles.label}>Light. Connection. Detail.</p><h2 id="creative-approach">Our creative <em>approach</em></h2>
          <p>We plan the family photographs and portraits in advance, then leave room for the day to unfold. During a ceremony we keep our distance where possible. For portraits, we look for good light and offer simple direction. In the edit, we keep skin tones natural and let the colours of the day come through.</p><div className={styles.approachNotes}><span>Natural light</span><span>Simple direction</span><span>Thoughtful editing</span></div></div>
        </section>

        <PortfolioSection />
      </main>
      <Footer />
    </>
  );
}

