# Cinematic Scroll Homepage Design

## Goal

Build a desktop-first prototype inspired by Hubtown's cinematic homepage experience. The prototype prioritizes smooth, reversible scroll choreography and atmosphere over brand fidelity, photorealism, or production features.

## Scope

- Use the original prototype brand **NORTHSTAR** with custom copy and visuals.
- Recreate the reference's core experience: brief loader, fixed HUD frame, chapter rail, centered editorial copy, six abstract scenes, smooth scrubbing, and final-state footer.
- Use Lenis for desktop smooth scrolling and GSAP with ScrollTrigger for the animation timeline.
- Build every visual from HTML, CSS, and SVG: gradients, masks, paths, particles, terrain silhouettes, and transformed cubes.
- Provide a readable mobile fallback and `prefers-reduced-motion` behavior.

## Non-Goals

- No copied Hubtown logo, media, or 3D assets.
- No Three.js, WebGL scene, generated video, audio, login, chat, working navigation, backend, CMS, or additional pages.
- No pixel-perfect mobile version of the desktop choreography.

## Technical Design

The site will be a vanilla JavaScript Vite application. A tall scroll track provides the document length while a single fixed stage remains in the viewport. ScrollTrigger maps the track to one master timeline; Lenis supplies smoothed scroll input and is synchronized through the GSAP ticker.

Code will be split by responsibility:

- `main.js` bootstraps the page and progressive-enhancement classes.
- `content.js` contains the six chapter labels and copy.
- `stage.js` renders the HUD and reusable scene primitives.
- `motion.js` owns the loader, Lenis integration, ScrollTrigger setup, chapter transitions, progress state, and cleanup.
- CSS files separate global tokens and layout from individual scene artwork.

The initial HTML will contain meaningful hero copy so the page remains legible if JavaScript fails.

## Experience and Scenes

The page opens with a fast loading counter and segmented progress indicator, then reveals the framed stage. A persistent wordmark, decorative navigation, left chapter rail, bottom progress bar, and scroll cue remain above the scene layers.

The six chapters are:

1. **Vision** — a luminous monolith rises above layered terrain.
2. **Momentum** — energy ribbons bend into a forward-moving tunnel.
3. **Network** — multiple glowing paths converge into a shared structure.
4. **Craft** — geometric blocks and route lines form an engineered landscape.
5. **Purpose** — contour-like terrain carries streams of light downward.
6. **Horizon** — a connected field opens into a wide final vista.

Each chapter receives a stable reading moment between its entrance and exit. Headings reveal by clipped line motion and controlled letter spacing; descriptions fade and lift; scene primitives translate, rotate, scale, blur, and change opacity. The sequence must scrub cleanly in both directions.

## Responsive and Accessibility Behavior

Desktop is optimized around a 1280 by 720 viewport. Below 768 pixels, the compact header replaces decorative links, the chapter rail becomes a numeric counter, scene complexity drops, and transitions use shorter fades. Lenis is disabled for touch-sized layouts.

When reduced motion is requested, the loader is skipped, smoothing is disabled, scenes use simple crossfades, and decorative particles remain static. Text contrast and keyboard focus states must remain visible.

## Failure Handling

- If Lenis cannot initialize, native scrolling continues with ScrollTrigger.
- If animations cannot initialize, the first scene and hero copy remain visible.
- Resizing refreshes ScrollTrigger measurements instead of rebuilding duplicate timelines.
- All animation setup returns cleanup functions to prevent repeated listeners and ticker callbacks during development reloads.

## Verification

- Run automated checks for chapter data, required semantic regions, and reduced-motion branching.
- Build the production bundle successfully.
- Inspect 1280 by 720 desktop and 390 by 844 mobile layouts.
- Verify the loader, all six chapter checkpoints, reverse scrolling, active chapter state, progress bar, resize behavior, and final footer.
- Confirm there are no console errors and no accidental horizontal overflow.

## Acceptance Criteria

The prototype is complete when it feels like one continuous cinematic journey, every scene is visually distinct, scrolling is smooth and reversible, copy stays readable, and the simplified mobile and reduced-motion modes remain usable without production-only features.
