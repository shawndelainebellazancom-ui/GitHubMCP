# ChopChop UX Style Guide (TBSCA)

- Typography: Roboto/Open Sans; headings 46/32/24/18 responsive clamp
- Colors: Primary #1E6F4F, Accent #A5754A, Text #0F2A1E; use --cc-* tokens
- Components: Prefer Telerik Fluent with --kendo-color-primary bound to brand
- Focus: Use .custom-focus or :focus-visible rings with --cc-focus
- Cards: .cc-card with hover elevation; add .interactive-card when clickable
- Animations: .fade-in and .slide-up for entrances; honor reduced motion
- Loading: Use <TelerikLoader Overlay="true" Type="LoaderType.Pulsing" /> via UIService.SetBusy
- Notifications: Success .cc-toast-success, Error .cc-toast-error via UIService
- PWA: Ensure manifest, SW registered; offline.html available as fallback
- SEO: Use PageTitle/HeadContent per page; include canonical link and JSON-LD (escape @ as @@ in Razor)
