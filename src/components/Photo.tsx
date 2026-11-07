import type { Photo as PhotoType } from "@/data/portfolio";
export function Photo({ photo, priority = false, className = "", sizes = "(max-width: 700px) 50vw, 30vw" }: { photo: PhotoType; priority?: boolean; className?: string; sizes?: string }) {
  return <img className={className} src={`/images/${photo.src}.webp`} srcSet={`/images/${photo.src}-small.webp 480w, /images/${photo.src}.webp 1200w`} sizes={sizes} alt={photo.alt} width={1200} height={1500} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : "auto"} style={{ objectPosition: photo.position }} />;
}
