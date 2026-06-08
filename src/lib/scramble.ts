// Blackbox-style text scramble engine.
// Each character is randomly replaced with a glyph from CHARSET until it
// "resolves" back to the original within 300–800ms.

export const SCRAMBLE_CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";

export function randomChar() {
  return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
}

export interface ScrambleOptions {
  /** Total animation duration in ms. */
  duration?: number;
  /** How long each character stays scrambled before resolving (0..1 of duration). */
  revealStagger?: number;
}

/**
 * Runs the scramble animation, invoking `onFrame` with the current
 * displayed text. Returns a cancel function.
 */
export function runScramble(
  target: string,
  onFrame: (text: string) => void,
  opts: ScrambleOptions = {},
) {
  const duration = opts.duration ?? 700;
  const stagger = opts.revealStagger ?? 0.6;
  const start = performance.now();
  let raf = 0;
  let cancelled = false;

  // Per-character reveal threshold (0..1)
  const reveals = Array.from(target, (_, i) => {
    if (target[i] === " ") return 0;
    return (i / Math.max(target.length - 1, 1)) * stagger + Math.random() * (1 - stagger);
  });

  const tick = (now: number) => {
    if (cancelled) return;
    const t = Math.min((now - start) / duration, 1);
    let out = "";
    for (let i = 0; i < target.length; i++) {
      const ch = target[i];
      if (ch === " " || ch === "\n") { out += ch; continue; }
      if (t >= reveals[i]) out += ch;
      else out += randomChar();
    }
    onFrame(out);
    if (t < 1) raf = requestAnimationFrame(tick);
    else onFrame(target);
  };

  raf = requestAnimationFrame(tick);
  return () => {
    cancelled = true;
    cancelAnimationFrame(raf);
    onFrame(target);
  };
}
