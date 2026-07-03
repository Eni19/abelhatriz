---
name: design-inspiration
description: Stores visual design references (screenshots, mockups, style examples) that the user wants their designs to look like. Use this skill any time you are creating or modifying a UI, frontend component, web page, mockup, or visual styling (CSS, layout, color scheme, typography, spacing) in this project — even if the user's request doesn't explicitly mention "design" or "inspiration". Check this skill before writing or editing anything visual, so new work matches the established look and feel rather than a generic default style.
---

# Design Inspiration

This skill holds the visual reference material for this project's design language — screenshots, mockups, and style examples the user wants Claude to mimic. Consult it any time you're about to create or change something visual (components, pages, layouts, color schemes, typography) so the output matches the intended look and feel instead of a generic default.

## Why this matters

Without a concrete reference, Claude tends to fall back to generic-looking UI (default Tailwind blues, stock spacing, predictable layouts). This skill exists to anchor design decisions to what the user actually wants, captured once as images so it doesn't need to be re-explained in every conversation.

## Workflow

1. **Read `style-notes.md` first, if it exists.** This is a distilled, written-out summary of the patterns found across all reference images (palette, type, spacing, component conventions). It's much faster to read than re-analyzing every image from scratch, and should be treated as the current source of truth.

2. **Look at the files in `references/`.** These are the raw inspiration images (screenshots, mockups, exported designs, etc.). Use the Read tool on each image — Claude can view images directly. For each one, pay attention to:
   - **Color palette**: dominant colors, accent colors, background/surface tones, how much contrast is used
   - **Typography**: font pairings (or what they look like — serif/sans, weight, size hierarchy), letter spacing, line height
   - **Layout & spacing**: grid structure, whitespace density (tight/airy), alignment, how sections are separated
   - **Component style**: corner radius, borders vs. shadows vs. flat, button/input treatments, iconography style
   - **Overall mood**: minimal vs. maximal, playful vs. serious, editorial vs. utilitarian

   If filenames or a `references/README.md` note what each image represents (e.g. "dashboard-dark-mode.png", "landing-hero.png"), use that context to know which reference applies to which part of the current task.

3. **If `references/` is empty or has no images yet**, don't block on it — tell the user briefly that no design references have been added yet, and proceed using your own best judgment (or ask them what look they're going for, if the task is ambiguous). Don't invent a "house style" and write it into `style-notes.md` — that file should only reflect what's actually in the reference images.

4. **Apply what you learned consistently.** When writing the actual design/code, make concrete choices that reflect the references (specific hex-ish colors, specific spacing scale, specific corner radius) rather than vague gestures toward "modern and clean." If a decision doesn't have a clear reference to draw from, make the most consistent choice given everything else you've observed, and briefly note the assumption to the user rather than silently guessing.

5. **Keep `style-notes.md` up to date.** If you look through the reference images and there's no `style-notes.md` yet, or new images have been added since it was last written, write/update it with your distilled findings (see template below). This turns expensive image analysis into a cheap text read for future work, and gives the user a place to correct your interpretation directly.

## `style-notes.md` template

When creating or updating this file in the skill's root directory, structure it like this:

```markdown
# Style Notes

_Distilled from references/ — last updated after reviewing: <list of image filenames>_

## Color palette
- Primary: ...
- Accent: ...
- Background/surface: ...
- Notes on contrast/usage: ...

## Typography
- Headings: ...
- Body: ...
- Notes on hierarchy/spacing: ...

## Layout & spacing
- Grid/structure: ...
- Whitespace density: ...
- Alignment conventions: ...

## Components
- Buttons: ...
- Cards/surfaces: ...
- Corner radius / shadows / borders: ...

## Overall mood
- 1-2 sentences describing the aesthetic in plain language.

## Open questions / ambiguities
- Anything inferred with low confidence, or where references conflict.
```

## Adding new references

Tell the user they can drop new screenshots, mockups, or exported designs straight into `references/` (PNG/JPG/etc.), optionally with descriptive filenames (e.g. `landing-hero.png`, `dashboard-dark-mode.png`). The next time this skill is used, re-scan for images not yet reflected in `style-notes.md` and fold them in.
