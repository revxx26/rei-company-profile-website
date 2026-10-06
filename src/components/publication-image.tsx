"use client";
import { Text, useLocale } from "@/components/site-preferences";

import Image from "next/image";
import { useRef, useState } from "react";
import { Maximize2, X, ZoomIn, ZoomOut } from "lucide-react";

export function PublicationImage({ src, title }: { src: string; title: string }) {
  const { t } = useLocale();
  const viewer = useRef<HTMLDialogElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const [zoomed, setZoomed] = useState(false);
  return <>
    <div className="publication-poster">
      <Image src={src} alt={t(`${title}: original REI publication`)} width={1374} height={1600} sizes="(max-width: 760px) 90vw, 520px" />
      <button className="event-image-expand" type="button" aria-label={t("View full-size image")} aria-haspopup="dialog" onClick={() => {
        setZoomed(false); viewer.current?.showModal(); viewport.current?.scrollTo({ top: 0, left: 0 });
      }}><Maximize2 size={19} /></button>
    </div>
    <dialog ref={viewer} className="event-image-viewer" aria-labelledby="publication-image-title" onClose={() => setZoomed(false)}>
      <div className="event-image-toolbar">
        <h2 id="publication-image-title"><Text value={title} /></h2>
        <button type="button" aria-label={t(zoomed ? "Zoom out" : "Zoom in")} aria-pressed={zoomed} onClick={() => {
          setZoomed(!zoomed); viewport.current?.scrollTo({ top: 0, left: 0 });
        }}>{zoomed ? <ZoomOut size={21} /> : <ZoomIn size={21} />}</button>
        <button type="button" aria-label={t("Close full-size image")} autoFocus onClick={() => viewer.current?.close()}><X size={22} /></button>
      </div>
      <div ref={viewport} className={`event-image-viewport${zoomed ? " is-zoomed" : ""}`} tabIndex={0} aria-label={t("Full-size publication. Zoom in and scroll to read.")}>
        <Image src={src} alt={t(`${title}: original REI publication`)} width={1374} height={1600} unoptimized />
      </div>
    </dialog>
  </>;
}
