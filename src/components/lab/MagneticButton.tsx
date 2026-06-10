"use client";

import React from "react";
import { motion } from "framer-motion";
import { useMagnetic } from "@/lib/lab/core/use-magnetic";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  range?: number;
  strength?: number;
}

export default function MagneticButton({
  children,
  className = "",
  onClick,
  range = 70,
  strength = 0.3,
}: MagneticButtonProps) {
  const { ref, x, y } = useMagnetic(range, strength);

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      className="inline-block"
    >
      <motion.button
        className={`relative select-none ${className}`}
        onClick={onClick}
        whileTap={{ scale: 0.97 }}
      >
        {children}
      </motion.button>
    </motion.div>
  );
}
