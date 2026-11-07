import { PortfolioGallery } from "./PortfolioGallery";

export function PortfolioSection() {
  return <section id="portfolio" className="portfolio-section" aria-labelledby="portfolio-title"><h2 id="portfolio-title">Our <em>Portfolio</em></h2><PortfolioGallery /></section>;
}
