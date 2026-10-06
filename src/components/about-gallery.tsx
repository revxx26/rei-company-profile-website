"use client";
import { Text, useLocale } from "@/components/site-preferences";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const photos = [
  { src: "/images/gathering-3.jpg", alt: "Award presentation at the REI Key Client Gathering 2026", caption: "Award presentation" },
  { src: "/images/gathering-6.jpg", alt: "Participants posing together at the REI Key Client Gathering 2026", caption: "The REI client community" },
  { src: "/images/gathering-2.jpg", alt: "Speaker addressing participants at the REI Key Client Gathering 2026", caption: "Sharing industry perspectives" },
  { src: "/images/gathering-4.jpg", alt: "Two speakers in a panel discussion at the REI Key Client Gathering 2026", caption: "Panel discussion" },
  { src: "/images/gathering-1.jpg", alt: "Stage prepared for the REI Key Client Gathering 2026", caption: "REI Key Client Gathering" },
];

const subscribeToHydration = () => () => {};

export function AboutGallery() {
  const { t } = useLocale();
  const hydrated = useSyncExternalStore(subscribeToHydration, () => true, () => false);
  const gallery = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [inView, setInView] = useState(false);
  const [visible, setVisible] = useState(true);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.25 });
    if (gallery.current) observer.observe(gallery.current);
    const onVisibility = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  useEffect(() => {
    if (hovered || focused || !inView || !visible || reducedMotion !== false) return;
    const interval = window.setInterval(() => setActive((index) => (index + 1) % photos.length), 4000);
    return () => window.clearInterval(interval);
  }, [hovered, focused, inView, visible, reducedMotion]);

  const move = (direction: number) => setActive((index) => (index + direction + photos.length) % photos.length);

  return (
    <div
      ref={gallery}
      className="about-gallery"
      role="region"
      aria-roledescription="carousel"
      aria-label={t("REI Key Client Gathering 2026 photos")}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          move(event.key === "ArrowLeft" ? -1 : 1);
        }
      }}
    >
      <div className="about-image gallery-stage">
        {photos.map((photo, index) => (
          <div
            key={photo.src}
            className={`gallery-slide ${index === active ? "is-active" : ""}`}
            aria-hidden={index !== active}
            role="group"
            aria-roledescription="slide"
            aria-label={t(`${index + 1} of ${photos.length}`)}
          >
            <Image src={photo.src} alt={t(photo.alt)} fill sizes="(max-width: 760px) 100vw, 45vw" />
          </div>
        ))}
        <div className="gallery-shade" aria-hidden="true" />
        <div className="gallery-caption">
          <span><Text value={"REI Key Client Gathering · 2026"} /></span>
          <strong><Text value={photos[active].caption} /></strong>
        </div>
        <div className="gallery-arrows">
          <button type="button" onClick={() => move(-1)} aria-label={t("Previous activity photo")} aria-controls="gallery-photo-status">
            <ChevronLeft size={18} />
          </button>
          <button type="button" onClick={() => move(1)} aria-label={t("Next activity photo")} aria-controls="gallery-photo-status">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
      <div className="gallery-navigation">
        <span id="gallery-photo-status" className="sr-only" aria-live={focused || (hydrated && reducedMotion) ? "polite" : "off"} aria-atomic="true">
          <Text value={"Photo "} />{active + 1} <Text value={"of "} /><Text value={photos.length} /><Text value={": "} /><Text value={photos[active].caption} />
        </span>
        <div className="gallery-dots" aria-label={t("Choose an activity photo")}>
          {photos.map((photo, index) => (
            <button key={photo.src} type="button" onClick={() => setActive(index)} aria-label={t(`Show photo ${index + 1}: ${photo.caption}`)} aria-current={active === index ? "true" : undefined}>
              <span />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
