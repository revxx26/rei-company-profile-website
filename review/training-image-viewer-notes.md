# Training detail images and in-page enlargement

Phone details now show the publication before the description and enquiry controls. All training and archived event details share an expand icon over the current image. The old full-size publication link is removed. The icon opens a native full-screen image dialog within the current page, with fit view, zoom, scrolling and a close control.

The image viewer sits above the existing detail dialog. Closing it by button or Escape restores focus to the expand icon, preserves the selected program and keeps the page scroll locked until the detail dialog closes. The outer dialog's close handler ignores close events from the nested viewer.

Verified mobile image-first ordering at 390px, desktop enlargement, zoom to 1374px with horizontal scrolling on phones, fit/zoom controls, Escape, close and form-value preservation. September's second gallery photo is also the image shown by the viewer. URL stays at /#training and no new tab opens. Closing both dialogs restores body scrolling. Browser console has no errors; lint and production build pass.

Evidence: training-detail-image-first-mobile.jpg, training-image-viewer-mobile.jpg and training-image-viewer-desktop.jpg.
