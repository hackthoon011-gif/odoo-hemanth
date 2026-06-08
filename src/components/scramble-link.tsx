import { Link, type LinkProps } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { ScrambleText } from "./scramble-text";
import type { ReactNode } from "react";

interface Props extends Omit<LinkProps, "children"> {
  children: string;
  icon?: ReactNode;
  className?: string;
}

export function ScrambleLink({ children, icon, className, ...rest }: Props) {
  return (
    <Link
      {...(rest as LinkProps)}
      data-scramble-target
      className={cn(
        "inline-flex items-center gap-2 text-foreground/80 hover:text-foreground transition-colors",
        className,
      )}
    >
      {icon ? <span className="opacity-70">{icon}</span> : null}
      <ScrambleText duration={700}>{children}</ScrambleText>
    </Link>
  );

}
