"use client";
import { useLocale } from "@/components/site-preferences";

const socials = [
  { name: "LinkedIn", href: "https://www.linkedin.com/company/pt-rei-sistem-indonesia-group/", icon: <><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M7 10v7m4 0v-7m0 3c0-4 6-4 6 0v4" /><circle cx="7" cy="7" r=".7" /></> },
  { name: "Instagram", href: "https://www.instagram.com/rei.sistem.indonesia.group/", icon: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".7" /></> },
  { name: "YouTube", href: "https://www.youtube.com/@reisistemindonesiagrp", icon: <><rect x="2" y="5" width="20" height="14" rx="4" /><path d="m10 9 5 3-5 3Z" /></> },
  { name: "Facebook", href: "https://www.facebook.com/p/Rei-Rei-100021807183617/", icon: <path d="M14 22V12h4l1-4h-5V6c0-2 1-3 3-3h2V0h-3c-4 0-6 2-6 6v2H7v4h3v10" /> },
];

export function SocialLinks() {
  const { language } = useLocale();
  return <div className="footer-social-icons">{socials.map((social) => <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={`REI Sistem ${language === "id" ? "di" : "on"} ${social.name}`} title={social.name}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{social.icon}</svg></a>)}</div>;
}
