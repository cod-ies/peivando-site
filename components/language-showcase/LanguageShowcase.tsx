"use client";

import { useCallback, useId, useState } from "react";
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from "motion/react";
import { DeviceScene } from "./DeviceScene";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { BrandMark } from "./BrandMark";
import { CHROME } from "./content";
import { cx } from "./cx";
import { getLocaleMeta } from "./locales";
import type { LanguageShowcaseProps, ShowcaseLocale } from "./types";
import "./language-showcase.css";

export function LanguageShowcase({
  className,
  defaultLocale = "de",
  onLocaleChange,
}: LanguageShowcaseProps) {
  const [locale, setLocale] = useState<ShowcaseLocale>(defaultLocale);
  const [pulse, setPulse] = useState(0);
  const reduce = useReducedMotion();
  const reactId = useId();
  const titleId = `${reactId}-title`;
  const pillId = `${reactId}-pill`;
  const meta = getLocaleMeta(locale);
  const chrome = CHROME[locale];

  const selectLocale = useCallback(
    (next: ShowcaseLocale) => {
      if (next === locale) {
        return;
      }
      setLocale(next);
      setPulse((value) => value + 1);
      onLocaleChange?.(next);
    },
    [locale, onLocaleChange],
  );

  return (
    <MotionConfig reducedMotion="user">
      <section
        className={cx("pv-ls", className)}
        dir={meta.dir}
        lang={meta.htmlLang}
        data-showcase-locale={locale}
        aria-labelledby={titleId}
      >
        <div className="pv-ls__grid">
          <div className="pv-ls__intro">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={locale}
                className="pv-ls__copy"
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -6 }}
                transition={{ duration: reduce ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="pv-ls__eyebrow">{chrome.eyebrow}</p>
                <h2 id={titleId} className="pv-ls__title">
                  {chrome.title}
                </h2>
                <p className="pv-ls__lede">{chrome.lede}</p>
              </motion.div>
            </AnimatePresence>
            <div className="pv-ls__controls">
              <LocaleSwitcher
                locale={locale}
                onChange={selectLocale}
                label={chrome.switcherLabel}
                layoutId={pillId}
              />
              <BrandMark pulse={pulse} />
            </div>
          </div>
          <DeviceScene locale={locale} />
        </div>
        <p className="pv-ls__hint">{chrome.hint}</p>
      </section>
    </MotionConfig>
  );
}
