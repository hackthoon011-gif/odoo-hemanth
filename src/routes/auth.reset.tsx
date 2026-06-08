import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ScrambleText } from "@/components/scramble-text";
import { ScrambleButton } from "@/components/scramble-button";
import { Field } from "./auth.login";

export const Route = createFileRoute("/auth/reset")({ component: Reset });

function Reset() {
  const nav = useNavigate();
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");

  function handleSubmit(e: React.FormEvent) { e.preventDefault(); nav({ to: "/app/dashboard" }); }

  return (
    <div className="space-y-8">
      <div data-scramble-target className="space-y-2">
        <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground font-mono">
          <ScrambleText>Reset Password</ScrambleText>
        </div>
        <h1 className="text-3xl font-medium tracking-tight">
          <ScrambleText duration={700}>Choose a new password.</ScrambleText>
        </h1>
        <p className="text-sm text-muted-foreground">Use at least 10 characters with a mix of letters, numbers and symbols.</p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <Field label="New Password" id="pw"><input id="pw" type="password" className="auth-input" value={pw} onChange={(e) => setPw(e.target.value)} /></Field>
        <Field label="Confirm Password" id="pw2"><input id="pw2" type="password" className="auth-input" value={pw2} onChange={(e) => setPw2(e.target.value)} /></Field>
        <ScrambleButton type="submit" variant="primary" size="lg" className="w-full">
          Update Password
        </ScrambleButton>
      </form>

      <Link to="/auth/login" data-scramble-target className="text-[12px] text-muted-foreground hover:text-foreground">
        <ScrambleText>← Back to sign in</ScrambleText>
      </Link>
    </div>
  );
}
