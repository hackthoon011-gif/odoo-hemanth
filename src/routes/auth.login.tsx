import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ScrambleText } from "@/components/scramble-text";
import { ScrambleButton } from "@/components/scramble-button";

export const Route = createFileRoute("/auth/login")({ component: Login });

// Auth is disabled. Any sign-in action just routes to the dashboard.
function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function go(e?: React.FormEvent) {
    e?.preventDefault();
    nav({ to: "/app/dashboard" });
  }

  return (
    <div className="space-y-8">
      <div data-scramble-target className="space-y-2">
        <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground font-mono">
          <ScrambleText>Sign In</ScrambleText>
        </div>
        <h1 className="text-3xl font-medium tracking-tight">
          <ScrambleText duration={700}>Welcome back.</ScrambleText>
        </h1>
        <p className="text-sm text-muted-foreground">Continue to your procurement workspace.</p>
      </div>

      <form className="space-y-4" onSubmit={go}>
        <Field tone="orange" label="Email" id="email">
          <input
            id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            className="auth-input"
          />
        </Field>
        <Field tone="green" label="Password" id="password" trailing={
          <Link to="/auth/forgot" data-scramble-target className="text-[11px] text-muted-foreground hover:text-foreground">
            <ScrambleText>Forgot?</ScrambleText>
          </Link>
        }>
          <input
            id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••••"
            className="auth-input"
          />
        </Field>

        <ScrambleButton type="submit" variant="primary" size="lg" className="w-full mt-2">
          Sign In
        </ScrambleButton>
      </form>

      <Divider>or continue with</Divider>

      <ScrambleButton variant="outline" className="w-full" onClick={() => go()}>
        Continue with Google
      </ScrambleButton>

      <p className="text-center text-[12px] text-muted-foreground">
        Don't have an account?{" "}
        <Link to="/auth/signup" data-scramble-target className="text-foreground hover:underline underline-offset-4">
          <ScrambleText>Create one</ScrambleText>
        </Link>
      </p>
    </div>
  );
}

export type FieldTone = "orange" | "green" | "red" | "muted";
const TONE_CLASS: Record<FieldTone, string> = {
  orange: "text-brand",
  green: "text-[oklch(0.72_0.17_152)]",
  red: "text-ember",
  muted: "text-muted-foreground",
};

export function Field({ label, id, children, trailing, tone = "muted" }: { label: string; id: string; children: React.ReactNode; trailing?: React.ReactNode; tone?: FieldTone }) {
  return (
    <label htmlFor={id} className="block">
      <div className="flex items-center justify-between mb-1.5">
        <span className={`text-[11px] uppercase tracking-[0.18em] font-mono ${TONE_CLASS[tone]}`}>{label}</span>
        {trailing}
      </div>
      {children}
    </label>
  );
}

export function Divider({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 text-[11px] text-muted-foreground uppercase tracking-[0.2em] font-mono">
      <span className="h-px flex-1 bg-border" />
      {children}
      <span className="h-px flex-1 bg-border" />
    </div>
  );
}
