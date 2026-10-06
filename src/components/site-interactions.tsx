"use client";
import { Text, useLocale } from "@/components/site-preferences";
import { SiteSelect } from "@/components/site-select";

import Image from "next/image";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { TrainingEventDetails } from "@/components/training-event-details";
import { trainingEvents } from "@/data/training-events";
import { clearDetailLink, setDetailLink, useDetailLink } from "@/components/detail-link";
import { PreferenceControls } from "@/components/site-preferences";
import {
  ExternalLink,
  Mail,
  Menu,
  MessageCircle,
  X,
} from "lucide-react";

type ModalContent =
  { kind: "consultation"; topic: string } | { kind: "training"; eventId: string };
const ModalContext = createContext<(content: ModalContent) => void>(() => {});

export function SiteInteractions({ children }: { children: ReactNode }) {
  const { t, language } = useLocale();
  const dialog = useRef<HTMLDialogElement>(null);
  const [content, setContent] = useState<ModalContent>({
    kind: "consultation",
    topic: "General consultation",
  });
  const [topic, setTopic] = useState("General consultation");
  const previousOverflow = useRef("");
  const openModal = (next: ModalContent) => {
    setContent(next);
    if (next.kind === "consultation") setTopic(next.topic);
    if (!dialog.current?.open) previousOverflow.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.current?.showModal();
    if (dialog.current) dialog.current.scrollTop = 0;
    if (next.kind === "training") setDetailLink("training", next.eventId);
  };
  useDetailLink("training", (id) => {
    if (id && trainingEvents.some((item) => item.id === id)) {
      if (dialog.current?.open && content.kind === "training" && content.eventId === id) return;
      document.getElementById("training")?.scrollIntoView({ behavior: "instant", block: "start" });
      openModal({ kind: "training", eventId: id });
    } else if (dialog.current?.open && content.kind === "training") dialog.current.close();
  });
  const restoreScroll = () => {
    document.body.style.overflow = previousOverflow.current;
  };
  useEffect(
    () => () => {
      document.body.style.overflow = previousOverflow.current;
    },
    [],
  );
  const options = Array.from(
    new Set([
      "General consultation",
      "Training & Consultancy",
      "Audit & Inspection",
      "Personnel Certification",
      "Registration & certification",
      "Customized audit",
      "Improvement systems",
      "Instruments & calibration",
      ...(content.kind === "consultation" ? [content.topic] : []),
    ]),
  );
  const message = language === "id" ? `Halo tim REI Sistem, saya ingin informasi lebih lanjut tentang ${t(topic)}. Mohon bagikan detail layanan, jadwal, dan langkah selanjutnya. Terima kasih.` : `Hello REI Sistem team, I would like more information about ${topic}. Please share the service details, schedule and next steps. Thank you.`;
  return (
    <ModalContext.Provider value={openModal}>
      <Text value={children} />
      <dialog
        ref={dialog}
        className={`site-dialog ${content.kind === "training" ? "event-dialog" : ""}`}
        aria-labelledby="dialog-title"
        onClose={(event) => {
          if (event.target === event.currentTarget) {
            restoreScroll();
            if (content.kind === "training") clearDetailLink("training", content.eventId);
          }
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            const bounds = event.currentTarget.getBoundingClientRect();
            if (
              event.clientX < bounds.left ||
              event.clientX > bounds.right ||
              event.clientY < bounds.top ||
              event.clientY > bounds.bottom
            )
              dialog.current?.close();
          }
        }}
      >
        <button
          className="dialog-close icon-button"
          onClick={() => dialog.current?.close()}
          aria-label={t("Close dialog")}
          autoFocus
        >
          <X size={22} />
        </button>
        {content.kind === "consultation" ? (
          <div className="consultation-content">
            <span className="modal-symbol">
              <MessageCircle size={30} />
            </span>
            <h2 id="dialog-title"><Text value={"How can we help?"} /></h2>
            <p>
              <Text value={"Choose a topic and contact the REI team via WhatsApp or email."} /></p>
            <label htmlFor="consultation-topic"><Text value={"Consultation topic"} /></label>
            <SiteSelect id="consultation-topic" label={t("Consultation topic")} value={topic} onChange={setTopic} options={options.map((value) => ({ value, label: t(value) }))} />
            <a
              className="button button-navy"
              href={`https://wa.me/6281286578798?text=${encodeURIComponent(message)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle size={18} /> <Text value={"Continue to WhatsApp"} /><Text value={" "} />
              <ExternalLink size={15} />
            </a>
            <a
              className="button button-outline"
              href={`mailto:admin1@reisistem.id?subject=${encodeURIComponent(`${t("Information about")} ${t(topic)}`)}&body=${encodeURIComponent(message)}`}
            >
              <Mail size={18} /> <Text value={"Contact by email"} /></a>
            <p className="modal-footnote">
              <Text value={"Official REI Sistem contacts. Your message is only sent when you send it in WhatsApp or your email app."} /></p>
          </div>
        ) : (
          <TrainingEventDetails
            key={content.eventId}
            eventId={content.eventId}
            onEnquire={(nextTopic) => {
              setTopic(nextTopic);
              setContent({ kind: "consultation", topic: nextTopic });
              clearDetailLink("training", content.eventId);
              if (dialog.current) dialog.current.scrollTop = 0;
              dialog.current?.querySelector<HTMLButtonElement>(".dialog-close")?.focus();
            }}
          />
        )}
      </dialog>
    </ModalContext.Provider>
  );
}

export function ConsultationButton({
  className,
  label,
  shortLabel,
  topic = "General consultation",
  iconOnly = false,
}: {
  className?: string;
  label: string;
  shortLabel?: string;
  topic?: string;
  iconOnly?: boolean;
}) {
  const { t } = useLocale();
  const open = useContext(ModalContext);
  return (
    <button
      type="button"
      className={className}
      aria-label={t(shortLabel ? `${shortLabel}: ${label}` : label)}
      onClick={() => open({ kind: "consultation", topic })}
    >
      {iconOnly && <MessageCircle size={22} />}
      <span><Text value={shortLabel ?? label} /></span>
    </button>
  );
}
export function TrainingEventButton({ eventId, title, className, children }: { eventId: string; title: string; className?: string; children: ReactNode }) {
  const { t } = useLocale();
  const open = useContext(ModalContext);
  return <button type="button" className={className} aria-label={t(`View details: ${title}`)} aria-haspopup="dialog" onClick={() => open({ kind: "training", eventId })}><Text value={children} /></button>;
}
const navigation = [
  { label: "Services", href: "#layanan" },
  { label: "Training", href: "#training" },
  { label: "Insights", href: "#insights" },
  { label: "About REI", href: "#tentang" },
];
const subscribeToScroll = (onChange: () => void) => {
  window.addEventListener("scroll", onChange, { passive: true });
  window.addEventListener("resize", onChange);
  return () => { window.removeEventListener("scroll", onChange); window.removeEventListener("resize", onChange); };
};
const getIsAtTop = () => window.scrollY <= 0;
const getServerIsAtTop = () => true;
const getIsOverTraining = () => {
  const stage = document.querySelector(".events-stage")?.getBoundingClientRect();
  const midpoint = (document.querySelector("header")?.clientHeight ?? 90) / 2;
  return !!stage && stage.top <= midpoint && stage.bottom > midpoint;
};
const getServerIsOverTraining = () => false;

export function Header({ innerPage = false }: { innerPage?: boolean }) {
  const { t } = useLocale();
  const atTop = useSyncExternalStore(subscribeToScroll, getIsAtTop, getServerIsAtTop);
  const overTraining = useSyncExternalStore(subscribeToScroll, getIsOverTraining, getServerIsOverTraining);
  const [menuOpen, setMenuOpen] = useState(false);
  const [overHero, setOverHero] = useState(!innerPage);
  const menu = useRef<HTMLDialogElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const previousOverflow = useRef("");
  const openConsultation = useContext(ModalContext);
  const closeMenu = () => menu.current?.close();
  const onMenuClose = () => {
    setMenuOpen(false);
    if (!document.querySelector<HTMLDialogElement>(".site-dialog")?.open)
      document.body.style.overflow = previousOverflow.current;
  };
  useEffect(() => {
    const hero = document.getElementById("home-hero");
    const observer = new IntersectionObserver(
      ([entry]) => setOverHero(entry.isIntersecting),
      { rootMargin: "-90px 0px 0px 0px" },
    );
    if (hero) observer.observe(hero);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const onResize = () => {
      if (query.matches && menu.current?.open) menu.current.close();
    };
    query.addEventListener("change", onResize);
    return () => query.removeEventListener("change", onResize);
  }, []);
  return (
    <>
      <a href="#main-content" className="skip-link">
        <Text value={"Skip to main content"} /></a>
      <header className={`header ${!innerPage && (atTop || overHero) ? "header-over-hero" : "header-past-hero"} ${atTop ? "header-at-top" : "header-scrolled"} ${overTraining ? "header-over-training" : ""}`}>
        <div className="container header-inner">
          <a
            href={innerPage ? "/" : "#"}
            className="brand"
            aria-label={t("REI Sistem Indonesia, home")}
          >
            <Image
              src="/images/rei-logo.png"
              alt=""
              width={60}
              height={60}
              preload
            />
            <span>
              <Text value={"REI SISTEM"} /><small><Text value={"INDONESIA GROUP"} /></small>
            </span>
          </a>
          <nav className="desktop-nav" aria-label={t("Main navigation")}>
            {navigation.map((item) => (
              <a key={item.href} href={`${innerPage ? "/" : ""}${item.href}`}>
                <Text value={item.label} />
              </a>
            ))}
          </nav>
          <PreferenceControls />
          <button
            ref={menuButton}
            type="button"
            className="menu-toggle icon-button"
            aria-label={t("Open navigation menu")}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => {
              previousOverflow.current = document.body.style.overflow;
              document.body.style.overflow = "hidden";
              setMenuOpen(true);
              menu.current?.showModal();
            }}
          >
            <Menu size={25} />
          </button>
        </div>
      </header>
      <dialog
        ref={menu}
        id="mobile-navigation"
        className="mobile-menu"
        aria-labelledby="mobile-menu-title"
        onClose={onMenuClose}
      >
        <div className="mobile-menu-top">
          <span id="mobile-menu-title"><Text value={"REI SISTEM"} /></span>
          <button
            className="icon-button"
            aria-label={t("Close navigation menu")}
            onClick={closeMenu}
            autoFocus
          >
            <X size={24} />
          </button>
        </div>
        <nav aria-label={t("Mobile navigation")}>
          {navigation.map((item, index) => (
            <a key={item.href} href={`${innerPage ? "/" : ""}${item.href}`} onClick={closeMenu}>
              <span><Text value={"0"} />{index + 1}</span>
              <Text value={item.label} />
            </a>
          ))}
        </nav>
        <button
          className="button button-navy"
          onClick={() => {
            closeMenu();
            menuButton.current?.focus();
            document.body.style.overflow = previousOverflow.current;
            openConsultation({
              kind: "consultation",
              topic: "General consultation",
            });
          }}
        >
          <Text value={"Discuss your needs"} /></button>
        <p><Text value={"Respect. Excellence. Improvement."} /></p>
      </dialog>
    </>
  );
}
export function Reveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={className}><Text value={children} /></div>;
}
