# Tablet carousel end alignment

The trailing rail spacer now applies only to phones. Tablet cards retain their 300px cap; the final stop uses the rail's actual maximum scroll position so the last card ends at the 18px right gutter. The existing measured-position navigation and indicators already support this shorter final step.

Browser checks: at an 820px viewport, Next moves from 972 to 1151 at the final step, leaving an 18px right gutter. Next disables at the end, indicator five activates, and Previous returns to 972. At 1023px with September's 14 events, the final offset is 3540 with an 18px gutter and no page overflow. Phone width remains 280px at 390px, with 304px full-card steps.

Evidence: training-tablet-end-aligned.jpg. This supersedes the tablet trailing-spacer behavior in training-smaller-responsive-notes.md.
