# Portfolio Backlog

## ✅ Done

- [DONE] Testimonial modal navigation — left/right arrows, keyboard nav (ArrowLeft/ArrowRight), touch swipe, 150ms fade transition, dot position indicator
- [DONE] Stats carousel drag support — desktop mouse drag (grab-to-scrub), mobile touch drag, hover-slow behavior; auto-resumes after 1.5s pause
- [DONE] Mobile carousel seamless loop — `onTransitionEnd` property filter fix + `setTimeout(50)` re-enable for reliable silent snap on wrap
- [DONE] Drag-to-scrub extended to Testimonials and CoreDNA desktop carousels (`draggable={true}`)
- [DONE] WorkExperience accordion scroll jerk — `setOpen` first, then `setTimeout(400)` + `scrollIntoView` after transition settles; reads final DOM so scroll target is accurate
- [DONE] Testimonial modal arrows — rolled back pill/border styling to bare arrow characters; positioned at `left-2`/`right-2` with color-only hover
- [DONE] Testimonial modal swipe area — moved touch handlers to backdrop so swipe is detected anywhere on the overlay, not just the card
- [DONE] Background page scroll when modal open on iOS — replaced `overflow:hidden` with `position:fixed` + saved `scrollY` restore
- [DONE] Carousel discrete snap jerk (card 1→2) — always use `calc()` form for transform so syntax is consistent between drag and snap states
