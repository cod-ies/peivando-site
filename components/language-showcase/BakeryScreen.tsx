"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { BAKERY } from "./content";
import { getLocaleMeta } from "./locales";
import { cx } from "./cx";
import type { ShowcaseLocale } from "./types";

type BakeryScreenProps = {
  locale: ShowcaseLocale;
  variant: "desktop" | "mobile";
};

export function BakeryScreen({ locale, variant }: BakeryScreenProps) {
  const reduce = useReducedMotion();
  const copy = BAKERY[locale];
  const meta = getLocaleMeta(locale);
  const transition = {
    duration: reduce ? 0 : 0.34,
    ease: [0.22, 1, 0.36, 1] as const,
  };

  return (
    <div
      className={cx(
        "pv-ls__bakery",
        variant === "mobile" && "pv-ls__bakery--mobile",
      )}
      dir={meta.dir}
      lang={meta.htmlLang}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={`${variant}-${locale}`}
          className="pv-ls__bakery-inner"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: -8 }}
          transition={transition}
        >
          <div className="pv-ls__bakery-nav">
            <b>{copy.brand}</b>
            {variant === "desktop" ? (
              <>
                <span>{copy.navRange}</span>
                <span>{copy.navShops}</span>
                <span>{copy.navContact}</span>
              </>
            ) : null}
          </div>
          {variant === "desktop" ? <div className="pv-ls__crumb" /> : null}
          <h4>{copy.headline}</h4>
          <p>{copy.lede}</p>
          <span className="pv-ls__bakery-cta">{copy.cta}</span>
          {variant === "desktop" ? (
            <>
              <div className="pv-ls__rule" />
              <ul className="pv-ls__products">
                {copy.products.map((product) => (
                  <li key={product.name}>
                    <span>{product.name}</span>
                    <em>{product.price}</em>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <dl className="pv-ls__meta-rows">
              <div>
                <dt>{copy.hoursTag}</dt>
                <dd>{copy.hoursValue}</dd>
              </div>
              <div>
                <dt>{copy.locationTag}</dt>
                <dd>{copy.locationValue}</dd>
              </div>
            </dl>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
