## DO THIS FIRST

**Invoke the `web-build` skill** (type `/web-build` or "iniciar build")
when opening this project in Claude Code.

The skill will detect that DESIGN.md already exists and the copy is
locked inside the wireframe, so it will skip Passos A and C and jump
to Passo B (generate `tokens.css` + `design-system.html` + `tokens.json`
from the existing DESIGN.md), then Passo D (build), then Passo E (cleanup).

If invoking the skill manually fails for some reason, fall back to:
- Invoke `frontend-design` skill before any code
- Invoke `scribe` skill when writing or refining any copy
- Read `@design_system/DESIGN.md` before any visual code

DESIGN.md is the single source of truth for colors, typography,
spacing, motion, icons, illustrations, and component states.
Never improvise visual decisions - consult DESIGN.md first.

**Wireframe is structural only, not visual blueprint.**
The wireframe at `@wireframe.html` contains the approved structure
and copy for all 8 pages. Use it for information architecture
reference - which sections exist, in which order, with which copy.
Do NOT copy its low-fi visual layout. The final build is free creative
work based on DESIGN.md.

Do not invent new sections or rewrite approved copy. When the user
asks for modifications, modify only what they request.

---

## Project Overview

Institutional website with strong conversion focus for Siga Crédito,
a digital banking correspondent operating in Brazil since 2020.
Siga intermediates four credit products from regulated financial
institutions (Crefaz, Crefisa, Novo SAC, Presença Bank, V8) for
people who cannot access traditional banks.

Target audience: Brazilian working class (classe C) — workers with
formal employment, social benefit recipients (Bolsa Família),
people with low credit score or negative records, who urgently
need credit and have been rejected elsewhere.

Primary goal: Capture leads via WhatsApp (main channel),
0800 toll-free phone, and contact form (fallback).

Key differentiator: 7 years of market presence, transparent
operation as banking correspondent (Resolução CMN 4.935), explicit
anti-fraud positioning, multiple specialized products with
dedicated landing pages per profile.

---

## Tech Stack

- HTML5 semantic markup
- Tailwind CSS
- JavaScript vanilla
- Google Fonts (or self-hosted variable fonts per DESIGN.md)

Do not introduce frameworks, CSS-in-JS, jQuery, or Bootstrap
unless explicitly requested.

---

## Architecture

```
project-root/
├── CLAUDE.md
├── wireframe.html             # Low-fi structural wireframe (IA reference)
├── index.html                 # Home (to be built)
├── conta-de-luz.html          # Landing - Empréstimo Conta de Luz
├── bolsa-familia.html         # Landing - Empréstimo Bolsa Família
├── clt.html                   # Landing - Consignado CLT
├── fgts.html                  # Landing - FGTS Saque-Aniversário
├── sobre.html
├── contato.html
├── blog/
│   ├── index.html             # Hub do blog
│   └── post-template.html     # Template de post individual
├── css/
│   └── custom.css             # Custom CSS beyond Tailwind utilities
├── js/
│   └── main.js                # Vanilla JS (interactions, scroll reveal)
├── assets/
│   ├── images/
│   ├── icons/
│   └── logos-parceiros/
├── design_system/
│   ├── DESIGN.md              # Source of truth (already exists)
│   ├── tokens.css             # CSS custom properties (generated in Passo B)
│   ├── tokens.json            # Figma-ready tokens (generated in Passo B)
│   └── design-system.html     # Visual showcase (generated in Passo B)
├── my_brand_assets/
│   └── Logo/                  # Siga Crédito brand logos
├── refs/                      # Visual references (Stitch/MJ outputs if used)
├── screenshots/               # Screenshot loop output
├── _archive/
│   └── intro/Produtos SIGA.pdf  # Original client briefing source
```

Rules:
- Semantic HTML5 (`header`, `nav`, `main`, `section`, `footer`)
- Mobile-first responsive approach
- JavaScript in `js/main.js`
- Custom CSS in `css/custom.css` (only beyond Tailwind)
- One H1 per page
- Each landing page is independent for SEO and ad-landing usage

---

## Visual References

- The folder `@refs/` may contain visual inspiration (AI-generated
  via Stitch/MJ/Flux, or screenshots from reference sites)
- Match the FEELING of the references - layout rhythm, spacing,
  typography confidence, color usage. Do NOT copy layouts literally
- References are inspiration, not blueprints
- If `refs/` is empty, the build leans on DESIGN.md alone

---

## Brand Assets

- Brand assets folder: `@my_brand_assets/`
- Contains the Siga Crédito logo in Horizontal, Stacked, and Symbol
  variants (under development - final version may change)
- Brand name to use across all copy: "Siga Crédito" (never "Empréstimo
  Siga" or "Siga Empréstimos")
- DESIGN.md derives the visual identity from this logo

---

## Design System

- Primary source of truth: @design_system/DESIGN.md
- Covers colors, typography, spacing, components, icons,
  graphic elements, AI image prompts, motion, accessibility,
  responsiveness, microcopy, states, performance, and SEO
- Read this BEFORE every visual coding session
- Never improvise visual decisions outside what DESIGN.md defines

---

## Anti-Generic Design Guardrails

- **Colors:** never default Tailwind palette as primary. Use
  custom tokens from DESIGN.md derived from the Siga Crédito brand
- **Typography:** never single font everywhere. Pair display +
  body. Tight tracking on headings, generous line-height on body.
  Never default to Inter, Roboto, or Arial without checking DESIGN.md
- **Shadows:** never raw `shadow-md` or `shadow-lg`. Use layered,
  color-tinted shadows from DESIGN.md
- **Backgrounds:** alternate sections with rhythm. Avoid flat
  white walls. Subtle textures or tonal shifts where DESIGN.md
  indicates
- **Motion:** never `transition-all`. Only transform and opacity.
  Respect prefers-reduced-motion
- **Interactive states:** every clickable element must have hover,
  focus-visible, and active states. No exceptions
- **Anti-patterns to avoid:**
  - bg-white + shadow-md + rounded-lg card grids everywhere
  - All content centered with no layout variation
  - Purple-on-dark gradients (the AI look)
  - Aggressive red CTAs typical of "loan websites" — Siga is
    not Crefisa, the visual must feel calmer and more institutional
  - Uniform section heights with no visual rhythm
  - Icon grids with identical cards
  - Generic stock-photo people smiling with laptops
  - Material Design icons in colored circles
  - Animating text outside the hero H1
  - WebGL outside hero (if used at all)

---

## Critical Project-Specific Components

These components appear repeatedly across pages and must follow
DESIGN.md specifications consistently:

- **Floating WhatsApp button** — visible on every page, every
  device. Bottom-right. Must be memorable but not invasive.
- **Anti-Fraud Notice block** — appears on home and every product
  page. Treat as a distinctive component (not a generic alert
  banner). The phrase "A Siga nunca pede pagamento adiantado" is
  a brand promise, not a warning — design accordingly.
- **Product Selector cards (home)** — four products with values
  and "Quero esse →" CTA. Each leads to a dedicated landing.
- **Stats blocks** — large numerical stats (R$ 60mi, 7 anos,
  1.000/dia). Strong typographic composition.
- **Comparison tables** (CLT page) — elegant table styling, never
  default Tailwind borders.
- **Step-by-step "Como Funciona"** — present in every product page
  with 4 steps. Visual rhythm via large numbered markers.
- **FAQ accordions** — consistent across all product pages.
- **Testimonials with photos or WhatsApp screenshots** — must feel
  authentic, not corporate-stock.

---

## Copy Constraints

- Copy is approved and locked at the wireframe stage. Do not
  rewrite, summarize, or "improve" approved copy without explicit
  user request.
- Brand name: always "Siga Crédito" (never "Empréstimo Siga" or
  "Siga Empréstimos").
- Tone: direct, conversational, no corporate jargon, no buzzwords
  ("inovador", "soluções", "empoderador" are forbidden).
- Never mention internal operational details: AI on WhatsApp,
  chatbots, automation tools. The user only needs to know
  "atendimento via WhatsApp/0800/formulário".
- Regulatory clarity is non-negotiable: the Bolsa Família product
  must always clarify it is NOT the suspended consigned loan, but
  a personal loan with debit on Caixa Tem balance.

---

## Screenshot Loop

When you finish coding a page or major section:
1. Capture a full-page screenshot
2. Compare against @web_design_references and DESIGN.md
3. List issues: spacing, typography, color, motion, layout
   balance, responsiveness, interactive states, accessibility
4. Fix all issues
5. Capture again, compare, fix
6. Minimum 2 rounds. Save all screenshots in @screenshots/
   as screenshot_round1.png, screenshot_round2.png

---

## UX Principles

### Two-Step Conversion
- **Hero (Step 1):** problem + solution clear in 4 seconds.
  WHAT we solve, for WHOM, HOW
- **Rest of page (Step 2):** clear doubts. Each section removes
  a specific "what if" from the visitor's mind

### UX Laws (non-negotiable)
- One primary CTA per section (Hick's Law)
- Lists max 5-7 items (Miller's Law)
- Primary CTA visually distinct from everything else
  (Von Restorff) — WhatsApp button is the protagonist
- Hero + final CTA = peak moments (Peak-End Rule)
- Cut anything that doesn't serve conversion (Prägnanz)
- Group related elements visually (Proximity)
- Consistent patterns across sections (Similarity)

### Functional
- Floating WhatsApp button always visible
- Mobile-first (375px base) — most of the audience accesses
  via mobile data
- Accessibility: WCAG AA contrast, alt texts, keyboard nav
- Lazy-load images below fold
- Smooth scroll on anchor navigation
- Phone numbers as `tel:` links
- WhatsApp CTAs as `https://wa.me/55XXXXXXXXXXX` links

---

## SEO Requirements

Each landing page is independently optimized:
- `conta-de-luz.html` → keyword "empréstimo na conta de luz"
- `bolsa-familia.html` → keyword "empréstimo bolsa família caixa tem"
- `clt.html` → keyword "empréstimo consignado CLT"
- `fgts.html` → keyword "empréstimo FGTS saque aniversário"

Required per page:
- Unique meta title (50-60 chars) and meta description (150-160 chars)
- Open Graph tags (1200x630 image)
- Schema.org markup (FinancialProduct or Service)
- Semantic heading hierarchy (one H1 per page)
- Internal links between related products
- Sitemap.xml entry
- Canonical URL

---

## Coding Conventions

- Semantic HTML5 elements
- Tailwind utilities first; custom CSS only when necessary
- Design tokens as `:root` CSS custom properties from DESIGN.md
- Minimal vanilla JavaScript
- Descriptive names, no abbreviations
- Comments only when intent is non-obvious
- No dead code or commented-out blocks
- `loading="lazy"` on below-fold images
- `rel="noopener noreferrer"` on external links
- All interactive elements keyboard-accessible
