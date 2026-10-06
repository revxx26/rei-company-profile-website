# Phone carousel end alignment

Removed the phone-only trailing spacer. The last card now stops at the 12px right gutter, while card sizing and centered navigation remain unchanged. The final scroll step adjusts to the remaining distance.

Browser checks: at 390px, October ends at scroll offset 1449 with a 12px right gutter, indicator six active and Next disabled. Previous returns to 1216. At 320px, September ends at 3629, with a 12px gutter and indicator fourteen active. Neither viewport has page overflow.

Evidence: training-phone-end-aligned.jpg. This supersedes the phone spacer behavior in training-tablet-end-aligned-notes.md and training-smaller-responsive-notes.md.
