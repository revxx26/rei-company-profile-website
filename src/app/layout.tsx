import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { SiteInteractions } from "@/components/site-interactions";
import { SitePreferences } from "@/components/site-preferences";
import { BackToTop } from "@/components/back-to-top";
import Script from "next/script";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "REI Sistem Indonesia: Redesign Concept",
  description:
    "REI Sistem Indonesia homepage concept: training, consultancy, audit and certification support for global industry standards.",
  robots: { index: false, follow: false },
  icons: { icon: "/images/rei-logo.png", apple: "/images/rei-logo.png" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth" className={manrope.variable}>
      <body>
        <Script id="rei-preferences-init" strategy="beforeInteractive">{`try { var p=JSON.parse(localStorage.getItem('rei-preferences')||'{}')||{}; document.documentElement.lang=p.language==='id'?'id':'en'; } catch {}`}</Script>
        <Script id="rei-scroll-init" strategy="beforeInteractive">{`
          (function () {
            var nav = performance.getEntriesByType('navigation')[0];
            var detail = new URLSearchParams(location.hash.slice(1));
            if (detail.has('service') || detail.has('training')) return;
            if (nav && nav.type === 'back_forward') return;
            if (nav && nav.type === 'reload' && location.hash) {
              history.replaceState(history.state, '', location.pathname + location.search);
            }
            if (location.hash) return;
            history.scrollRestoration = 'manual';
            function reset() { window.scrollTo({top: 0, left: 0, behavior: 'instant'}); }
            reset();
            window.addEventListener('pageshow', function (event) {
              if (!event.persisted) reset();
            }, {once: true});
          })();
        `}</Script>
        <SitePreferences><SiteInteractions>{children}</SiteInteractions><BackToTop /></SitePreferences>
      </body>
    </html>
  );
}
