"use client";

import type { KeyboardEvent } from "react";
import { motion } from "motion/react";
import { LOCALES, cycleLocale, getLocaleMeta } from "./locales";
import type { ShowcaseLocale } from "./types";

type LocaleSwitcherProps = {
  locale: ShowcaseLocale;
  onChange: (locale: ShowcaseLocale) => void;
  label: string;
  layoutId: string;
};

export function LocaleSwitcher({
  locale,
  onChange,
  label,
  layoutId,
}: LocaleSwitcherProps) {
  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault();
      const delta = event.key === "ArrowRight" ? 1 : -1;
      onChange(cycleLocale(locale, delta));
    }
    if (event.key === "Home") {
      event.preventDefault();
      onChange("de");
    }
    if (event.key === "End") {
      event.preventDefault();
      onChange("fa");
    }
  }

  return (
    <div
      className="pv-ls__langs"
      role="group"
      aria-label={label}
      onKeyDown={onKeyDown}
    >
      {LOCALES.map((id) => {
        const meta = getLocaleMeta(id);
        const active = id === locale;
        return (
          <button
            key={id}
            type="button"
            className="pv-ls__lang"
            data-script={meta.script}
            data-locale={id}
            aria-pressed={active}
            onClick={() => onChange(id)}
          >
            {active ? (
              <motion.span
                className="pv-ls__pill"
                layoutId={layoutId}
                transition={{ type: "spring", stiffness: 380, damping: 34 }}
              />
            ) : null}
            <span className="pv-ls__lang-label">{meta.shortLabel}</span>
          </button>
        );
      })}
    </div>
  );
}
