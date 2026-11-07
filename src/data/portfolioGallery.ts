import { collections, type Photo } from "./portfolio";

export type PortfolioItem = { photo: Photo; category: string; categoryId: string };
const labels: Record<string, string> = { weddings: "Weddings", "pre-weddings": "Pre-weddings", birthdays: "Birthdays", engagements: "Engagements", "maternity-baby": "Maternity & Baby", events: "Events" };
export const portfolioCategories = collections.filter(collection => !collection.presentation).map(collection => ({ id: collection.id, label: labels[collection.id] || collection.label, photos: collection.photos }));
const items = portfolioCategories.flatMap(category => category.photos.map(photo => ({ photo, category: category.label, categoryId: category.id })));
// Lead with one photograph from each category, then avoid repeating images.
const ordered = [...portfolioCategories.flatMap(category => category.photos.slice(0, 1).map(photo => ({ photo, category: category.label, categoryId: category.id }))), ...items];
export const allPortfolioItems: PortfolioItem[] = ordered.filter((item, index) => ordered.findIndex(other => other.photo.src === item.photo.src) === index);
