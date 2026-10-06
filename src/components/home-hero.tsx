"use client";
import { Text } from "@/components/site-preferences";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ArrowRight } from "lucide-react";
import { useReducedMotion } from "motion/react";

const subscribeToHydration = () => () => {};

export function HomeHero() {
  const hydrated = useSyncExternalStore(subscribeToHydration, () => true, () => false);
  const video = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(true);
  const [visible, setVisible] = useState(true);
  const [focused, setFocused] = useState(false);
  const [playing, setPlaying] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const hero = document.getElementById("home-hero");
    const observer = new IntersectionObserver(([entry]) =>
      setInView(entry.isIntersecting),
    );
    const onVisibilityChange = () => setVisible(!document.hidden);
    if (hero) observer.observe(hero);
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  useEffect(() => {
    const media = video.current;
    if (!media) return;
    if (reducedMotion !== false || !inView || !visible || focused) {
      media.pause();
      return;
    }
    // If autoplay is unavailable, keep the poster visible.
    void media.play().catch(() => {});
    return () => media.pause();
  }, [hydrated, reducedMotion, inView, visible, focused]);

  return (
    <section
      id="home-hero"
      className="home-hero"
      aria-labelledby="hero-title"
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
      }}
    >
      <div className="hero-background" aria-hidden="true">
        <Image
          src="/images/consultancy-poster.jpg"
          alt=""
          fill
          sizes="100vw"
          preload
        />
        {hydrated && reducedMotion === false && (
          <video
            ref={video}
            className={playing ? "is-playing" : ""}
            src="/videos/consultancy.mp4"
            poster="/images/consultancy-poster.jpg"
            muted
            loop
            playsInline
            preload="none"
            tabIndex={-1}
            onPlaying={() => setPlaying(true)}
            onError={() => setPlaying(false)}
          />
        )}
      </div>
      <div className="hero-shade" aria-hidden="true" />
      <div className="container hero-content">
        <h1 id="hero-title">
          <Text value={"Providing Global Recognition and Improvement Systems"} /></h1>
        <p className="hero-summary">
          <Text value={"Consulting, audit, and certification across the standards your industry runs on. Trusted by 500+ corporate clients across Indonesia."} /></p>
        <a className="hero-service-link" href="#layanan">
          <Text value={"Explore services "} /><ArrowRight size={17} />
        </a>
      </div>
    </section>
  );
}
