import { forwardRef, useRef, useState, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { runScramble } from "@/lib/scramble";

type Variant = "primary" | "secondary" | "ghost" | "outline" | "danger" | "brand";
type Size = "sm" | "md" | "lg";

interface ScrambleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  iconRight?: ReactNode;
  /** Optional override label; defaults to children when children is a string. */
  label?: string;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-white text-black hover:bg-white/90 border border-white hover:shadow-[0_0_0_3px_oklch(0.72_0.18_50/0.25)]",
  brand:
    "bg-brand text-black border border-brand hover:bg-brand/90 hover:shadow-[0_0_0_3px_oklch(0.72_0.18_50/0.25)]",
  secondary:
    "bg-white/[0.04] text-foreground border border-border hover:bg-white/[0.07] hover:border-brand/60",
  ghost:
    "bg-transparent text-foreground hover:bg-white/[0.05] hover:text-brand",
  outline:
    "bg-transparent text-foreground border border-border hover:border-brand hover:text-brand hover:bg-brand/[0.04]",
  danger:
    "bg-transparent text-destructive border border-destructive/40 hover:bg-destructive/10 hover:border-destructive",
};

const sizes: Record<Size, string> = {
  sm: "h-8 px-3 text-[12px]",
  md: "h-10 px-4 text-[13px]",
  lg: "h-12 px-6 text-[14px]",
};

export const ScrambleButton = forwardRef<HTMLButtonElement, ScrambleButtonProps>(
  ({ variant = "secondary", size = "md", className, icon, iconRight, label, children, onMouseEnter, onFocus, ...rest }, ref) => {
    const text = label ?? (typeof children === "string" ? children : "");
    const [display, setDisplay] = useState(text);
    const cancelRef = useRef<(() => void) | null>(null);

    const run = () => {
      if (!text) return;
      cancelRef.current?.();
      cancelRef.current = runScramble(text, setDisplay, { duration: 700 });
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-md font-medium tracking-tight",
          "transition-all duration-150 select-none whitespace-nowrap",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60",
          "disabled:opacity-40 disabled:pointer-events-none",
          variants[variant],
          sizes[size],
          className,
        )}
        onMouseEnter={(e) => { run(); onMouseEnter?.(e); }}
        onFocus={(e) => { run(); onFocus?.(e); }}
        {...rest}
      >
        {icon ? <span className="shrink-0 opacity-80">{icon}</span> : null}
        {text ? (
          <span className="scramble-text font-mono uppercase tracking-[0.08em]" style={{ fontVariantNumeric: "tabular-nums" }}>
            {Array.from(display).map((ch, i) => (
              <span
                key={i}
                style={{ display: "inline-block", width: "0.62em", textAlign: "center" }}
              >
                {ch === " " ? "\u00A0" : ch}
              </span>
            ))}
          </span>
        ) : children}
        {iconRight ? <span className="shrink-0 opacity-80">{iconRight}</span> : null}
      </button>
    );
  },
);
ScrambleButton.displayName = "ScrambleButton";
