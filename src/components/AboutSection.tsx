"use client";

import { useRef } from "react";
import { Photo } from "./Photo";
import { useScrollProgress } from "./useScrollProgress";

export function AboutSection() {
  const section = useRef<HTMLElement>(null);
  useScrollProgress(section, "enter", "--about-enter");

  return <section ref={section} id="about" className="about-story" aria-labelledby="about-title">
    <div className="about-story__inner">
      <div className="about-story__collage" aria-label="Wedding, couple and portrait photography">
        <figure className="about-story__photo about-story__photo--wedding"><Photo photo={{ src: "wedding-4", alt: "Henna-decorated bridal hands during a traditional Indian wedding", position: "center" }} sizes="(max-width: 700px) 48vw, 25vw" /></figure>
        <figure className="about-story__photo about-story__photo--couple"><Photo photo={{ src: "couple-1", alt: "A romantic couple portrait beside the sea", position: "center 38%" }} sizes="(max-width: 700px) 42vw, 22vw" /></figure>
        <figure className="about-story__photo about-story__photo--shoot"><Photo photo={{ src: "portrait-1", alt: "A studio portrait with soft directional lighting", position: "center 30%" }} sizes="(max-width: 700px) 86vw, 45vw" /></figure>
      </div>
      <div className="about-story__copy">
        <p className="about-story__label">About Arjun Photography</p>
        <h2 id="about-title">The People<br /><em>Behind the Lens</em></h2>
        <p>Arjun Photography is based in Peerumadara, Ramnagar, Uttarakhand. We photograph weddings, celebrations, and the people who make them special.</p>
        <p>Planning a wedding, pre-wedding session or portrait shoot? Tell us your date, location and what you have in mind.</p>
        <div className="about-story__details"><span>Wedding & pre-wedding</span><span>Portraits & celebrations</span></div>
        <a className="text-link" href="#weddings">View our work <span aria-hidden="true">↗</span></a>
      </div>
    </div>
  </section>;
}
