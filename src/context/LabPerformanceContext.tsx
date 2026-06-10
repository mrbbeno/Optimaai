"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type MotionMode = "high" | "low";

interface LabPerformanceContextType {
  motionMode: MotionMode;
  canvasEnabled: boolean;
  reduceMotion: boolean;
  setMotionMode: (mode: MotionMode) => void;
  setCanvasEnabled: (enabled: boolean) => void;
  setReduceMotion: (reduce: boolean) => void;
}

const LabPerformanceContext = createContext<LabPerformanceContextType | undefined>(undefined);

export function LabPerformanceProvider({ children }: { children: React.ReactNode }) {
  const [motionMode, setMotionModeState] = useState<MotionMode>("high");
  const [canvasEnabled, setCanvasEnabledState] = useState<boolean>(true);
  const [reduceMotion, setReduceMotionState] = useState<boolean>(false);

  useEffect(() => {
    // Load preferences from localStorage on mount
    const savedMotionMode = localStorage.getItem("optima-lab-motion");
    const savedCanvas = localStorage.getItem("optima-lab-canvas");
    const savedReduce = localStorage.getItem("optima-lab-reduce-motion");

    setTimeout(() => {
      if (savedMotionMode === "high" || savedMotionMode === "low") {
        setMotionModeState(savedMotionMode);
      }
      if (savedCanvas !== null) {
        setCanvasEnabledState(savedCanvas === "true");
      }
      if (savedReduce !== null) {
        setReduceMotionState(savedReduce === "true");
      } else {
        // Check system preference
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        if (mediaQuery.matches) {
          setReduceMotionState(true);
        }
      }
    }, 0);
  }, []);

  const setMotionMode = (mode: MotionMode) => {
    setMotionModeState(mode);
    localStorage.setItem("optima-lab-motion", mode);
  };

  const setCanvasEnabled = (enabled: boolean) => {
    setCanvasEnabledState(enabled);
    localStorage.setItem("optima-lab-canvas", String(enabled));
  };

  const setReduceMotion = (reduce: boolean) => {
    setReduceMotionState(reduce);
    localStorage.setItem("optima-lab-reduce-motion", String(reduce));
  };

  return (
    <LabPerformanceContext.Provider
      value={{
        motionMode,
        canvasEnabled,
        reduceMotion,
        setMotionMode,
        setCanvasEnabled,
        setReduceMotion,
      }}
    >
      {children}
    </LabPerformanceContext.Provider>
  );
}

export function useLabPerformance() {
  const context = useContext(LabPerformanceContext);
  if (!context) {
    throw new Error("useLabPerformance must be used within a LabPerformanceProvider");
  }
  return context;
}
