# Facilitating Commoning — Web Repository · UI Design

High-fidelity UI design of the Facilitating Commoning web repository.

- **Content & structure** come from the approved low-fidelity wireframe
  (`../index.html`) — same screens, same data, same navigation model.
- **Visual language** comes from the FES Organization Onboarding Platform
  (`../../Onboarding Process/landing.html`) — same palette, type scale,
  card system, button system, motion and icon set.

## Running it

Open `index.html` in a browser. Everything is relative and self-contained —
no build step and no server required.

## Files

| File | Contents |
|---|---|
| `index.html` | Page shell, overlay containers, toast |
| `styles.css` | The complete design system |
| `app.js` | Data, components, all screens, hash router |
| `assets/vendor/lucide.min.js` | Icon set (copied from the onboarding platform) |

## Design tokens

Carried over unchanged from the onboarding platform:

| Token | Value | Use |
|---|---|---|
| `--ink` | `#2B3674` | Headings, dark bands, footer |
| `--blue` / `--cta-primary` | `#1F4397` | Primary CTA, links, active nav |
| `--green` | `#39A248` | Accent, success, hover state on cards |
| `--green-soft` | `#EAF5EC` | Eyebrow pills, soft green chips |
| `--muted` / `--muted-2` | `#5b6472` / `#6b7280` | Body copy |
| `--bg-soft` | `#f6f8fc` | Alternating section bands |
| `--line` / `--line-2` | `#eef0f4` / `#dfe3ea` | Borders |
| `--sans` | Helvetica Neue stack | All type |
| `--pad` | `max(24px, (100% - 1280px)/2)` | Page gutter / 1280px content frame |

Added for this product — restrained accents that identify each resource
system without leaving the blue/green family:

| Token | Value | Resource system |
|---|---|---|
| `--sys-forests` | `#2E8540` | Forests |
| `--sys-pastureland` | `#A16207` | Pastureland |
| `--sys-water` | `#0E7490` | Water |
| `--sys-theme` | `#1F4397` | Cross-cutting themes |

## Component inventory

Reused from the design direction: sticky blurred nav, hero with radial glow +
product mock + floating cards, `.card` with 4px top accent bar and −6px hover
lift, 48px rounded icon tiles, dark CTA band, dark footer, split auth screen,
form fields with `#F4F6FA` fill and blue focus ring, modals, scroll reveal.

New components built in the same language:

- **Commoning pathway** — six-stage stepper; past stages get green icon tiles,
  the active stage becomes an ink→blue gradient card
- **System / theme cards** — gradient cover with the system accent, process
  chain, dual footer action
- **Resource card** — type-coloured icon tile, badge, purpose, metadata pills,
  View / Download
- **Course card grid** — gradient thumbnail keyed to media type
  (video = crimson, audio = violet, document = green, tool = ochre)
- **Page header band** — two tones: `soft` for concept pages, `sysband`
  (blue gradient + dot grid + emblem) for system, stage, theme and story pages
- **Filter sidebar**, **curriculum two-pane**, **pillars + common-thread band**,
  **process flow chain**, **stat tiles**, **admin table**, **accordion**

## Screens (36 routes)

Home · About · Commoning of Commons · Learning Approach · Resource Systems &
Themes · Resource System · Stage detail · Modular / resource grid · Atomized
Course Curriculum · Theme page · Resource Library · Search results (incl. empty
state) · Resource detail · Field story · Help index · 6 Help topics · Sign In ·
My Learning · Admin Dashboard · Restricted-access gate.

Overlays: search (⌘K / Ctrl-K), contact & support, take-a-tour, mobile menu.

## Roles

The prototype ships three mock roles, switchable from Sign In and from the
header profile menu:

- **Visitor** — reads everything; downloading prompts sign in
- **Registered User** — downloads, Save, My Learning
- **Platform Super Admin** — Admin Dashboard, Edit actions

## Responsive

Breakpoints at 1240 / 1180 / 1120 / 900 / 680px. Nav links collapse to a menu
button, sidebars unstack, the pathway reflows 6 → 3 → 2 columns, and the hero
mock drops its sidebar and floating cards on small screens. Motion is disabled
under `prefers-reduced-motion`.
