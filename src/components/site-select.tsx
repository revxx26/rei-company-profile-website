"use client";

import { useId, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { Check, ChevronDown } from "lucide-react";

type Option = { value: string; label: string; code?: string };
type Props = {
  options: Option[];
  label: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  name?: string;
  id?: string;
  disabled?: boolean;
  className?: string;
  icon?: ReactNode;
  triggerLabel?: string;
};

export function SiteSelect({ options, label, value, defaultValue, onChange, name, id, disabled, className = "", icon, triggerLabel }: Props) {
  const [localValue, setLocalValue] = useState(defaultValue ?? options[0]?.value ?? "");
  const [open, setOpen] = useState(false);
  const selected = value ?? localValue;
  const selectedIndex = Math.max(0, options.findIndex((option) => option.value === selected));
  const generatedId = useId();
  const menuId = `${generatedId}-options`;
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const search = useRef({ text: "", time: 0 });

  useLayoutEffect(() => {
    const popup = menu.current;
    const button = trigger.current;
    if (!open || !popup || !button) return;
    // A top-layer popover also stays visible inside scrollable modal dialogs.
    popup.showPopover();
    const position = () => {
      const rect = button.getBoundingClientRect();
      const width = Math.min(window.innerWidth - 32, Math.max(rect.width, className.includes("language-select") ? 224 : 200));
      const below = window.innerHeight - rect.bottom - 16;
      const above = rect.top - 16;
      const upwards = below < Math.min(popup.scrollHeight, 240) && above > below;
      const height = Math.min(320, Math.max(48, upwards ? above : below));
      popup.style.width = `${width}px`;
      popup.style.maxHeight = `${height}px`;
      popup.style.left = `${Math.max(16, Math.min(rect.left, window.innerWidth - width - 16))}px`;
      popup.style.top = `${upwards ? Math.max(8, rect.top - Math.min(popup.scrollHeight, height) - 8) : rect.bottom + 8}px`;
    };
    position();
    optionRefs.current[selectedIndex]?.focus({ preventScroll: true });
    optionRefs.current[selectedIndex]?.scrollIntoView({ block: "nearest", behavior: "instant" });
    const outside = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    const reposition = () => {
      const rect = button.getBoundingClientRect();
      if (rect.bottom <= 0 || rect.top >= window.innerHeight) setOpen(false);
      else position();
    };
    window.addEventListener("resize", reposition);
    window.addEventListener("scroll", reposition, true);
    document.addEventListener("pointerdown", outside);
    return () => {
      if (popup.matches(":popover-open")) popup.hidePopover();
      window.removeEventListener("resize", reposition);
      window.removeEventListener("scroll", reposition, true);
      document.removeEventListener("pointerdown", outside);
    };
  }, [open, selectedIndex, className]);

  function choose(next: string) {
    setLocalValue(next);
    onChange?.(next);
    setOpen(false);
    trigger.current?.focus({ preventScroll: true });
  }

  return <div className={`site-select ${className}`} ref={root} onBlur={(event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
  }} onKeyDown={(event) => {
    if (event.key === "Escape" && open) {
      event.preventDefault(); event.stopPropagation(); setOpen(false); trigger.current?.focus({ preventScroll: true });
    }
  }}>
    {name && <input type="hidden" name={name} value={selected} disabled={disabled} />}
    <button id={id} ref={trigger} type="button" className="site-select-trigger" role="combobox" aria-label={label} aria-haspopup="listbox" aria-expanded={open} aria-controls={open ? menuId : undefined} disabled={disabled || !options.length} onClick={() => setOpen(!open)} onKeyDown={(event) => {
      if (event.key === "ArrowDown" || event.key === "ArrowUp") { event.preventDefault(); setOpen(true); }
    }}>
      {icon}<span>{triggerLabel ?? options[selectedIndex]?.label}</span><ChevronDown size={16} aria-hidden="true" />
    </button>
    {open && <div ref={menu} id={menuId} className="site-select-menu" popover="manual" role="listbox" aria-label={label} onKeyDown={(event) => {
      const current = optionRefs.current.indexOf(document.activeElement as HTMLButtonElement);
      let next: number | undefined;
      if (event.key === "ArrowDown") next = (current + 1) % options.length;
      if (event.key === "ArrowUp") next = (current + options.length - 1) % options.length;
      if (event.key === "Home") next = 0;
      if (event.key === "End") next = options.length - 1;
      if (event.key.length === 1 && event.key !== " " && !event.ctrlKey && !event.metaKey && !event.altKey) {
        const now = Date.now();
        search.current.text = (now - search.current.time < 600 ? search.current.text : "") + event.key.toLocaleLowerCase();
        search.current.time = now;
        const found = options.findIndex((option) => option.label.toLocaleLowerCase().startsWith(search.current.text));
        if (found !== -1) next = found;
      }
      if (next !== undefined) { event.preventDefault(); optionRefs.current[next]?.focus(); }
    }}>
      {options.map((option, index) => <button key={option.value} ref={(element) => { optionRefs.current[index] = element; }} type="button" role="option" aria-selected={selected === option.value} tabIndex={-1} onClick={() => choose(option.value)}>
        {option.code && <span className="site-select-code">{option.code}</span>}<span>{option.label}</span><Check size={15} aria-hidden="true" />
      </button>)}
    </div>}
  </div>;
}
