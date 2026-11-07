import type { Collection } from "@/data/portfolio";
import { Gallery } from "./Gallery";

export function ServiceSection({ collection, index }: { collection: Collection; index: number }) {
  const [firstLine, secondLine] = collection.title.split("\n");
  return <section className={`collection ${index % 2 ? "reverse" : ""} composition-${index % 3} ${collection.presentation || ""}`} style={{ zIndex: index + 1 }} id={collection.id} aria-labelledby={`${collection.id}-title`}>
    <div className="collection-inner">
      <div className="collection-copy">
        <span className="collection-number">{String(index + 1).padStart(2, "0")} <span>—</span></span>
        <p className="eyebrow">{collection.label}</p>
        <h2 id={`${collection.id}-title`}>{firstLine}<br /><em>{secondLine}</em></h2>
        <p className="description">{collection.description}</p>
        <p className="preview-label">Service concept · Sample imagery</p>
      </div>
      <Gallery collection={collection} />
    </div>
  </section>;
}

