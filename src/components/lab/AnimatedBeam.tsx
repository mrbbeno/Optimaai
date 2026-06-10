"use client";

import { useEffect, useState, useId, RefObject } from "react";
import { motion } from "framer-motion";

export interface AnimatedBeamProps {
  containerRef: RefObject<HTMLElement | null>;
  fromRef: RefObject<HTMLElement | null>;
  toRef: RefObject<HTMLElement | null>;
  curvature?: number;
  startXOffset?: number;
  startYOffset?: number;
  endXOffset?: number;
  endYOffset?: number;
  duration?: number;
  delay?: number;
  pathColor?: string;
  pathWidth?: number;
  pathOpacity?: number;
  gradientStartColor?: string;
  gradientStopColor?: string;
  reverse?: boolean;
}

export function AnimatedBeam({
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  startXOffset = 0,
  startYOffset = 0,
  endXOffset = 0,
  endYOffset = 0,
  duration = 2,
  delay = 0,
  pathColor = "rgba(0, 0, 0, 0.08)",
  pathWidth = 2,
  pathOpacity = 0.5,
  gradientStartColor = "#3b82f6",
  gradientStopColor = "#8b5cf6",
  reverse = false,
}: AnimatedBeamProps) {
  const rawId = useId();
  const id = rawId.replace(/:/g, "");
  const [pathD, setPathD] = useState("");

  useEffect(() => {
    let observer: ResizeObserver | null = null;
    const observedElements = new Set<Element>();

    const updatePath = () => {
      const container = containerRef.current;
      const fromEl = fromRef.current;
      const toEl = toRef.current;

      if (!container || !fromEl || !toEl) return;

      const containerRect = container.getBoundingClientRect();
      const fromRect = fromEl.getBoundingClientRect();
      const toRect = toEl.getBoundingClientRect();

      // Relative coordinates of fromEl center
      const x1 = fromRect.left - containerRect.left + fromRect.width / 2 + startXOffset;
      const y1 = fromRect.top - containerRect.top + fromRect.height / 2 + startYOffset;

      // Relative coordinates of toEl center
      const x2 = toRect.left - containerRect.left + toRect.width / 2 + endXOffset;
      const y2 = toRect.top - containerRect.top + toRect.height / 2 + endYOffset;

      // Calculate control points for curvature
      const dx = x2 - x1;
      const dy = y2 - y1;
      const cx = (x1 + x2) / 2 - dy * (curvature / 100);
      const cy = (y1 + y2) / 2 + dx * (curvature / 100);

      setPathD(`M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`);

      // Dynamically register observed elements once they mount
      if (observer) {
        if (!observedElements.has(container)) {
          observer.observe(container);
          observedElements.add(container);
        }
        if (!observedElements.has(fromEl)) {
          observer.observe(fromEl);
          observedElements.add(fromEl);
        }
        if (!observedElements.has(toEl)) {
          observer.observe(toEl);
          observedElements.add(toEl);
        }
      }
    };

    observer = new ResizeObserver(updatePath);

    updatePath();

    // Staggered timers to handle delayed ref population after mount
    const timers = [
      setTimeout(updatePath, 50),
      setTimeout(updatePath, 150),
      setTimeout(updatePath, 300),
      setTimeout(updatePath, 600),
      setTimeout(updatePath, 1000)
    ];

    window.addEventListener("resize", updatePath);

    return () => {
      if (observer) {
        observer.disconnect();
      }
      window.removeEventListener("resize", updatePath);
      timers.forEach(clearTimeout);
    };
  }, [containerRef, fromRef, toRef, curvature, startXOffset, startYOffset, endXOffset, endYOffset]);

  return (
    <svg
      className="pointer-events-none absolute inset-0 size-full fill-none stroke-2 z-0"
      style={{ overflow: "visible" }}
    >
      <path
        d={pathD}
        stroke={pathColor}
        strokeWidth={pathWidth}
        strokeOpacity={pathOpacity}
        strokeLinecap="round"
      />
      <path
        d={pathD}
        stroke={`url(#${id})`}
        strokeWidth={pathWidth}
        strokeLinecap="round"
        strokeOpacity="1"
      />
      <defs>
        <motion.linearGradient
          id={id}
          gradientUnits="userSpaceOnUse"
          initial={{ x1: reverse ? "100%" : "0%", y1: "0%", x2: reverse ? "200%" : "-100%", y2: "0%" }}
          animate={{
            x1: reverse ? ["100%", "-100%"] : ["-100%", "100%"],
            x2: reverse ? ["200%", "0%"] : ["0%", "200%"],
          }}
          transition={{
            duration,
            repeat: Infinity,
            ease: "linear",
            delay,
          }}
        >
          <stop offset="0%" stopColor={gradientStartColor} stopOpacity="0" />
          <stop offset="50%" stopColor={gradientStartColor} stopOpacity="1" />
          <stop offset="100%" stopColor={gradientStopColor} stopOpacity="0" />
        </motion.linearGradient>
      </defs>
    </svg>
  );
}
