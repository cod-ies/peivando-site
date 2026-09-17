"use client";

import { motion, useReducedMotion } from "motion/react";

type BrandMarkProps = {
  pulse: number;
};

const HEX =
  "M20 8 L30.4 14 L30.4 26 L20 32 L9.6 26 L9.6 14 Z";

const SPOKES = [
  "M20 20 L20 8",
  "M20 20 L30.4 14",
  "M20 20 L30.4 26",
  "M20 20 L20 32",
  "M20 20 L9.6 26",
  "M20 20 L9.6 14",
] as const;

const NODES = [
  { cx: 20, cy: 8 },
  { cx: 30.4, cy: 14 },
  { cx: 30.4, cy: 26 },
  { cx: 20, cy: 32 },
  { cx: 9.6, cy: 26 },
  { cx: 9.6, cy: 14 },
] as const;

export function BrandMark({ pulse }: BrandMarkProps) {
  const reduce = useReducedMotion();

  return (
    <div className="pv-ls__mark" aria-hidden="true">
      <motion.svg
        key={pulse}
        viewBox="0 0 40 40"
        width="52"
        height="52"
        fill="none"
      >
        <motion.path
          d={HEX}
          stroke="var(--pv-ls-teal)"
          strokeWidth="1.4"
          strokeLinejoin="round"
          opacity={0.28}
          initial={reduce ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: reduce ? 0 : 0.55, ease: "easeOut" }}
        />
        {SPOKES.map((d, i) => (
          <motion.path
            key={d}
            d={d}
            stroke="var(--pv-ls-teal)"
            strokeWidth="1.35"
            strokeLinecap="round"
            opacity={0.5}
            initial={reduce ? false : { pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.5 }}
            transition={{
              duration: reduce ? 0 : 0.4,
              delay: reduce ? 0 : 0.05 * i,
              ease: "easeOut",
            }}
          />
        ))}
        {NODES.map((node, i) => (
          <motion.circle
            key={`${node.cx}-${node.cy}`}
            cx={node.cx}
            cy={node.cy}
            r="2.3"
            fill="var(--pv-ls-teal)"
            initial={reduce ? false : { scale: 0.35, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 420,
              damping: 22,
              delay: reduce ? 0 : 0.04 * i,
            }}
          />
        ))}
        <motion.circle
          cx="20"
          cy="20"
          r="3.9"
          fill="var(--pv-ls-teal)"
          initial={reduce ? false : { scale: 0.5, opacity: 0.4 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 380,
            damping: 18,
            delay: reduce ? 0 : 0.18,
          }}
        />
      </motion.svg>
    </div>
  );
}
