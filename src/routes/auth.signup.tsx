import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ScrambleText } from "@/components/scramble-text";
import { ScrambleButton } from "@/components/scramble-button";
import { type Role, ROLE_LABEL } from "@/lib/auth";
import { Divider, Field } from "./auth.login";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/auth/signup")({ component: Signup });

const ROLES: Role[] = ["admin", "procurement", "vendor", "manager"];

// Auth disabled — go straight to the dashboard.
function Signup() {
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [role, setRole] = useState<Role>("procurement");

  function go(e?: React.FormEvent) { e?.preventDefault(); nav({ to: "/app/dashboard" }); }

  return (
    <div className="space-y-8">
      <div data-scramble-target className="space-y-2">
        <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground font-mono">
          <ScrambleText>Create Account</ScrambleText>
        </div>
        <h1 className="text-3xl font-medium tracking-tight">
          <ScrambleText duration={700}>Spin up a workspace.</ScrambleText>
        </h1>
        <p className="text-sm text-muted-foreground">Choose a role to tailor your navigation and permissions.</p>
      </div>

      <form className="space-y-4" onSubmit={go}>
        <Field tone="orange" label="Full Name" id="name"><input id="name" className="auth-input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Doe" /></Field>
        <Field tone="green" label="Email" id="email"><input id="email" type="email" className="auth-input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" /></Field>
        <div className="grid grid-cols-2 gap-3">
          <Field tone="red" label="Password" id="pw"><input id="pw" type="password" className="auth-input" value={pw} onChange={(e) => setPw(e.target.value)} placeholder="••••••••" /></Field>
          <Field tone="orange" label="Confirm" id="pw2"><input id="pw2" type="password" className="auth-input" value={pw2} onChange={(e) => setPw2(e.target.value)} placeholder="••••••••" /></Field>
        </div>

        <div>
          <div className="text-[11px] uppercase tracking-[0.18em] text-[oklch(0.72_0.17_152)] font-mono mb-2">Role</div>
          <div className="grid grid-cols-2 gap-2">
            {ROLES.map((r) => (
              <button
                key={r}
                type="button"
                data-scramble-target
                onClick={() => setRole(r)}
                className={cn(
                  "h-14 px-4 rounded-md border text-left transition-colors",
                  role === r
                    ? "border-white bg-white/[0.07] text-foreground"
                    : "border-border bg-white/[0.02] text-foreground/70 hover:border-white/30 hover:text-foreground",
                )}
              >
                <div className="text-[13px] font-medium">
                  <ScrambleText duration={450}>{ROLE_LABEL[r]}</ScrambleText>
                </div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-mono mt-0.5">{r}</div>
              </button>
            ))}
          </div>
        </div>

        <ScrambleButton type="submit" variant="primary" size="lg" className="w-full mt-2">
          Create Account
        </ScrambleButton>
      </form>

      <Divider>or sign up with</Divider>

      <ScrambleButton variant="outline" className="w-full" onClick={() => go()}>
        Continue with Google
      </ScrambleButton>

      <p className="text-center text-[12px] text-muted-foreground">
        Already have an account?{" "}
        <Link to="/auth/login" data-scramble-target className="text-foreground hover:underline underline-offset-4">
          <ScrambleText>Sign In</ScrambleText>
        </Link>
      </p>
    </div>
  );
}
