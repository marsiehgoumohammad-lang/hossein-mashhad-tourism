# Hossein — Mashhad Pilgrimage Landing Page

A mobile-first, Arabic RTL landing page for Hossein's personal companion and coordination offering for visitors to Mashhad, Iran.

## Design goals
- Introduce a real person, not an anonymous travel company.
- Lead with the Imam Reza Shrine and its golden dome.
- Keep the mobile experience first-class and WhatsApp as the primary contact path.
- Explain the journey from arrival to departure without creating a generic “Our Services” catalogue.
- Mention healthcare coordination as a secondary option without making medical promises.

## Run locally
This is a static site. Open `index.html` in a browser or serve the directory with any static HTTP server.

## Required before launch
1. Add the verified international WhatsApp number to `WHATSAPP_NUMBER` in `script.js` (digits only, country code included).
2. Replace the video preview cards with three real, properly licensed vertical videos.
3. Add Hossein's approved portrait and integrate it into the hero composition. No portrait has been fabricated or substituted.
4. Verify the external image URLs, attribution and license requirements, and preferably optimize and self-host approved image assets.
5. Review all service descriptions against what is actually available and confirm the final Arabic copy with a fluent speaker.
6. Add a real domain, analytics/Search Console configuration, and privacy information if needed.

## Image credits
The hero uses the Wikimedia Commons file [Imam Reza shrine.jpg](https://commons.wikimedia.org/wiki/File:Imam_Reza_shrine.jpg), credited on its source page to Mohammad Hosein Tabatabaeian and licensed CC BY-SA 3.0. Additional shrine images are loaded from Wikimedia Commons; verify each file page and preserve the applicable attribution/license notices when publishing.

## Deployment
The site is static and can be deployed to GitHub Pages, Cloudflare Pages, Netlify, or Vercel. No build step is required.
