# Arjun Photography

Next.js App Router, React, TypeScript and Tailwind CSS. A static photography portfolio inspired by the supplied editorial reference.

## Run

```sh
npm install
npm run dev
```

## Cloudflare Pages

Set `NEXT_PUBLIC_SITE_URL` to the actual HTTPS domain in the build environment, then run `npm run build`. Deploy the generated `out` directory. Cloudflare Pages Git integration: framework Next.js (Static HTML Export), build command `npm run build`, output directory `out`. For manual upload, upload `out` using Pages Direct Upload. No server, paid image service, API routes, or runtime image optimizer is required.

## Content before launch

- Replace illustrative Unsplash photography in `public/images` with Arjun’s licensed portfolio. Keep the small and large WebP variants; edit descriptions in `src/data/portfolio.ts`.
- Confirm all eight requested service concepts match actual offerings. Each section is labelled as a concept pending approval.
- Supply a verified booking phone, email or WhatsApp contact. Set NEXT_PUBLIC_BOOKING_PHONE, NEXT_PUBLIC_WHATSAPP_NUMBER and NEXT_PUBLIC_BOOKING_EMAIL. Dummy contacts are labelled and inactive until configured. The contact page prepares a local enquiry draft; it does not transmit or store submissions.
- Set the public domain before building to enable the canonical URL, social metadata base and domain-specific sitemap. No domain is invented in the source.
- Remove the preview image disclosure only after replacing the sample photography.

## Checks

`npm run typecheck` and `npm run build`.

After a production build, run `node scripts/verify-export.mjs` to verify the twelve-section homepage sequence, exported contact page, SEO files, local asset references, and inactive placeholder contact links.

## Homepage content

The service list in `src/data/portfolio.ts` drives all eight alternating editorial sections. `ServiceSection` determines direction from the index, and `Gallery` supplies the shared accessible photo viewer. Mobile order is content, CTA, collage for every service. About portrait/story, testimonials, film media, album designs and service confirmation are visibly marked as pending. No client reviews or business achievements have been invented.

The `/contact/` page validates enquiry fields and prepares a draft entirely in the browser. Copying is available immediately; email, phone and WhatsApp destinations activate only after verified values are configured. There is no form-submission backend or implied successful booking.

See `docs/seo-notes.md` for initial research and remaining launch details.

## Motion

`SmoothScrolling` provides site-wide Lenis wheel smoothing (`lerp: 0.065`, `wheelMultiplier: 0.85`), smooth anchor navigation and one-time section reveals. Touch scrolling stays native. Gallery dialogs pause the scroll engine, and nested form controls keep their normal scrolling. Lenis and the reveal styles honor reduced-motion preferences. The About photographs straighten, lift and zoom on devices that support hover. Hero and About scroll progress share the `useScrollProgress` hook.


## Our Work carousel

Replace sample films in `src/data/workVideos.ts` with approved client videos and matching posters. The seven entries drive five visible cards, previous/next controls and the native full-screen dialog player. Arrows slide a new film in from the edge. Muted previews loop while the carousel is visible and pause outside the viewport, in background tabs, or while a full-screen film is open. Reduced-motion preferences disable automatic previews. The samples are illustrative category previews, not client projects. Keep local MP4s below Cloudflare Pages' per-file upload limit.


Video performance: cards use silent 360x540, 24 fps previews (up to 12 seconds) from public/videos/previews. Full-screen playback uses the original films. The hero uses a 1280x720, 24 fps background copy on smaller screens and a 1920x1080, 24 fps copy on wide desktops. Regenerate these files with node scripts/optimize-video-previews.mjs PATH_TO_FFMPEG after replacing sample footage. Offscreen cards and hidden tabs pause automatically; the video blur filter is removed to reduce compositing work.

Testimonials: src/data/testimonials.ts contains six fictional Indian client reviews, visibly marked as samples. Replace the names and quotes with approved feedback before using them as real testimonials. The glass carousel supports previous/next, pause, responsive groups, and visibility-aware autoplay; reduced motion disables automatic movement.

Portfolio: the homepage preview sits before testimonials, with six photography category tabs and a full portfolio link. The /portfolio/ route shows all unique sample photos; both views share src/components/PortfolioGallery.tsx and src/data/portfolioGallery.ts. Replace source photographs in src/data/portfolio.ts to update the service galleries and portfolio together.

Navigation and motion: the fixed header hides after downward scrolling and returns on upward scrolling; open mobile menus and keyboard navigation keep it visible. The Our Work carousel advances every five seconds while visible, pauses on interaction or when offscreen, and includes a separate slider pause control.

