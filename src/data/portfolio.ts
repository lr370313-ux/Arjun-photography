export type Photo = { src: string; alt: string; position?: string };
export type Collection = {
  id: string; label: string; title: string; description: string; cta: string;
  destination: string; status: 'preview'; presentation?: 'film' | 'album'; photos: Photo[];
};
const photo = (src: string, alt: string): Photo => ({ src, alt });
export const collections: Collection[] = [
  {
    id: 'weddings', label: 'Wedding Photography', title: 'A Beautiful Beginning,\nCaptured Forever',
    description: 'From heartfelt rituals to joyful celebrations, every moment of your big day deserves to be remembered.',
    cta: 'View Wedding Gallery', destination: '#weddings-gallery', status: 'preview',
    photos: [photo('wedding-1', 'Bride and groom embracing beside the sea'), photo('wedding-4', 'Henna-decorated bridal hands and wedding jewellery'), photo('wedding-3', 'Bridal bouquet in golden sunlight'), photo('wedding-2', 'Wedding guests celebrating with the bride and groom')],
  },
  {
    id: 'pre-weddings', label: 'Pre-Wedding Photography', title: 'Your Love Story,\nBefore Forever',
    description: 'Celebrating your connection through romantic, natural, and unforgettable photographs.',
    cta: 'View Pre-Wedding Gallery', destination: '#pre-weddings-gallery', status: 'preview',
    photos: [photo('couple-2', 'Hands forming a heart against a golden sunset'), photo('wedding-1', 'Romantic couple portrait beside the sea'), photo('portrait-2', 'Relaxed outdoor portrait in soft sunlight')],
  },
  {
    id: 'birthdays', label: 'Birthday Photography', title: 'Every Birthday Deserves\na Beautiful Memory',
    description: 'From little surprises to grand celebrations, we capture every smile and joyful moment.',
    cta: 'View Birthday Gallery', destination: '#birthdays-gallery', status: 'preview',
    photos: [photo('birthday-cake', 'Birthday layer cake with colourful sprinkles'), photo('birthday-balloons', 'Balloons and decorations for a birthday celebration'), photo('birthday-party', 'Colourful confetti floating through the air')],
  },
  {
    id: 'engagements', label: 'Engagement Photography', title: 'The Beginning of\nSomething Beautiful',
    description: 'Capturing the excitement, love, and happiness of your special commitment.',
    cta: 'View Engagement Gallery', destination: '#engagements-gallery', status: 'preview',
    photos: [photo('wedding-4', 'Traditional jewellery and henna-decorated hands'), photo('couple-2', 'A heart formed by two hands at sunset'), photo('wedding-3', 'Romantic floral bouquet in natural light'), photo('wedding-1', 'Couple sharing a quiet moment together')],
  },
  {
    id: 'maternity-baby', label: 'Maternity & Baby Photography', title: 'Little Moments,\nLifelong Memories',
    description: 'Preserving the beauty of new beginnings and the precious moments of growing families.',
    cta: 'View Gallery', destination: '#maternity-baby-gallery', status: 'preview',
    photos: [photo('baby-sleeping', 'Baby wearing sunglasses and relaxing on a colourful float'), photo('baby-portrait', 'Baby portrait capturing a little everyday moment'), photo('family-moment', 'Parent lifting a baby during a playful family moment')],
  },
  {
    id: 'events', label: 'Event Photography', title: 'Every Celebration\nHas a Story',
    description: 'From intimate gatherings to grand occasions, we capture the energy and emotions of every event.',
    cta: 'Explore Event Gallery', destination: '#events-gallery', status: 'preview',
    photos: [photo('event-table', 'An elegantly decorated table prepared for an event'), photo('detail-1', 'Floral arrangements and glassware at a celebration'), photo('birthday-balloons', 'Festive decorations for a special gathering'), photo('wedding-2', 'Guests joining a joyful outdoor celebration')],
  },
  {
    id: 'films', label: 'Cinematic Videography', title: 'Your Story,\nBrought to Life',
    description: 'Relive your special moments through beautifully crafted cinematic films.',
    cta: 'Watch Our Films', destination: '#films-gallery', status: 'preview', presentation: 'film',
    photos: [photo('wedding-1', 'Cinematic-style still of a couple on a quiet shoreline'), photo('hero-right', 'Close-up wedding detail in warm cinematic colours'), photo('wedding-3', 'Sunlit bouquet, a mood reference for a wedding film')],
  },
  {
    id: 'albums', label: 'Album Design & Creation', title: 'Memories You Can\nHold Forever',
    description: 'Beautifully designed photo albums that turn your favorite moments into lasting keepsakes.',
    cta: 'Explore Our Albums', destination: '#albums-gallery', status: 'preview', presentation: 'album',
    photos: [photo('wedding-1', 'Wedding photograph used in an illustrative album cover concept'), photo('wedding-3', 'Bridal bouquet photograph in a printed album layout concept'), photo('wedding-4', 'Wedding details photograph in a keepsake album concept')],
  },
];

