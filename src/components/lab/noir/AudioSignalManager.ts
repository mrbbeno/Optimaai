// Simulated Audio Signal Manager for Noir Signal
// Allows high-performance 60fps animation loops to query synced audio states without triggering React re-renders

export class AudioSignalManager {
  private static isPlayingState = false;
  public static amplitude = 0.08; // Base ambient amplitude
  public static frequencies: number[] = Array.from({ length: 32 }, () => 0.05);
  public static time = 0;
  public static duration = 224; // 3m 44s
  public static trackName = "VOID WALK";

  // Event listeners for metadata / play-state changes
  private static listeners = new Set<(event: string) => void>();
  private static frameId: number | null = null;
  private static lastTick = Date.now();

  static get isPlaying() {
    return this.isPlayingState;
  }

  static set isPlaying(val: boolean) {
    if (this.isPlayingState !== val) {
      this.isPlayingState = val;
      this.notifyListeners("playStateChange");
      if (val) {
        this.startSimulating();
      } else {
        this.stopSimulating();
      }
    }
  }

  static selectTrack(name: string) {
    if (this.trackName !== name) {
      this.trackName = name;
      this.time = 0;
      this.notifyListeners("trackChange");
    }
  }

  static addListener(callback: (event: string) => void) {
    this.listeners.add(callback);
    return () => {
      this.listeners.delete(callback);
    };
  }

  private static notifyListeners(event: string) {
    this.listeners.forEach((cb) => cb(event));
  }

  private static startSimulating() {
    if (this.frameId !== null) return;
    this.lastTick = Date.now();
    const loop = () => {
      this.updateSimulation();
      this.frameId = requestAnimationFrame(loop);
    };
    this.frameId = requestAnimationFrame(loop);
  }

  private static stopSimulating() {
    if (this.frameId !== null) {
      cancelAnimationFrame(this.frameId);
      this.frameId = null;
    }
    // Damp down to ambient state
    const damp = () => {
      let isSettled = true;
      this.amplitude += (0.05 - this.amplitude) * 0.15;
      if (Math.abs(this.amplitude - 0.05) > 0.005) isSettled = false;

      for (let i = 0; i < this.frequencies.length; i++) {
        const target = 0.02 + Math.sin(Date.now() * 0.001 + i) * 0.01;
        this.frequencies[i] += (target - this.frequencies[i]) * 0.1;
        if (Math.abs(this.frequencies[i] - target) > 0.005) isSettled = false;
      }

      if (!isSettled && !this.isPlayingState) {
        requestAnimationFrame(damp);
      }
    };
    requestAnimationFrame(damp);
  }

  private static updateSimulation() {
    const now = Date.now();
    const delta = (now - this.lastTick) / 1000;
    this.lastTick = now;

    if (this.isPlayingState) {
      // Advance play time
      this.time += delta;
      if (this.time >= this.duration) {
        this.time = 0;
      }
      this.notifyListeners("timeUpdate");

      // Generate organic wave pulses resembling deep ambient techno beats
      const t = now * 0.001;
      
      // Heartbeat pulse at ~122 BPM (roughly 2.03 Hz)
      const beatProgress = (t * 2.03) % 1;
      const beatAmplitude = Math.pow(1 - beatProgress, 4.0); // sharp beat drop decaying quickly

      // Sub-bass rumble
      const bassFreq = 0.3 * Math.sin(t * 8) + 0.1 * Math.sin(t * 22);

      // Total amplitude mix
      this.amplitude = 0.25 + beatAmplitude * 0.55 + Math.abs(bassFreq) * 0.15;
      this.amplitude = Math.max(0.1, Math.min(1.0, this.amplitude));

      // Update frequency bands
      for (let i = 0; i < this.frequencies.length; i++) {
        // Bass bands (indices 0-5) react heavily to the beat
        if (i < 6) {
          this.frequencies[i] = 0.3 + beatAmplitude * 0.6 + Math.sin(t * 12 + i) * 0.1;
        } 
        // Mid bands (indices 6-20) have melodic, swelling movements
        else if (i < 21) {
          const swell = 0.2 + Math.sin(t * 1.5 + i * 0.4) * 0.18 + Math.cos(t * 3.7 - i * 0.1) * 0.08;
          this.frequencies[i] = swell * (1.0 + this.amplitude * 0.2);
        } 
        // Treble bands (indices 21-31) have sparkling, high-frequency transients
        else {
          const noise = Math.random() * 0.15 + 0.05;
          const shimmer = Math.sin(t * 25 + i * 2.1) * 0.06;
          this.frequencies[i] = (noise + Math.abs(shimmer)) * (0.8 + this.amplitude * 0.3);
        }
        this.frequencies[i] = Math.max(0.01, Math.min(1.0, this.frequencies[i]));
      }
    }
  }
}
