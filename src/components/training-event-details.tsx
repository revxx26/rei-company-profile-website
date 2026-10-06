"use client";
import { Text, useLocale } from "@/components/site-preferences";
import { SiteSelect } from "@/components/site-select";

import Image from "next/image";
import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Maximize2, X, ZoomIn, ZoomOut } from "lucide-react";
import { trainingEvents } from "@/data/training-events";
import { CopyDetailLink } from "@/components/detail-link";

export function TrainingEventDetails({ eventId, onEnquire }: { eventId: string; onEnquire: (topic: string) => void }) {
  const { t } = useLocale();
  const item = trainingEvents.find((event) => event.id === eventId);
  const [imageIndex, setImageIndex] = useState(0);
  const [program, setProgram] = useState("");
  const [attendance, setAttendance] = useState("Online");
  const imageViewer = useRef<HTMLDialogElement>(null);
  const imageViewport = useRef<HTMLDivElement>(null);
  const [zoomed, setZoomed] = useState(false);
  if (!item) return null;

  return (
    <div className="event-detail-content">
      <div className="event-detail-heading"><h2 id="dialog-title"><Text value={item.title} /></h2><p><Text value={item.subtitle} /></p></div>
      <div className="event-detail-grid">
        <div className="event-detail-publication">
          <div className="event-detail-image">
            <Image className="event-detail-poster" src={item.images[imageIndex]} alt={t(`${item.title}: original REI publication ${imageIndex + 1}`)} width={1374} height={1600} sizes="(max-width: 760px) 90vw, 580px" />
            <button className="event-image-expand" type="button" aria-label={t("View full-size image")} title={t("View full-size image")} aria-haspopup="dialog" onClick={() => {
              setZoomed(false);
              imageViewer.current?.showModal();
              imageViewport.current?.scrollTo({ top: 0, left: 0 });
            }}><Maximize2 size={19} aria-hidden="true" /></button>
          </div>
          {item.images.length > 1 && <div className="event-photo-navigation"><button type="button" aria-label={t("Previous event photo")} onClick={() => setImageIndex((imageIndex + item.images.length - 1) % item.images.length)}><ArrowLeft size={17} /></button><span><Text value={"Photo "} />{imageIndex + 1} <Text value={"of "} /><Text value={item.images.length} /></span><button type="button" aria-label={t("Next event photo")} onClick={() => setImageIndex((imageIndex + 1) % item.images.length)}><ArrowRight size={17} /></button></div>}
          <p><Text value={"Original REI publication, in Indonesian."} /></p>
          <CopyDetailLink kind="training" id={item.id} />
        </div>
        <div className="event-detail-information">
          {item.archived && <p className="event-archive-note"><Text value={"Past event. Ask the REI team about a similar session for your company."} /></p>}
          <p className="event-detail-overview"><strong><Text value={item.description} /></strong></p>
          <dl className="event-detail-facts"><div><dt><Text value={item.archived ? "Event date" : "Period"} /></dt><dd><Text value={item.date} /></dd></div><div><dt><Text value={"Format"} /></dt><dd><Text value={item.format} /></dd></div>{item.programs && <div><dt><Text value={"Programs"} /></dt><dd><Text value={item.programs} /></dd></div>}</dl>
          <h3><Text value={item.archived ? "Event focus" : "Included in this agenda"} /></h3>
          <ul className="event-detail-focus">{item.focus.map((focus) => <li key={focus}><Text value={focus} /></li>)}</ul>
          {!item.archived && <div className="event-enquiry-fields"><label htmlFor="event-program"><Text value={"Program of interest "} /><span><Text value={"(optional)"} /></span></label><input id="event-program" maxLength={140} value={program} onChange={(event) => setProgram(event.target.value)} placeholder={t("Program name or number")} /><label htmlFor="event-attendance"><Text value={"Preferred attendance"} /></label><SiteSelect id="event-attendance" label={t("Preferred attendance")} value={attendance} onChange={setAttendance} options={["Online", "Classroom"].map((value) => ({ value, label: t(value) }))} /></div>}
          <button className="button button-navy event-enquire-button" type="button" onClick={() => onEnquire(item.archived ? `A future session similar to ${item.title}, ${item.subtitle}, ${item.date}` : `${item.title}, ${item.subtitle}, ${item.date}, ${attendance}${program.trim() ? `, program: ${program.trim()}` : ""}`)}><Text value={item.archived ? "Ask about similar training" : "Enquire about registration"} /></button>
          {!item.archived && <p className="event-detail-note"><Text value={"Confirm your chosen program, date, fees and availability with the REI team."} /></p>}
        </div>
      </div>
      <dialog ref={imageViewer} className="event-image-viewer" aria-labelledby="event-image-title" onClose={() => setZoomed(false)}>
        <div className="event-image-toolbar">
          <h2 id="event-image-title"><Text value={item.title} /></h2>
          <button type="button" aria-label={t(zoomed ? "Zoom out" : "Zoom in")} title={t(zoomed ? "Zoom out" : "Zoom in")} aria-pressed={zoomed} onClick={() => {
            setZoomed(!zoomed);
            imageViewport.current?.scrollTo({ top: 0, left: 0 });
          }}>{zoomed ? <ZoomOut size={21} /> : <ZoomIn size={21} />}</button>
          <button type="button" aria-label={t("Close full-size image")} title={t("Close full-size image")} autoFocus onClick={() => imageViewer.current?.close()}><X size={22} /></button>
        </div>
        <div ref={imageViewport} className={`event-image-viewport${zoomed ? " is-zoomed" : ""}`} tabIndex={0} aria-label={t("Full-size image. Zoom in to read and scroll the publication.")}>
          <Image src={item.images[imageIndex]} alt={t(`${item.title}: original REI publication ${imageIndex + 1}`)} width={1374} height={1600} unoptimized />
        </div>
      </dialog>
    </div>
  );
}
