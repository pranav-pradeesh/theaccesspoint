/*
 * Optional interface click sound, synthesised with the Web Audio API (no audio files).
 * Off by default; visitors turn it on with the header toggle, and the choice is saved.
 */
const KEY = "sound";
let ctx: AudioContext | null = null;

export function soundEnabled() {
  try {
    return localStorage.getItem(KEY) === "on";
  } catch {
    return false;
  }
}

export function setSoundEnabled(on: boolean) {
  try {
    localStorage.setItem(KEY, on ? "on" : "off");
  } catch {
    // Storage unavailable: the setting lasts for this page view only.
  }
}

/** A short, quiet tick. Must run inside a user gesture (browsers block audio otherwise). */
export function playClick() {
  try {
    ctx ??= new AudioContext();
    if (ctx.state === "suspended") void ctx.resume();
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(1400, t);
    osc.frequency.exponentialRampToValueAtTime(700, t + 0.04);
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(0.06, t + 0.004);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.06);
    osc.connect(gain).connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.07);
  } catch {
    // Web Audio unsupported: stay silent.
  }
}
