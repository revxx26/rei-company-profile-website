# Smaller tablet and mobile training cards

Tablet cards are capped at 300px, phone cards at 280px, and narrow phones shrink further to retain space for the following card. Desktop sizing and centered controls are retained. A trailing rail spacer lets the last card align at the starting gutter, preserving one-card navigation through the final step.

Browser checks: 390px viewport gives 280px cards and 304px steps, including 1216 to 1520 at the end. An 820px viewport gives 300px cards and 324px steps, including 1296 to 1620 at the end. At 320px cards shrink to 257px, with no page overflow. Desktop at 1440px retains 329.25px cards. Lint passes.

Evidence: training-smaller-mobile.jpg and training-smaller-tablet.jpg. These measurements supersede the tablet and phone sizing in training-proportional-notes.md.
