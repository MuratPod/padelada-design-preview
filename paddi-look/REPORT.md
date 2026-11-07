# Paddi look — HTML draft report (marker `paddi-look-html-20261107`)

**Status: DRAFT IMPLEMENTATION ONLY. Nothing is published or deployed. Publication awaits the original native approval, handled separately by parent/Manager.** This PR does not touch `watch-card-v3-pages`, Pages settings, or any hosting.

## What was built
- `paddi-look/index.html` — one self-contained page (inline CSS/JS, relative paths, no external requests). The approved design PNGs are used as screens with responsive semantic `<button>` hotspots; coordinates from `prototype_manifest.json` are embedded and scaled in percent.
- 7 states × 2 sizes (SE 375×667, Pro Max 430×932): hello, whatcan, draft, attach, typing, empty-saved, limit. States 01–03 reproduce the real Paddi screens; **04 attach is labeled "NEW adaptation"** (no genuine dark Paddi-attach source), visible tag on the stage.
- Transitions follow the manifest (suggest-game / cap-4 → typing → draft after 1.2 s; partner/summary stay on typing; draft-cancel/back → hello; attach ↔ draft; saved; limit-ok → hello; out-of-scope actions show a "Демо: …" toast; no dead ends — every screen has a back/close action).
- Toggles: context chip show/hide (cover patch + hotspot), limit state (↔ screen 07), Reduce Motion (defaults to the OS setting).
- Emotion gallery (4 poses, alpha or on-navy variant, 200 ms fade, instant under Reduce Motion), avatars 24/32/40/64 pt with 1x/2x/3x srcset, typing sprite 4 frames × 150 ms (static frame 1 under Reduce Motion), on stage and standalone.
- Text alternative: per-state description (img alt) and a button list mirroring all hotspots; visible focus ring; Tab/Enter/Space work.
- Everything is simulation: no network calls, chat, sending, upload, payment. Plus/Max wording is labeled DEMO CONCEPT in the page banner.
- Input asset ZIP: SHA256 verified `6787d353…7937`, extracted programmatically (45 files). Fonts are not bundled (Golos Text, SIL OFL 1.1 — see FONTS_LICENSES.txt).

## Checks genuinely run (Playwright/Chromium, `tests/browser-check.js`, results in `tests/results.txt`)
Viewports: mobile 375×812 and desktop 1280×900, both device-size modes each. **194 checks, 0 failed** (second run after fixing a reduce-motion test-string mismatch): all navigations at SE and Pro Max, auto typing→draft, toast, chip toggle, limit toggle, every state loads and has an action, no horizontal overflow on every state and at page end, hotspot coordinates scale accurately (23,384,330×44 on SE), keyboard Enter/Space/Tab, typing frames animate (≥3 distinct), reduce-motion static, 4 emotions + on-navy, 4 avatars, **zero 4xx/failed requests, zero external requests**.
Screenshots (real browser, 2x): `paddi-look/screenshots/` — every state at both sizes in mobile and desktop viewports, no-chip, focus-visible, full page.

## Known limitations
- Screens are the supplied PNGs; text inside them is not live DOM (alt text + action list compensate). The hidden-chip state is a flat cover patch over the PNG (slight tone mismatch possible at the edge).
- Typing sprite position was measured from the PNGs for both sizes; visually checked on Pro Max and SE only in desktop Chromium.
- Not tested on real devices, real Safari/iOS, or VoiceOver. Hotspots were not compared pixel-by-pixel with the manifest beyond the coordinate check above.
- The target repo's README says it is archived/redirected to `MuratPod/padelada/design-preview/`; the task named this repo explicitly, so the draft PR is opened here. Whether the work should live elsewhere is for the Manager.

## Prospective clean publication manifest
`PUBLISH_MANIFEST_PROSPECTIVE.json` lists the files (with SHA256) that a clean publication would need: `index.html`, `FONTS_LICENSES.txt`, `assets/**`, `png/**`. **Prospective only — not performed.**
