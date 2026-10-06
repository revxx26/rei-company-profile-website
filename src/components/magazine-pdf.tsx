"use client";
import { Text, useLocale } from "@/components/site-preferences";
import { SiteSelect } from "@/components/site-select";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Download, ZoomIn, ZoomOut } from "lucide-react";
import type { PDFDocumentProxy, PDFDocumentLoadingTask, RenderTask } from "pdfjs-dist";

export function MagazinePdf({ src, title }: { src: string; title: string }) {
  const { t } = useLocale();
  const [document, setDocument] = useState<PDFDocumentProxy | null>(null);
  const [page, setPage] = useState(1);
  const [zoom, setZoom] = useState(1);
  const [error, setError] = useState("");
  const [rendering, setRendering] = useState(true);
  const [width, setWidth] = useState(600);
  const [height, setHeight] = useState(640);
  const canvas = useRef<HTMLCanvasElement>(null);
  const viewport = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let disposed = false;
    let loading: PDFDocumentLoadingTask | undefined;
    async function load() {
      try {
        const pdfjs = await import("pdfjs-dist");
        if (disposed) return;
        pdfjs.GlobalWorkerOptions.workerSrc = "/publications/pdf.worker.min.mjs";
        loading = pdfjs.getDocument({ url: src });
        const pdf = await loading.promise;
        if (!disposed) setDocument(pdf);
      } catch {
        if (!disposed) setError("The PDF could not be loaded. You can download the original file below.");
      }
    }
    void load();
    return () => { disposed = true; void loading?.destroy(); };
  }, [src]);

  useEffect(() => {
    const element = viewport.current;
    if (!element) return;
    const observer = new ResizeObserver(() => {
      setWidth(Math.max(180, element.clientWidth - 32));
      setHeight(Math.max(240, element.clientHeight - 32));
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!document || !canvas.current) return;
    let disposed = false;
    let renderTask: RenderTask | undefined;
    async function render() {
      try {
        const pdfPage = await document!.getPage(page);
        if (disposed || !canvas.current) return;
        const base = pdfPage.getViewport({ scale: 1 });
        const view = pdfPage.getViewport({ scale: Math.min(width / base.width, height / base.height) * zoom });
        const outputScale = Math.min(window.devicePixelRatio || 1, 2);
        const element = canvas.current;
        element.width = Math.floor(view.width * outputScale);
        element.height = Math.floor(view.height * outputScale);
        element.style.width = `${view.width}px`;
        element.style.height = `${view.height}px`;
        renderTask = pdfPage.render({ canvas: element, viewport: view, transform: outputScale === 1 ? undefined : [outputScale, 0, 0, outputScale, 0, 0] });
        await renderTask.promise;
        if (!disposed) setRendering(false);
      } catch (failure) {
        if (!disposed && !(failure instanceof Error && failure.name === "RenderingCancelledException")) setError("This page could not be displayed. Try another page or download the PDF.");
      }
    }
    void render();
    return () => { disposed = true; renderTask?.cancel(); };
  }, [document, page, width, height, zoom]);

  function changePage(next: number) {
    setPage(next); setRendering(true); setError(""); viewport.current?.scrollTo({ top: 0, left: 0 });
  }

  return <div className="magazine-pdf">
    <div className="magazine-pdf-controls">
      <div className="magazine-page-controls">
        <button type="button" aria-label={t("Previous PDF page")} disabled={!document || page <= 1} onClick={() => changePage(page - 1)}><ArrowLeft size={19} /></button>
        <label><Text value={"Page "} /><SiteSelect className="page-select" label={t("PDF page")} value={String(page)} disabled={!document} onChange={(value) => changePage(Number(value))} options={Array.from({ length: document?.numPages ?? 1 }, (_, index) => ({ value: String(index + 1), label: String(index + 1) }))} /><span><Text value={"of "} />{document?.numPages ?? "…"}</span></label>
        <button type="button" aria-label={t("Next PDF page")} disabled={!document || page >= document.numPages} onClick={() => changePage(page + 1)}><ArrowRight size={19} /></button>
      </div>
      <div className="magazine-zoom-controls">
        <button type="button" aria-label={t("Zoom PDF out")} disabled={zoom <= 1} onClick={() => setZoom(Math.max(1, zoom - 0.25))}><ZoomOut size={19} /></button>
        <span>{Math.round(zoom * 100)}<Text value={"%"} /></span>
        <button type="button" aria-label={t("Zoom PDF in")} disabled={zoom >= 2.5} onClick={() => setZoom(Math.min(2.5, zoom + 0.25))}><ZoomIn size={19} /></button>
        <a href={src} download aria-label={t("Download magazine PDF")}><Download size={19} /></a>
      </div>
    </div>
    <div className="magazine-pdf-viewport" ref={viewport} tabIndex={0} aria-label={t("Magazine PDF. Scroll to read the page.")}>
      {(rendering || error) && <p className="magazine-pdf-status" role="status"><Text value={error || "Loading magazine…"} /></p>}
      <canvas ref={canvas} role="img" aria-label={t(`${title}, page ${page}`)} style={{ visibility: document && !error ? "visible" : "hidden" }} />
    </div>
    <p className="magazine-pdf-caption" role="status" aria-live="polite"><Text value={"Original REI magazine · "} /><Text value={document ? `Page ${page} of ${document.numPages}` : "PDF preview"} /></p>
  </div>;
}
