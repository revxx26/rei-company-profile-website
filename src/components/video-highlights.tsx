"use client";
import { Text, useLocale } from "@/components/site-preferences";

import Image from "next/image";
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { ExternalLink, Play, X } from "lucide-react";

const videos = [
  {
    id: "HwhACSDbpvI",
    category: "COMPANY PROFILE",
    title: "Meet REI Sistem",
    description: "An introduction to PT REI Sistem Indonesia Group.",
    source: "REI Sistem Indonesia Group",
  },
  {
    id: "7iT3CRuV8K4",
    category: "CLIENT GATHERING",
    title: "Key Client Gathering 2026",
    description: "Highlights from the gathering at ARTOTEL Living World.",
    source: "REI Sistem Indonesia Group",
  },
  {
    id: "nBUfF45AZRQ",
    category: "MEDIA COVERAGE",
    title: "Food safety in the news",
    description: "Metro TV coverage of food safety and environmental standards.",
    source: "Metro TV",
  },
];

type CompanyVideo = (typeof videos)[number];
const VideoContext = createContext<((video: CompanyVideo) => void) | null>(null);

function useVideoPlayer() {
  const open = useContext(VideoContext);
  if (!open) throw new Error("Video controls require VideoPlayerProvider");
  return open;
}

export function VideoPlayerProvider({ children }: { children: ReactNode }) {
  const { t } = useLocale();
  const dialog = useRef<HTMLDialogElement>(null);
  const previousOverflow = useRef("");
  const [active, setActive] = useState<CompanyVideo | null>(null);

  const open = (video: CompanyVideo) => {
    if (!dialog.current || dialog.current.open) return;
    setActive(video);
    previousOverflow.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.current.showModal();
  };

  useEffect(() => {
    const element = dialog.current;
    return () => {
      if (element?.open) document.body.style.overflow = previousOverflow.current;
    };
  }, []);

  const close = () => {
    dialog.current?.close();
    setActive(null);
  };

  return (
    <VideoContext.Provider value={open}>
      <Text value={children} />
      <dialog
        ref={dialog}
        className="video-dialog"
        aria-labelledby="video-dialog-title"
        onClose={() => {
          setActive(null);
          document.body.style.overflow = previousOverflow.current;
        }}
        onClick={(event) => {
          if (event.target !== event.currentTarget) return;
          const bounds = event.currentTarget.getBoundingClientRect();
          if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) close();
        }}
      >
        <div className="video-dialog-heading">
          <h2 id="video-dialog-title"><Text value={active?.title ?? "REI video"} /></h2>
          <button type="button" className="icon-button" aria-label={t("Close video")} onClick={close} autoFocus><X size={23} /></button>
        </div>
        <div className="video-player">
          {active && (
            <iframe
              key={active.id}
              src={`https://www.youtube-nocookie.com/embed/${active.id}?autoplay=1&rel=0`}
              title={t(active.title)}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          )}
        </div>
        {active && (
          <div className="video-dialog-footer">
            <span><Text value={"Source: "} /><Text value={active.source} /></span>
            <a href={`https://www.youtube.com/watch?v=${active.id}`} target="_blank" rel="noopener noreferrer"><Text value={"Watch on YouTube "} /><ExternalLink size={14} /></a>
          </div>
        )}
      </dialog>
    </VideoContext.Provider>
  );
}

export function CompanyProfileLink() {
  const open = useVideoPlayer();

  return (
    <a
      className="text-link"
      href="#videos"
      aria-haspopup="dialog"
      onClick={(event) => {
        if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        const section = document.getElementById("videos");
        section?.scrollIntoView({ behavior: "instant", block: "start" });
        // Return to the video preview when the dialog closes, without jumping back to About.
        section?.querySelector<HTMLButtonElement>(".video-preview")?.focus({ preventScroll: true });
        open(videos[0]);
      }}
    >
      <span className="play-icon"><Play size={12} fill="currentColor" /></span><Text value={" "} />
      <Text value={"Watch our company profile"} /></a>
  );
}

export function VideoHighlights() {
  const { t } = useLocale();
  const open = useVideoPlayer();

  return (
    <section className="video-section container" id="videos" aria-labelledby="videos-title">
      <div className="section-heading">
        <div>
          <h2 id="videos-title"><Text value={"Videos & Media"} /></h2>
        </div>
        <p className="section-description"><Text value={"Company profile, client events and media coverage."} /></p>
      </div>
      <div className="video-grid">
        {videos.map((video) => (
          <article className="video-card" key={video.id}>
            <button
              className="video-preview"
              type="button"
              aria-label={t(`Play video: ${video.title}`)}
              aria-haspopup="dialog"
              onClick={() => open(video)}
            >
              <Image src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`} alt="" fill unoptimized sizes="(max-width: 760px) 100vw, 33vw" />
              <span className="video-preview-shade" aria-hidden="true" />
              <span className="video-play" aria-hidden="true"><Play size={21} fill="currentColor" /></span>
              <span className="video-watch"><Text value={"Watch video"} /></span>
            </button>
            <div className="video-caption">
              <span className="video-category"><Text value={video.category} /></span>
              <h3><Text value={video.title} /></h3>
              <p><Text value={video.description} /></p>
              <span className="video-source"><Text value={video.source} /></span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
