"use client";

import React, { useEffect, useState, useRef } from "react";
import { Play, Pause, SkipForward, Volume2 } from "lucide-react";
import { AudioSignalManager } from "./AudioSignalManager";
import MagneticButton from "./MagneticButton";
import { useLabPerformance } from "@/context/LabPerformanceContext";

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackName, setTrackName] = useState("");
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(224);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { reduceMotion } = useLabPerformance();

  // Listen to AudioSignalManager updates to sync React state
  useEffect(() => {
    setIsPlaying(AudioSignalManager.isPlaying);
    setTrackName(AudioSignalManager.trackName);
    setDuration(AudioSignalManager.duration);
    setTime(AudioSignalManager.time);

    const unsubscribe = AudioSignalManager.addListener((event) => {
      if (event === "playStateChange") {
        setIsPlaying(AudioSignalManager.isPlaying);
      } else if (event === "trackChange") {
        setTrackName(AudioSignalManager.trackName);
        setDuration(AudioSignalManager.duration);
        setTime(AudioSignalManager.time);
      } else if (event === "timeUpdate") {
        setTime(AudioSignalManager.time);
      }
    });

    return unsubscribe;
  }, []);

  // Format seconds to MM:SS
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleTogglePlay = () => {
    AudioSignalManager.isPlaying = !AudioSignalManager.isPlaying;
  };

  const handleNextTrack = () => {
    const tracks = ["VOID WALK", "GLASS ECHOES", "NEON BREATH", "SILENT SIGNAL"];
    const idx = tracks.indexOf(AudioSignalManager.trackName);
    const nextIdx = (idx + 1) % tracks.length;
    AudioSignalManager.selectTrack(tracks[nextIdx]);
  };

  // Render player mini-spectra visualizer
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frameId: number;
    const numBars = 16;
    const barWidth = 2;
    const gap = 2;
    
    canvas.width = numBars * (barWidth + gap) - gap;
    canvas.height = 24;

    const bars = Array.from({ length: numBars }, (_, i) => ({
      height: 2,
      targetHeight: 2,
      noiseOffset: i * 2.5
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const amp = AudioSignalManager.amplitude;
      const active = AudioSignalManager.isPlaying;

      bars.forEach((b, idx) => {
        if (active) {
          // Sync with frequencies array
          const freqIndex = Math.floor((idx / numBars) * 32);
          const val = AudioSignalManager.frequencies[freqIndex] ?? 0.1;
          b.targetHeight = 2 + val * (canvas.height - 4);
        } else {
          // Slow breathing ambient motion when paused
          b.targetHeight = 2 + Math.sin(Date.now() * 0.003 + b.noiseOffset) * 2;
        }

        // Apply smooth interpolation
        b.height += (b.targetHeight - b.height) * 0.22;

        // Draw spectral bar with a violet-to-cyan gradient look
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, "#06B6D4"); // Cyan top
        gradient.addColorStop(1, "#8B5CF6"); // Violet bottom

        ctx.fillStyle = gradient;
        ctx.fillRect(
          idx * (barWidth + gap), 
          canvas.height - b.height, 
          barWidth, 
          b.height
        );
      });

      frameId = requestAnimationFrame(draw);
    };

    draw();

    return () => cancelAnimationFrame(frameId);
  }, []);

  const progressPercent = (time / duration) * 100;

  return (
    <div className="fixed bottom-0 left-0 w-full z-40 px-6 pb-6 select-none">
      <div className="max-w-[1000px] mx-auto relative rounded-2xl border border-white/[0.06] bg-[#0B0B10]/75 backdrop-blur-xl shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.8)] px-6 py-4 flex items-center justify-between gap-6 overflow-hidden">
        
        {/* Spotlight top border line */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-linear-to-r from-transparent via-cyan-500/20 to-transparent" />
        
        {/* Dynamic ambient backglow */}
        <div className="absolute inset-0 bg-radial from-cyan-500/2 via-transparent to-transparent pointer-events-none -z-10" />

        {/* Left Side: Track Details + Mini visualizer */}
        <div className="flex items-center gap-4 min-w-[150px] sm:min-w-[200px]">
          <div className="hidden xs:flex w-10 h-10 rounded-lg bg-neutral-900 border border-white/[0.05] items-center justify-center shrink-0">
            <canvas ref={canvasRef} className="block w-[62px] h-[24px]" />
          </div>
          <div className="flex flex-col gap-0.5 overflow-hidden">
            <span className="font-mono text-[8px] text-cyan-400 tracking-wider font-semibold uppercase">NOW PLAYING</span>
            <span className="font-sans font-bold text-[14px] text-white tracking-tight truncate">{trackName}</span>
            <span className="font-mono text-[9px] text-neutral-500 truncate">NOIR SIGNAL</span>
          </div>
        </div>

        {/* Center: Playback Controls */}
        <div className="flex items-center gap-4">
          <MagneticButton
            range={60}
            strength={0.4}
            onClick={handleTogglePlay}
            className="w-12 h-12 rounded-full bg-white hover:bg-neutral-100 text-[#0B0B10] flex items-center justify-center hover:scale-[1.03]"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 fill-current" />
            ) : (
              <Play className="w-5 h-5 fill-current ml-0.5" />
            )}
          </MagneticButton>

          <button 
            onClick={handleNextTrack}
            className="w-9 h-9 rounded-full bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.08] hover:border-white/[0.15] text-neutral-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Next Track"
          >
            <SkipForward className="w-4 h-4 fill-current" />
          </button>
        </div>

        {/* Right Side: Progress Bar + Time */}
        <div className="hidden md:flex flex-1 max-w-xs flex-col gap-1.5 items-end justify-center">
          {/* Progress Bar Container */}
          <div className="w-full h-1 bg-white/[0.06] rounded-full overflow-hidden relative cursor-pointer group">
            <div 
              className="absolute left-0 top-0 h-full bg-linear-to-r from-violet-500 to-cyan-400 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
            {/* Glow tip */}
            {!reduceMotion && (
              <div 
                className="absolute w-2 h-2 rounded-full bg-cyan-300 -top-0.5 blur-xs transition-all duration-300"
                style={{ left: `calc(${progressPercent}% - 4px)` }}
              />
            )}
          </div>
          
          <div className="flex gap-2 font-mono text-[9px] text-neutral-500 select-none">
            <span>{formatTime(time)}</span>
            <span>/</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Mobile Volume Icon/Fallback */}
        <div className="flex md:hidden items-center gap-1.5 font-mono text-[10px] text-neutral-500 shrink-0">
          <span>{formatTime(time)}</span>
        </div>

      </div>
    </div>
  );
}
