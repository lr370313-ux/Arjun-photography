import { business } from "@/data/business";

export function Footer() {
  return <footer className="site-footer" id="footer"><div className="site-footer-inner">
    <div className="footer-invitation"><h2>Let’s tell<br /><em>your story.</em></h2><a href="/contact/" className="footer-book">Book a shoot <span aria-hidden="true">↗</span></a></div>
    <div className="footer-information">
      <div className="footer-studio"><a href="/" className="footer-studio-brand" aria-label="Arjun Photography home"><span className="footer-camera" aria-hidden="true"><svg viewBox="0 0 32 32" fill="none"><path d="M5 10h6l2-4h7l2 4h5v16H5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><circle cx="16" cy="18" r="5" stroke="currentColor" strokeWidth="1.5" /></svg></span><span>Arjun Photography</span></a><p className="footer-tagline">Little moments.<br />Lifelong memories.</p></div>
      <nav className="footer-navigation" aria-label="Footer navigation"><p className="footer-label">Explore</p><a href="/">Home</a><a href="/about/">About us</a><a href="/services/">Services</a><a href="/portfolio/">Portfolio</a><a href="/contact/">Contact</a></nav>
      <nav className="footer-navigation" aria-label="Footer photography services"><p className="footer-label">Photography & films</p><a href="/#weddings">Weddings</a><a href="/#pre-weddings">Pre-weddings</a><a href="/#birthdays">Birthdays</a><a href="/#engagements">Engagements</a><a href="/#films">Cinematic films</a><a href="/#albums">Photo albums</a></nav>
      <div className="footer-visit"><p className="footer-label">Find the studio</p><address>{business.location}</address><a className="footer-directions" href={business.mapUrl} target="_blank" rel="noopener noreferrer">Get directions <span aria-hidden="true">↗</span></a><a className="footer-enquiry" href="/contact/">Plan your session <span aria-hidden="true">↗</span></a></div>
    </div>
    <a className="footer-signature" href="/" aria-label="Arjun Photography home"><span className="footer-signature-name">ARJUN</span><span className="footer-signature-type">PHOTOGRAPHY</span></a>
    <div className="site-footer-bottom"><p>© {new Date().getFullYear()} Arjun Photography</p><nav className="footer-legal" aria-label="Legal information"><a href="/privacy-policy/">Privacy Policy</a><a href="/terms-and-conditions/">Terms &amp; Conditions</a></nav><p className="footer-preview-note">Design preview · Sample imagery</p><a href="#main" className="footer-to-top">Back to top <span aria-hidden="true">↑</span></a></div>
  </div></footer>;
}



