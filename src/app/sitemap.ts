import type { MetadataRoute } from "next";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap { const url = process.env.NEXT_PUBLIC_SITE_URL; return url ? [{ url: url.replace(/\/$/, "") + "/", changeFrequency: "monthly", priority: 1 }, { url: url.replace(/\/$/, "") + "/contact/", changeFrequency: "monthly", priority: 0.7 }, { url: url.replace(/\/$/, "") + "/portfolio/", changeFrequency: "monthly", priority: 0.8 }, { url: url.replace(/\/$/, "") + "/about/", changeFrequency: "monthly", priority: 0.7 }, { url: url.replace(/\/$/, "") + "/services/", changeFrequency: "monthly", priority: 0.8 }] : []; }



