"use client";

import React, { useEffect, useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";

export interface AnimatedListProps {
  className?: string;
  children: React.ReactNode;
  delay?: number;
}

export const AnimatedList = React.memo(({ className, children, delay = 2000 }: AnimatedListProps) => {
  const [index, setIndex] = useState(0);
  const childrenArray = useMemo(() => React.Children.toArray(children), [children]);

  useEffect(() => {
    if (childrenArray.length === 0) return;
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % childrenArray.length);
    }, delay);

    return () => clearInterval(interval);
  }, [childrenArray.length, delay]);

  const itemsToShow = useMemo(() => {
    if (childrenArray.length === 0) return [];
    
    // Build a sliding window of max 3 items showing the most recently added items
    const result = [];
    const limit = Math.min(childrenArray.length, 3);
    for (let i = 0; i < limit; i++) {
      const itemIdx = (index - i + childrenArray.length) % childrenArray.length;
      result.push({
        element: childrenArray[itemIdx],
        key: `item-${itemIdx}`
      });
    }
    return result;
  }, [childrenArray, index]);

  return (
    <div className={`flex flex-col items-center gap-3 w-full ${className}`}>
      <AnimatePresence initial={false}>
        {itemsToShow.map((item) => {
          return (
            <motion.div
              key={item.key}
              layout
              initial={{ scale: 0.85, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: -30 }}
              transition={{ type: "spring", stiffness: 220, damping: 22 }}
              className="w-full flex justify-center"
            >
              {item.element}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
});

AnimatedList.displayName = "AnimatedList";
