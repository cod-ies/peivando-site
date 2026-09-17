"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { BakeryScreen } from "./BakeryScreen";
import { URL_HOST, localePath } from "./content";
import type { ShowcaseLocale } from "./types";

type DeviceSceneProps = {
  locale: ShowcaseLocale;
};

export function DeviceScene({ locale }: DeviceSceneProps) {
  const reduce = useReducedMotion();
  const url = `${URL_HOST}${localePath(locale)}`;
  const fade = {
    duration: reduce ? 0 : 0.28,
    ease: [0.22, 1, 0.36, 1] as const,
  };

  return (
    <div className="pv-ls__stage">
      <div className="pv-ls__laptop">
        <div className="pv-ls__laptop-bezel">
          <div className="pv-ls__laptop-chrome" dir="ltr">
            <span className="pv-ls__dots" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <div className="pv-ls__url" title={url}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={url}
                  initial={reduce ? false : { opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -4 }}
                  transition={fade}
                >
                  {url}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>
          <div className="pv-ls__laptop-screen">
            <BakeryScreen locale={locale} variant="desktop" />
          </div>
        </div>
        <div className="pv-ls__laptop-chin" aria-hidden="true" />
        <div className="pv-ls__laptop-base" aria-hidden="true" />
      </div>

      <div className="pv-ls__phone">
        <div className="pv-ls__phone-bezel">
          <div className="pv-ls__phone-bar" dir="ltr" aria-hidden="true">
            <span>9:41</span>
            <span className="pv-ls__island" />
            <span className="pv-ls__signal">LTE</span>
          </div>
          <div className="pv-ls__phone-screen">
            <BakeryScreen locale={locale} variant="mobile" />
          </div>
          <div className="pv-ls__home" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
