# Cinematic Scroll Homepage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a polished six-chapter cinematic scrolling homepage inspired by the Hubtown experience.

**Architecture:** A vanilla Vite app renders one fixed stage over a tall scroll track. Lenis smooths desktop input while a GSAP ScrollTrigger master timeline scrubs scene artwork, text, HUD state, and progress.

**Tech Stack:** Vite, JavaScript modules, CSS/SVG, GSAP, ScrollTrigger, Lenis, Vitest, jsdom

---

### Task 1: Project foundation and chapter model

**Files:**
- Create: `package.json`, `index.html`, `src/content.js`, `src/content.test.js`

- [x] Write a test asserting six ordered chapters with non-empty label, title, body, and scene keys.
- [x] Run `npm test -- --run` and confirm it fails because `src/content.js` is absent.
- [x] Add Vite/Vitest configuration, semantic fallback HTML, and the complete chapter data.
- [x] Run `npm test -- --run` and confirm the chapter model passes.

### Task 2: Stage renderer and semantic shell

**Files:**
- Create: `src/stage.js`, `src/stage.test.js`, `src/main.js`, `src/styles/base.css`, `src/styles/stage.css`

- [x] Write jsdom tests for the wordmark, navigation, six chapter controls, six scene articles, progress bar, and status region.
- [x] Run the focused stage test and confirm it fails before the renderer exists.
- [x] Implement `renderStage(root, chapters)` with the fixed HUD, SVG scene primitives, copy panels, and footer.
- [x] Add the global palette, typography, responsive frame, and initial no-JavaScript fallback styles.
- [x] Run the test suite and confirm the renderer tests pass.

### Task 3: Motion model and animation orchestration

**Files:**
- Create: `src/motion.js`, `src/motion.test.js`, `src/styles/scenes.css`
- Modify: `src/main.js`

- [x] Write tests for `chapterIndexFromProgress()` boundaries and `getMotionMode()` desktop, compact, and reduced-motion branches.
- [x] Run the focused motion tests and confirm they fail before implementation.
- [x] Implement Lenis/GSAP setup, loader timeline, master scroll timeline, active-chapter updates, progress updates, cleanup, and native-scroll fallback.
- [x] Add per-scene artwork, transition states, glow, grain, particles, ribbons, terrain, and CSS 3D cube styling.
- [x] Run the complete tests and confirm they pass.

### Task 4: Responsive behavior and production verification

**Files:**
- Modify: `src/styles/base.css`, `src/styles/stage.css`, `src/styles/scenes.css`, `src/motion.js`

- [x] Add compact mobile header, numeric chapter indicator, reduced scene density, touch-native scrolling, and reduced-motion CSS.
- [x] Run `npm run build` and confirm Vite produces the production bundle.
- [x] Start the Vite server and inspect 1280x720 and 390x844 layouts in the browser.
- [x] Verify loader dismissal, six forward and reverse chapter checkpoints, progress, resize, no horizontal overflow, and no console errors.
- [x] Run `npm test -- --run` and `npm run build` once more before completion.
