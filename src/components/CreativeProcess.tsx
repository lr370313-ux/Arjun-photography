"use client";

import { useRef, useState } from "react";
import { useScrollProgress } from "./useScrollProgress";

const steps = [
  { title: "Let’s talk", label: "The first conversation", text: "Tell us about your occasion, your date, and the photographs you have in mind.", image: "/images/premium-indian-wedding-poster.jpg", alt: "An Indian bride and groom sharing a quiet moment" },
  { title: "Plan the shoot", label: "The details", text: "We’ll work through the location, timings, and any family moments or details you want us to capture.", image: "/images/wedding-4.webp", alt: "Traditional wedding jewellery and henna-decorated hands" },
  { title: "Capture the day", label: "The moments", text: "Enjoy the occasion. We’ll guide you when needed and make room for the moments that happen naturally.", image: "/images/wedding-2.webp", alt: "Wedding guests celebrating with the bride and groom" },
  { title: "Edit & deliver", label: "The photographs", text: "We select and edit your photographs, then share the finished gallery so you can revisit the day.", image: "/images/wedding-3.webp", alt: "A bridal bouquet photographed in soft golden light" },
];

export function CreativeProcess() {
  const section = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  useScrollProgress(section, "enter", "--process-enter");

  return <section ref={section} className="creative-process" id="creative-process" aria-labelledby="creative-process-title">
    <div className="creative-process-inner">
      <div className="process-intro"><h2 id="creative-process-title">Our Creative<br /><em>Process</em></h2><p>Four steps, from our first conversation to your finished photographs.</p></div>
      <div className="process-layout">
        <figure className="process-visual">
          <img key={steps[active].image} src={steps[active].image} alt={steps[active].alt} width={900} height={700} loading="lazy" />
          <figcaption><span className="process-image-number" aria-hidden="true">0{active + 1}</span><span>{steps[active].label}</span></figcaption>
        </figure>
        <ol className="process-steps">
          {steps.map((step, index) => <li className={active === index ? "process-step is-open" : "process-step"} key={step.title}>
            <h3><button type="button" id={`process-step-${index}`} aria-expanded={active === index} aria-controls={`process-detail-${index}`} onClick={() => setActive(index)}><span className="process-step-number" aria-hidden="true">0{index + 1}</span><span>{step.title}</span><span className="process-step-toggle" aria-hidden="true">{active === index ? "−" : "+"}</span></button></h3>
            <div className="process-step-detail" id={`process-detail-${index}`} role="region" aria-labelledby={`process-step-${index}`} hidden={active !== index}><p>{step.text}</p></div>
          </li>)}
        </ol>
      </div>
    </div>
  </section>;
}
