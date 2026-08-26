# Cover photography

Drop real field photographs here and the cards pick them up automatically.
If a file is missing the card falls back to the gradient + icon cover, so the
design never breaks — you can add these one at a time.

**Currently present:** all six images are freely licensed stand-ins from
Wikimedia Commons — see `ATTRIBUTION.md` for the credits the licences require,
and replace them with FES's own field photography when you have it.

## Expected filenames

| File | Used by |
|---|---|
| `hero-commoning.jpg` | Home-page hero photograph (16:9, at least 1920×1080) |
| `about-commons.jpg` | About band on the home page (wide ~2.9:1, at least 1800×630) |
| `la-training.jpg` | Learning Approach — Modular Training Design (~1.7:1) |
| `la-ldhf.jpg` | Learning Approach — LDHF (~1.7:1) |
| `commons-restoration.jpg` | Commoning of Commons — Restoration pillar (~1.7:1) |
| `commons-landscape.jpg` | Resource Systems & Themes banner (wide ~2.6:1, at least 1800×692) |
| `theme-map.jpg` | Theme — Multi-Actor Platforms (~1.7:1) |
| `theme-leo.jpg` | Theme — Local Economic Opportunities (~1.7:1) |
| `theme-agri.jpg` | Theme — Sustainable Agriculture Practices (~1.7:1) |
| `pastureland.jpg` | Pastureland resource-system card + cover |
| `forests.jpg` | Forests resource-system card + cover |
| `water.jpg` | Water resource-system card + cover |
| `story-gram-sabha-forest.jpg` | "How a Gram Sabha strengthened governance…" story card |
| `story-pasture-rules.jpg` | "How communities developed rules…" story card |
| `story-water-access.jpg` | "How a hamlet secured equitable access…" story card |

## Specs

- **Aspect / size** — landscape, at least **1200 × 700px**. The cover crops to
  a 150px-tall band with `object-fit: cover`, so keep the subject centred.
- **Format** — JPEG, quality ~80, ideally under 300KB each.
- **Subject** — the commons itself and the people governing it: a grazing
  common, a community forest, a water body, a Gram Sabha in session.
- **Composition** — a dark scrim sits over the top and bottom of every image so
  the white "Resource System" label and icon stay legible. Avoid photos with
  critical detail in the top-left corner, where the label sits.

To point at different filenames, edit the `photo:` values in `app.js`
(`SYSTEMS`) and the `story-${s.id}.jpg` pattern in `storyCard()`.
