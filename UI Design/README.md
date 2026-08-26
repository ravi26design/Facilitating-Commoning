# Facilitating Commoning — Web Repository · UI Design

High-fidelity UI design of the Facilitating Commoning web repository.

There are two designs in this folder, both built from the same approved
wireframe but following different visual references. They are independent —
neither imports from the other.

| Design | Files | Visual reference |
|---|---|---|
| **A · Editorial** | `index.html` + `styles.css` + `app.js` | FES Organization Onboarding Platform (DM Serif Display + Lato, editorial) |
| **B · Platform** | `design.html` (single self-contained file) | Understanding Commons platform (`../../../Anshul Work/Understanding Commons/UC Webapp UI Design/index.html`) |

Both take **content & structure** from the approved low-fidelity wireframe
(`../index.html`) — same screens, same data, same navigation model.

## Running them

Open either `index.html` or `design.html` in a browser. Everything is
relative and self-contained — no build step and no server required.

---

# Design B — `design.html`

A single self-contained file (page shell, full design system and all screens
inline) that mirrors the structure of the Understanding Commons reference.

## Visual language carried over from the reference

Inter (400–800) · navy ink `#2B3674` · blue CTAs `#1F4397` · green accent
`#39A248` · square-cornered panels with soft navy shadows · 90rem content
frame · 5rem sticky header · Lucide icon set (self-hosted, offline).

Components reused verbatim from the reference: sticky header with app
launcher / language / profile menus, `.ehero` editorial hero over a
viewport-pinned photograph, `.pagehead` band, `.card` / `.imgcard`,
`.doccard` file cards with mini previews, `.docview` document viewer,
`.filterbox` faceted sidebar, `.gateway` navy CTA band, `.callout`,
`.chapter` full-bleed editorial rows, `.pullquote`, `.wf-tl` timeline,
`.tabbar`, `.stat` tiles, split login, overlay modals, toast.

New components built in the same language:

- **Commoning pathway** — six-stage stepper; completed stages take a soft
  green fill, the active stage becomes an ink→blue gradient card
- **System / theme cards** — photo top, accent ribbon, process chain, accent
  top-rule that wipes in on hover
- **Learning-design cards**, **topic cards**, **two-pane curriculum**,
  **course wizard** (two steps, sticky action bar), **segmented card/list
  toggle**, **applied-filter chips**, **equation strip** for the commoning
  approach, **admin tables**

Resource systems and themes each carry a restrained accent: Forests
`#2E8540` · Pastureland `#B26A00` · Water `#1565C0` · Multi-Actor Platforms
`#1F4397` · Local Economic Opportunities `#0E9488` · Sustainable Agriculture
`#7C3AED`.

## Page heads

Every page — home and internal alike — uses the reference's editorial hero:
title left with a green `<em>` accent word, standfirst and any actions right,
on white. There is no eyebrow label and no breadcrumb on the top-level nav
pages (Home, Commoning, Learning Approach, Resource Systems, Library, Help,
About, Courses); breadcrumbs remain on nested pages, where they aid
navigation. Home and Commoning of Commons additionally pin a photograph to
the viewport that the page scrolls across (`heroBackdrop` + `.ehero-window`).

## Infographics

Three supplied infographics sit in `assets/img/`, framed by `.infographic`:

| File | Used on |
|---|---|
| `modular-training-design.png` | Learning Approach · Modular card, and `#/la/modular` |
| `ldhf-capacity-building.png` | Learning Approach · LDHF card, and `#/la/ldhf` |
| `outcome-based-capacity-building.png` | Learning Approach · closing panel, and `#/la/outcome` |

`#/la/modular` pairs the infographic with five module cards that carry the
wireframe's per-module *trainee field action* — detail the infographic itself
does not show.

## Screens (51 routes)

Home · About · Commoning of Commons · Learning Approach (+ 3 diagram pages)
· Resource Systems & Themes · Resource system / theme page · Stage detail
(×6) · Atomized Course Curriculum · Learning-design topic list · Topic
detail (subtopics + files) · Document detail · Courses · Course viewer ·
File view · Resource Library · Search results (+ empty state) · Resource
detail · Field stories · Help index + 6 help topics · Sign In · My Learning
· Admin Dashboard · Create/Edit Course wizard · Restricted-access gate.

Overlays: search (⌘K / Ctrl-K), contact & support, take-a-tour, add theme,
add/edit topic, upload/edit document, change password.

## Roles

Three mock roles, switchable from Sign In and the header profile menu:

- **Visitor** — reads everything; downloading prompts sign in
- **Registered User** — downloads, Save, My Learning
- **Platform Super Admin** — admin dashboard, upload, edit modes, course
  and topic management

## Responsive

Breakpoints at 1400 / 1220 / 1080 / 980 / 900 / 820 / 700 / 560px. Nav links
collapse to a menu button below 980px, sidebars and two-panes unstack, the
pathway reflows, and the hero splits into a single column. Verified to have
no horizontal page overflow at 375px or 1440px across all 51 routes; wide
admin tables scroll inside their own container. The header takes its shadow
only once the page is scrolled.

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
