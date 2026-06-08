import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ScrambleText } from "@/components/scramble-text";
import { ScrambleButton } from "@/components/scramble-button";
import { Field } from "./auth.login";

export const Route = createFileRoute("/auth/forgot")({ component: Forgot });

function Forgot() {
  const nav = useNavigate();
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
    nav({ to: "/app/dashboard" });
  }

  return (
    <div className="space-y-8">
      <div data-scramble-target className="space-y-2">
        <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground font-mono">
          <ScrambleText>Forgot Password</ScrambleText>
        </div>
        <h1 className="text-3xl font-medium tracking-tight">
          <ScrambleText duration={700}>Reset your password.</ScrambleText>
        </h1>
        <p className="text-sm text-muted-foreground">We'll send a one-time recovery link to your email.</p>
      </div>

      {sent ? (
        <div data-scramble-target className="rounded-lg border border-border bg-card/40 p-5 space-y-2">
          <div className="text-[13px] font-medium">
            <ScrambleText>Recovery link sent.</ScrambleText>
          </div>
          <p className="text-xs text-muted-foreground">Check your inbox for a message with a reset link.</p>
        </div>
      ) : (
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Field label="Email" id="email">
            <input id="email" type="email" className="auth-input" placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          </Field>
          <ScrambleButton type="submit" variant="primary" size="lg" className="w-full">
            Send Recovery Link
          </ScrambleButton>
        </form>
      )}

      <div className="flex items-center justify-between text-[12px] text-muted-foreground">
        <Link to="/auth/login" data-scramble-target className="hover:text-foreground"><ScrambleText>← Back to sign in</ScrambleText></Link>
        <Link to="/auth/signup" data-scramble-target className="hover:text-foreground"><ScrambleText>Create account</ScrambleText></Link>
      </div>
    </div>
  );
}
