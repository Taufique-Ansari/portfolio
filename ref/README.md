# Handoff: Taufique Ansari — Creative Developer Portfolio

## Overview
A single-page, dark, motion-heavy personal portfolio (Awwwards-style). Long vertical scroll with a pinned, scroll-scrubbed hero sequence, a WebGL red "light rays" background, scroll-reveal blur transitions, a focus/dim project list with a drawn ribbon, a 3D-scattered gallery, a pinned skills accordion, an awards table, and a "dot-merge" contact reveal.

Target stack (requested by the owner): **Next.js (App Router, TypeScript) + Tailwind + Lenis + Three.js (@react-three/fiber + drei) + GSAP (ScrollTrigger)**.

## About the Design Files
The files in this bundle are **design references created in HTML/CSS/JS** — a working prototype that demonstrates the intended look, layout, type, color, and motion. **They are not production code to copy line-for-line.** The task is to **recreate this design in the target Next.js environment** using idiomatic React components, Lenis for smooth scroll, GSAP ScrollTrigger for scroll-driven animation, and React-Three-Fiber for the WebGL pieces. Port the *intent and values* (tokens, timings, layout), not the raw inline scripts.

The prototype is fully self-contained — open `portfolio.html` in a browser and scroll to see every behavior described below.

## Fidelity
**High-fidelity.** Final colors, typography, spacing, copy, and interaction timings are all specified. Recreate the UI pixel-accurately, then wire the motion with the target libraries. Where the prototype used a hand-rolled rAF scroll loop, replace it with **Lenis + GSAP ScrollTrigger** (cleaner, snappier, the requested stack).

---

## Design Tokens

### Color
| Token | Value | Use |
|---|---|---|
| `--bg` | `#0a0a0a` | Page background (near-black) |
| `--fg` | `#f2f0ec` | Primary text (warm off-white) |
| `--muted` | `rgba(242,240,236,0.46)` | Secondary text |
| `--line` | `rgba(242,240,236,0.14)` | Hairline borders/dividers |
| `--red` | `#ff2a1a` | Accent — rays, ribbon, arrows, dots in eyebrows |
| `--mint` | `#aeded2` | Serif-italic accent (last name, italic words) |
| `--cream` | `#ece8e1` | Contact panel background (light) |
| Contact text | `#0c0a09` | Near-black text on cream |

Light-rays shader color (linear RGB): `vec3(1.0, 0.16, 0.09)`.

### Typography
- **Sans (display + body):** `'Helvetica Neue', Helvetica, Arial, sans-serif`. Headlines weight **700**, tight tracking (`-0.02em` to `-0.04em`).
- **Serif (accents only):** **Instrument Serif**, italic — Google Fonts (`Instrument+Serif:ital@0;1`). Used for the last name, the italic words inside statements ("creative developer", "emotion", "learn", "experiment", "available"), project index numbers, and the cinema caption.
- **Mono (labels/meta):** `ui-monospace, Menlo, Consolas, monospace` — eyebrow meta, preview date, progress counter, award year.

Key sizes (responsive `clamp`, desktop max shown):
- Hero first name (sans 700): `clamp(54px, 13.5vw, 250px)`
- Hero last name (serif italic, mint): `clamp(58px, 14.5vw, 270px)`
- Section statements: `clamp(30px, 4.1vw, 66px)`, line-height ~1.06
- Project rows: `clamp(30px, 5.2vw, 80px)`, weight 700
- Contact "Contact": `clamp(72px, 17vw, 300px)`
- Eyebrow labels: 12px, `letter-spacing:.2em`, uppercase, with a 7px red dot before.

### Spacing / Radius / Misc
- Section padding: `clamp(90px,13vh,180px)` vertical, `clamp(20px,3.2vw,52px)` horizontal.
- Card/preview radius: 5–8px. Contact panel top radius (if kept as panel): `clamp(24px,3vw,44px)`.
- Standard easing: `cubic-bezier(.16,1,.3,1)` (expo-out feel).
- Reveal transition base: ~1.1s.

---

## Global Behavior

### Smooth scroll (Lenis + GSAP glue)
```ts
const lenis = new Lenis();
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((t) => lenis.raf(t * 1000));
gsap.ticker.lagSmoothing(0);
```
Wrap the app in a client `<SmoothScroll>` provider. All scroll-driven effects below should be GSAP ScrollTriggers (use `scrub: true` for the scrubbed ones, `pin: true` for pinned ones).

### Fixed rails (overlay, both corners)
- **Right rail** (`mix-blend-mode: difference`, white): vertical text showing the current section label ("About", "Projects", "Gallery", "Skills", "Awards", "Contact"). Hidden while Hero is active. Update via ScrollTrigger `onEnter`/`onEnterBack` per section.
- **Bottom-left counter** (`mix-blend-mode: difference`, mono): scroll progress as `(NN)` percent, 00→100.

### Scroll-reveal (`.r` elements)
Elements start `opacity:0; translateY(42px); filter:blur(12px)` and animate to `opacity:1; translateY(0); blur(0)` over ~1.1s when they reach ~center. Stagger variants at +0.12s / +0.24s. In React, do this with a reusable `<Reveal>` wrapper using ScrollTrigger (one-shot, `toggleActions: 'play none none none'`). Respect `prefers-reduced-motion`.

---

## Screens / Sections (top → bottom)

### 1. Hero — pinned scroll sequence
**Layout:** Full-viewport sticky stage, height of the scroll container ≈ **300vh** (gives ~2 viewports of scrub). Inside a `position:sticky; top:0; height:100svh` stage:
- **WebGL light rays** canvas, full-bleed, z0. Red god-rays beaming from top-center, fanning down, **direction tilts toward the cursor** (mouse-reactive). See "Light Rays Shader" below.
- Soft red radial base-tint + vignette overlay (z1).
- **Top bar** (z6): left logo `Taufique Ansari®`; right nav `Work / Info / Contact` (underline-on-hover).
- **Tagline** (z6, top-left): "Full stack developer, *crafting ideas into reality*, through code, detail and care." (sans + mint serif-italic on the middle clause).
- **Name lockup** (z6, vertically centered, full width, `justify-content:space-between`): `Taufique` (sans 700) left, `Ansari.` (mint serif italic) right.
- **Bottom bar** (z6): left `V1.0 — 2026`; center socials `GITHUB / LINKEDIN / BEHANCE`; right `WORK / INFO / CONTACT`.
- **Scroll cue** (z6, right-center): "Scroll" + animated bar.
- **Scene** (z4): a full-screen media element, initially `scale(.16)` centered (looks like a small card between the two names), grows to full-bleed. This is the "Basically, *I make websites*." moment — caption (serif italic, z7) fades in near the end. *In the target build, make this the exploded/encoded 3D sculpture scene (R3F) or a full-bleed video; the prototype uses a striped placeholder.*

**Scroll-scrubbed timeline** (progress `p` = 0→1 over the 300vh):
- `p 0 → 0.28`: name **rises** from lower-third (`+30vh`) to vertical center (smoothstep).
- `p 0 → 0.16`: top bar / tagline / bottom bar / scroll cue **fade out**.
- `p 0.33 → 0.83`: name **splits** — first name slides left (`-62vw`), last name slides right (`+62vw`), exiting the sides; name opacity fades out near `p 0.72+`.
- `p 0.32 → ~0.87`: **scene grows** from `scale .16` to `1` (full-bleed), fading in over `p 0.32–0.38`.
- `p 0.62 → end`: caption "Basically, *I make websites*." fades in (and out right at the very end).

Implement as one pinned ScrollTrigger (`pin`, `scrub`) with a GSAP timeline mapping these ranges.

### 2. About — blur-mask reveal
**Layout:** 2-col grid `1.1fr / .9fr`, gap `clamp(30px,5vw,90px)`, `align-items:start`.
- **Left:** big statement "As a *creative developer*, I craft tailor-made web experiences, blending technical precision and *emotion*." (sans 700 + mint-less white serif-italic on the two phrases; `clamp(30px,4.1vw,66px)`). Below it: bio block — small uppercase "About" label, paragraph (`clamp(15px,1.35vw,20px)`, 82% opacity), and an "Info →" link (arrow translates on hover).
- **Right:** **portrait** in an organic blob mask (`border-radius: 46% 54% 53% 47% / 50% 44% 56% 50%`, slow 14s morph keyframe), `aspect-ratio:4/5`, with a red multiply gradient overlay. Placeholder now — drop the owner's photo here.

**Behavior:** whole section gets a **scroll-driven blur**: blurred (`blur(13px)`, opacity ~0.5) when entering from the bottom, sharpening to `blur(0)` / opacity 1 as it reaches center. Inner `.r` elements also fade-up-with-blur. (This is the screenshotted "blur mask" transition — apply it to every dark content section that follows the hero.)

### 3. Projects ("Selected Work") + drawn ribbon
**Layout:** wrapped with Gallery in a `.ribbon-zone` (shared relative container). 2-col grid `1fr / clamp(300px,32vw,460px)`.
- **Left:** vertical list of rows, each: serif-italic index (`01`…), project name (sans 700, `clamp(30px,5.2vw,80px)`), and a right-aligned uppercase category that appears on active. Rows are **dimmed** (`opacity .30`) by default; the **hovered/active** row goes full white, indents slightly (`padding-left`), index turns red, category fades in.
- **Right:** sticky **preview card** (`top:18vh`, `height:min(56vh,440px)`) showing the active project's image + a meta row (`date` left, `PREVIEW` right). Shows on row hover, hides on list mouse-leave.
- **Ribbon:** a thick (`stroke-width ~60`, round cap, red, soft glow) serpentine SVG path spanning the **entire ribbon-zone height** (projects **and** gallery). It **draws in** (stroke-dashoffset → 0) as you scroll, starting at the top of "Selected Work" and finishing just **above** the Skills section. Sits behind the content (z0). Recompute the path in pixel space on resize.

Current projects (placeholders — owner to replace): `01 Nimbus — Web App`, `02 Atlas — Design System`, `03 Pulse — Dashboard`, `04 Verve — E-commerce`, `05 Orbit — Mobile`, `06 Lumen — AI Tool`.

### 4. Gallery — 3D-scattered parallax
**Layout:** `min-height:150vh`, perspective container, centered headline "Each project is a chance to *learn*, *experiment* and push my limits." (sans 700 + serif-italic words). **6 floating image cards** scattered absolutely around the text at varied sizes/rotations; each has a `data-depth` and `data-rot`. On scroll, each card translates vertically by `-(distanceFromViewportCenter) * depth * 70px` (parallax) while keeping its rotation. Also a `blur-sec`.

### 5. Skills — pinned left, scrolling right accordion
**Layout:** 2-col grid `1fr / 1fr`.
- **Left (PINNED):** sticky column (`position:sticky; top:16vh; align-self:start`) — uppercase lede "Full stack developer, passionate about clean code, motion and design — building for the web end to end." and a big **"Contact me →"** with an oversized red arrow (arrow translates on hover). It stays fixed while the right side scrolls. *Note: in the prototype this required `overflow-x: clip` (not `hidden`) on the scroll root, or sticky breaks. In Next.js, prefer GSAP `ScrollTrigger { pin: true }` on the left column instead.*
- **Right (SCROLLS):** accordion of categories. Each item: header (name + animated `+`/`–` plus-minus icon) and an expandable body of pill tags. The body expands via `grid-template-rows: 0fr → 1fr` transition. **Each category auto-opens and brightens as it crosses viewport center** (subtle expand), in addition to being click-toggleable. Items are spaced down a tall (`min-height:116vh`) column.

Categories & tags:
- **Frontend:** HTML, CSS, JavaScript, TypeScript, React, Next.js, Tailwind, Vue
- **Animation & 3D:** GSAP, Framer Motion, Three.js, WebGL, Lenis
- **Backend:** Node.js, Express, Python, Django, PHP, REST, GraphQL
- **Databases:** PostgreSQL, MySQL, MongoDB, Redis, Supabase
- **DevOps & Tools:** Docker, AWS, Vercel, Git, GitHub, CI/CD
- **Design:** Figma, Photoshop, Prototyping

### 6. Awards ("Recognition")
**Layout:** rows in a 4-col grid `2fr / 1.4fr / 1.4fr / auto`: org (white), site (muted), result (serif italic), year (mono, right). Hairline top borders; hover brightens row + small indent. Also a `blur-sec`. Placeholder rows (owner to replace): Awwwards · Honourable Mention · 2025; CSS Design Awards · Special Kudos · 2025; FWA · Site of the Day · 2024.

### 7. Contact — dot-merge reveal
**Layout:** pinned reveal, container ≈ **200vh**, sticky 100svh stage.
- A **cream card** (`#ece8e1`) fills the stage, masked by a **repeating radial-dot mask** (`mask-size:22px`). On scroll: the card **scales up** (`.18 → 1`) and the dot mask **fills in** (`--dot` mask stop `6% → ~126%`) so **tiny white dots appear, grow, and merge into the solid cream page**.
- **Content** (centered, near-black text): eyebrow "Get in touch", huge "Contact", availability line ("Currently *available* for freelance and full-time roles…"), an email pill button (`hello@taufique.dev →`, inverts to red on hover), and a bottom row (© + socials). Content fades in over the last ~30% of the reveal.

### 8. Footer
**Layout:** dark. 3-col top row: email + © / socials column / nav column. Then a giant `Taufique` (sans) + `Ansari.` (mint serif italic) lockup with a **halftone dot mask** texture.

---

## Light Rays Shader (Three.js)
Recreate as a fullscreen R3F shader (orthographic quad or `<ScreenQuad>` from drei). Port the GLSL in `portfolio.html` (search `rayStrength`). Uniforms & tuned values:
- `rayPos = (W*0.5, H*-0.06)` (top-center, slightly above) · `rayDir = (0,1)` (down)
- `raysColor = (1.0, 0.16, 0.09)` · `raysSpeed = 1.0` · `lightSpread = 1.05` · `rayLength = 1.6`
- `pulsating = 0` · `fadeDistance = 1.25` · `saturation = 1.0`
- `mouseInfluence = 0.18` (direction lerps toward cursor) · `noiseAmount = 0.10` · `distortion = 0.05`
- Top-weighted brightness falloff; clear color = `#0a0a0a`. Cap DPR at 2.

## Interactions & State summary
- **Smooth scroll:** Lenis, global.
- **Scrubbed/pinned:** Hero sequence (pin+scrub), Skills left (pin), Contact reveal (pin+scrub), Ribbon draw (scrub), Gallery parallax (scrub), section blur reveals (scrub).
- **One-shot reveals:** `.r` blur-rise on enter.
- **Hover:** nav underlines, project row focus + preview swap, accordion plus-minus, arrow nudge, email button invert.
- **Pointer:** light-rays direction follows cursor (lerped).
- **State:** active project (hover), open accordion item(s), current section label, scroll progress %. No data fetching — static content.
- **Reduced motion:** disable entrance/scrub transforms, show end states.

## Assets
- **Fonts:** Instrument Serif (Google Fonts). Helvetica Neue / Arial system stack for sans.
- **Images:** none included — all image areas are striped placeholders. Owner to supply: profile photo (About blob), 6 project shots (Projects preview + Gallery floats), and optionally a video/3D scene for the hero "Basically, I make websites" moment.
- **No external icon libraries** — the few glyphs (arrows, plus/minus, dots) are CSS/inline SVG.

## Files
- `portfolio.html` — the complete, self-contained hi-fi prototype (all sections, all motion). Open it in a browser as the source of truth for look + timing.

## Still TODO (content)
Owner to provide real **GitHub / LinkedIn / Behance URLs + email**, real **project** names/categories/shots, real **awards**, profile **photo**, and the hero **scene** media. Everything currently in the design for those is placeholder.
