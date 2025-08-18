# ChopChop Design Specs

- Platform: Blazor WebAssembly PWA (.NET 8), optional Telerik UI for Blazor.
- Audience: Homeowners, property managers, small businesses.
- Brand
  - Colors: Primary #4CAF50, Earth #8B4513, Sand #F5F5DC, Accent #2196F3
  - Typography: Roboto, Open Sans; base font 16px, scale 1.125
  - Style: Modern, minimal, nature-inspired; subtle neumorphism; dark mode supported
- Layout
  - 12px spacing system; cards with 12px radius and shadow
  - Header with sticky nav; hero with CTA + QR; service cards grid; footer with install
  - Responsive breakpoints: 0, 768px (md), 1024px (lg)
- Telerik Components (when enabled)
  - Grid: service listings and pricing
  - Form: booking form with validation
  - Button: primary/secondary CTAs
  - Drawer or AppBar for mobile nav
- Accessibility
  - WCAG 2.1 AA: color contrast, focus, aria labels, keyboard navigation
  - Live regions for status; high-contrast CSS adjustments
- PWA
  - manifest.webmanifest with icons, theme
  - service-worker.js (dev) / service-worker.published.js (prod) with offline caching
  - install prompt via `ChopChopInstall`
- Performance
  - Target load <2s on 4G; minimize images; lazy-load; CDN fonts
- Monetization
  - Booking funnel; upsell checkboxes; premium subscription upsell
- Traffic
  - QR on homepage and flyer; Cloudflare DNS for domains; short random path supported

## Feedback
- Does the color scheme align with your brand?
- Are CTAs clear and visible on mobile?
- Any services missing from the listing?

## Next Steps
- Integrate Telerik UI once license configured
- Add backend/email for booking requests
- Add pagination and search precedence
- Enhance telemetry with error categories (validation, IO)
