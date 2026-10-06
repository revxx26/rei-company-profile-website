"use client";
import { Text, useLocale } from "@/components/site-preferences";
import { SiteSelect } from "@/components/site-select";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { TrainingEventButton } from "@/components/site-interactions";
import { trainingEvents, trainingMonths } from "@/data/training-events";
import { useDetailLink } from "@/components/detail-link";

function closestSlide(positions: number[], scrollLeft: number) {
  return positions.reduce((closest, position, index) => Math.abs(position - scrollLeft) < Math.abs(positions[closest] - scrollLeft) ? index : closest, 0);
}

export function TrainingAgenda() {
  const { t } = useLocale();
  const [month, setMonth] = useState(trainingMonths[0].value);
  const [canPrevious, setCanPrevious] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [positions, setPositions] = useState([0]);
  const [activeSlide, setActiveSlide] = useState(0);
  const stops = useRef([0]);
  const requestedSlide = useRef<number | null>(null);
  const rail = useRef<HTMLUListElement>(null);
  const indicators = useRef<HTMLDivElement>(null);
  const events = trainingEvents.filter((item) => item.month === month);
  const monthLabel = trainingMonths.find((item) => item.value === month)!.label;
  useDetailLink("training", (id) => {
    const event = trainingEvents.find((item) => item.id === id);
    if (event && event.month !== month) {
      setMonth(event.month);
      requestedSlide.current = null;
      rail.current?.scrollTo({ left: 0, behavior: "instant" });
      setActiveSlide(0);
    }
  });
  const updateControls = () => {
    const element = rail.current;
    if (!element) return;
    setCanPrevious(element.scrollLeft > 4);
    setCanNext(element.scrollLeft + element.clientWidth < element.scrollWidth - 4);
    setActiveSlide(closestSlide(stops.current, element.scrollLeft));
    if (requestedSlide.current !== null && Math.abs(element.scrollLeft - stops.current[requestedSlide.current]) < 2) requestedSlide.current = null;
  };
  const showSlide = (index: number) => {
    const element = rail.current;
    if (!element) return;
    requestedSlide.current = index;
    element.scrollTo({ left: stops.current[index], behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  };
  const move = (direction: number) => {
    if (!rail.current) return;
    const current = requestedSlide.current ?? closestSlide(stops.current, rail.current.scrollLeft);
    showSlide(Math.max(0, Math.min(stops.current.length - 1, current + direction)));
  };

  useEffect(() => {
    const element = rail.current;
    if (!element) return;
    const observer = new ResizeObserver(() => {
      const cards = Array.from(element.children) as HTMLElement[];
      const max = Math.max(0, element.scrollWidth - element.clientWidth);
      const first = cards[0]?.getBoundingClientRect().left ?? 0;
      const next = cards.map((card) => card.getBoundingClientRect().left - first).filter((position) => position < max - 4);
      next.push(max);
      requestedSlide.current = null;
      stops.current = next;
      setPositions(next);
      setActiveSlide(closestSlide(next, element.scrollLeft));
      setCanPrevious(element.scrollLeft > 4);
      setCanNext(element.scrollLeft < max - 4);
    });
    observer.observe(element);
    if (element.firstElementChild) observer.observe(element.firstElementChild);
    return () => observer.disconnect();
  }, [month]);

  useEffect(() => {
    const group = indicators.current;
    const selected = group?.children[activeSlide] as HTMLElement | undefined;
    if (group && selected) group.scrollTo({ left: selected.offsetLeft - group.offsetLeft - (group.clientWidth - selected.clientWidth) / 2, behavior: "instant" });
  }, [activeSlide]);

  return (
    <section className="hot-training-section" id="training" aria-labelledby="training-title">
      <div className="container">
        <div className="hot-training-heading">
          <h2 id="training-title"><Text value={"Hot Trainings & Events"} /></h2>
          <p><Text value={"Browse monthly training agendas and recent events."} /></p>
        </div>
        <div className="events-toolbar">
          <div className="events-month-picker">
            <label htmlFor="training-month"><Text value={"Select month"} /></label>
            <SiteSelect id="training-month" label={t("Select month")} value={month} onChange={(value) => {
              setMonth(value);
              requestedSlide.current = null;
              rail.current?.scrollTo({ left: 0, behavior: "instant" });
              setCanPrevious(false); setCanNext(true); setActiveSlide(0);
            }} options={trainingMonths.map((item) => ({ value: item.value, label: t(item.label) }))} />
          </div>
        </div>
      </div>
      <div className="events-stage">
        <ul ref={rail} id="training-events" className="events-rail" aria-label={t(`${monthLabel} trainings and events`)} tabIndex={0} onScroll={updateControls} onWheel={() => { requestedSlide.current = null; }} onPointerDown={() => { requestedSlide.current = null; }} onKeyDown={(event) => {
          if (event.target !== event.currentTarget) return;
          if (event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); move(event.key === "ArrowRight" ? 1 : -1); }
        }}>
          {events.map((item) => <li className="event-card" key={item.id}>
            <TrainingEventButton eventId={item.id} title={t(`${item.title}, ${item.subtitle}`)} className="event-card-button">
              <div className="event-card-image"><Image src={item.images[0]} alt={t(`${item.title}: original REI publication`)} width={1374} height={1600} sizes="(max-width: 599px) calc(100vw - 24px), (max-width: 899px) 48vw, (max-width: 1279px) 32vw, 24vw" /></div>
              <div className="event-card-copy">
                <span className="event-card-meta"><Text value={item.archived ? "Past event" : item.format} /></span>
                <h3><Text value={item.title} /></h3>
                <p><Text value={item.subtitle} /></p>
                <div className="event-card-bottom"><span><Text value={item.archived ? item.date : monthLabel} /></span><ArrowRight size={18} aria-hidden="true" /></div>
              </div>
            </TrainingEventButton>
          </li>)}
        </ul>
        <div className="events-navigation" role="group" aria-label={t("Browse training cards")}>
          <button type="button" aria-label={t("Previous training cards")} aria-controls="training-events" disabled={!canPrevious} onClick={() => move(-1)}><ArrowLeft size={22} /></button>
          <div ref={indicators} className="events-indicators" role="group" aria-label={t("Carousel indicators")}>
            {positions.map((position, index) => <button key={position} type="button" aria-label={t(`Show training slide ${index + 1} of ${positions.length}`)} aria-current={activeSlide === index ? "true" : undefined} aria-controls="training-events" onClick={() => showSlide(index)}><span /></button>)}
          </div>
          <button type="button" aria-label={t("Next training cards")} aria-controls="training-events" disabled={!canNext} onClick={() => move(1)}><ArrowRight size={22} /></button>
        </div>
      </div>
      <div className="container">
        <div className="events-footer"><span role="status" aria-live="polite" aria-atomic="true"><Text value={events.length} /> <Text value={month === "2026-10" ? "training agendas" : "past events"} /> <Text value={"· "} /><Text value={monthLabel} /></span><span><Text value={"Use the arrows to explore"} /></span></div>
      </div>
    </section>
  );
}
