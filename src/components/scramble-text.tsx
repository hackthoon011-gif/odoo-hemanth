import React, { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ScrambleTextProps {
  children: string;
  duration?: number;
  revealStagger?: number;
  trigger?: "hover" | "mount" | "manual";
  active?: boolean;
  className?: string;
  as?: "span" | "div";
}

/**
 * Static text wrapper. Previously this scrambled characters on hover, which
 * made every heading/label flicker. Headings, stats and metadata now render
 * as plain, stable text. The transforming-letter effect lives only on
 * <ScrambleButton /> to convey interaction.
 */
export function ScrambleText({ children, className, as: Tag = "span" }: ScrambleTextProps) {
  return <Tag className={cn("scramble-text", className)}>{children}</Tag>;
}

/** Pass-through surface kept for backwards compatibility. */
export function ScrambleSurface({
  children,
  className,
  as = "span",
}: {
  children: ReactNode;
  className?: string;
  as?: "span" | "div" | "li" | "button";
}) {
  const Tag = as as unknown as React.ElementType;
  return <Tag className={className}>{children}</Tag>;
}
