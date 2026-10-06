import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { SiteInteractions } from "@/components/site-interactions";
import { SitePreferences } from "@/components/site-preferences";
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
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth" className={`${manrope.variable} antialiased`}>
      <body>
        <Script id="rei-preferences-init" strategy="beforeInteractive">{`try { var p=JSON.parse(localStorage.getItem('rei-preferences')||'{}')||{}; document.documentElement.lang=p.language==='id'?'id':'en'; } catch {}`}</Script>
        <SitePreferences><SiteInteractions>{children}</SiteInteractions></SitePreferences>
      </body>
    </html>
  );
}
