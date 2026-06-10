"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import "./BlobCursor.css";

interface BlobCursorProps {
  blobType?: "circle" | "square";
  fillColor?: string;
  trailCount?: number;
  sizes?: number[];
  innerSizes?: number[];
  innerColor?: string;
  opacities?: number[];
  shadowColor?: string;
  shadowBlur?: number;
  shadowOffsetX?: number;
  shadowOffsetY?: number;
  filterId?: string;
  filterStdDeviation?: number;
  filterColorMatrixValues?: string;
  useFilter?: boolean;
  zIndex?: number;
}

export default function BlobCursor({
  blobType = "circle",
  fillColor = "#000000",
  trailCount = 3,
  sizes = [24, 18, 13], // Closer sizes to ensure continuous overlap
  innerSizes = [0, 0, 0],
  innerColor = "rgba(255, 255, 255, 0)",
  opacities = [1, 1, 1], // Solid for the filter calculation
  shadowColor = "transparent",
  shadowBlur = 0,
  shadowOffsetX = 0,
  shadowOffsetY = 0,
  filterId = "blob",
  filterStdDeviation = 10, // Higher blur threshold to keep the goo connection solid
  filterColorMatrixValues = "1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -9", // Enhanced threshold contrast
  useFilter = true,
  zIndex = 9999
}: BlobCursorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const blobsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  // Position trackers for frame-based lerp updates
  const mouse = useRef({ x: 0, y: 0 });
  const positions = useRef<{ x: number; y: number }[]>([]);

  // Initialize positions on render / change of trailCount
  if (positions.current.length !== trailCount) {
    positions.current = Array.from({ length: trailCount }, () => ({ x: 0, y: 0 }));
  }

  useEffect(() => {
    // Disable on touch devices
    const hasMouse = window.matchMedia("(pointer: fine)").matches;
    if (!hasMouse) return;

    setIsVisible(true);

    return () => {
      setIsVisible(false);
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    // Centered alignment offset via GSAP independent transform properties
    blobsRef.current.forEach((el) => {
      if (el) {
        gsap.set(el, { xPercent: -50, yPercent: -50 });
      }
    });

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouse.current.x = e.clientX - rect.left;
      mouse.current.y = e.clientY - rect.top;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // 60FPS update loop inside the GSAP Ticker to resolve jitter and lag
    const tick = () => {
      blobsRef.current.forEach((el, i) => {
        if (!el) return;
        
        const pos = positions.current[i];
        if (!pos) return;
        
        const target = i === 0 ? mouse.current : positions.current[i - 1];
        if (!target) return;
        
        // Responsive trailing factors
        const factor = i === 0 ? 0.3 : 0.22; 
        
        pos.x += (target.x - pos.x) * factor;
        pos.y += (target.y - pos.y) * factor;
        
        // Enforce maximum distance to prevent detaching (kiskör a nagykörtől ne váljon el)
        if (i > 0) {
          const dx = pos.x - target.x;
          const dy = pos.y - target.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          const prevSize = sizes[i - 1] ?? 20;
          const currSize = sizes[i] ?? 15;
          
          // Max distance between center points to guarantee they stay connected.
          // 35% of the combined diameters ensures solid overlap.
          const maxDist = (prevSize + currSize) * 0.35;
          
          if (dist > maxDist && dist > 0) {
            pos.x = target.x + (dx / dist) * maxDist;
            pos.y = target.y + (dy / dist) * maxDist;
          }
        }
        
        gsap.set(el, { x: pos.x, y: pos.y });
      });
    };

    gsap.ticker.add(tick);

    const handleMouseLeave = () => {
      gsap.to(".blob-main", { opacity: 0, duration: 0.2 });
    };

    const handleMouseEnter = () => {
      gsap.to(".blob-main", { opacity: 1.0, duration: 0.2 });
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      gsap.ticker.remove(tick);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      ref={containerRef}
      className="blob-container pointer-events-none"
      style={{ zIndex }}
    >
      {useFilter && (
        <svg style={{ position: "absolute", width: 0, height: 0 }}>
          <filter id={filterId}>
            <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation={filterStdDeviation} />
            <feColorMatrix in="blur" values={filterColorMatrixValues} />
          </filter>
        </svg>
      )}

      {/* Render with 1.0 opacity for solid black trail */}
      <div 
        className="blob-main" 
        style={{ 
          filter: useFilter ? `url(#${filterId})` : undefined,
          opacity: 1.0 
        }}
      >
        {Array.from({ length: trailCount }).map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              blobsRef.current[i] = el;
            }}
            className="blob"
            style={{
              width: sizes[i],
              height: sizes[i],
              borderRadius: blobType === "circle" ? "50%" : "0%",
              backgroundColor: fillColor,
              opacity: opacities[i],
              boxShadow: `${shadowOffsetX}px ${shadowOffsetY}px ${shadowBlur}px 0 ${shadowColor}`,
              left: 0,
              top: 0
            }}
          >
            {innerSizes[i] > 0 && (
              <div
                className="inner-dot"
                style={{
                  width: innerSizes[i],
                  height: innerSizes[i],
                  top: (sizes[i] - innerSizes[i]) / 2,
                  left: (sizes[i] - innerSizes[i]) / 2,
                  backgroundColor: innerColor,
                  borderRadius: blobType === "circle" ? "50%" : "0%"
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
