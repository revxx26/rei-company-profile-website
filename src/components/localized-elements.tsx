"use client";

import Image, { type ImageProps } from "next/image";
import type { ComponentProps } from "react";
import { useLocale } from "@/components/site-preferences";

export function LocalizedImage({ alt, ...props }: ImageProps) {
  const { t } = useLocale();
  return <Image {...props} alt={t(alt)} />;
}
export function LocalizedNav(props: ComponentProps<"nav">) {
  const { t } = useLocale();
  return <nav {...props} aria-label={props["aria-label"] ? t(props["aria-label"]) : undefined} />;
}
export function LocalizedAnchor(props: ComponentProps<"a">) {
  const { t } = useLocale();
  return <a {...props} aria-label={props["aria-label"] ? t(props["aria-label"]) : undefined} />;
}
