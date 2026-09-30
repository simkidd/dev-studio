"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useLogin, useRegister } from "@/hooks";
import { ILoginCredentials, IRegisterCredentials } from "@/interfaces";
import { Terminal, Lock, Mail, Loader2, ArrowRight, User, Globe, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function LoginView() {
  const [mode, setMode] = useState<"login" | "register">("login");

  const loginMutation = useLogin();
  const registerMutation = useRegister();

  const {
    register: registerForm,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm<ILoginCredentials>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    register: registerNewUserForm,
    handleSubmit: handleRegisterSubmit,
    formState: { errors: regErrors },
  } = useForm<IRegisterCredentials>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      desiredSlug: "",
    },
  });

  const onLoginSubmit = (data: ILoginCredentials) => {
    loginMutation.mutate(data);
  };

  const onRegisterSubmit = (data: IRegisterCredentials) => {
    registerMutation.mutate(data);
  };

  return (
    <div className="min-h-dvh bg-background flex flex-col justify-center items-center px-4 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[360px] bg-primary/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="inline-flex w-12 h-12 rounded-2xl bg-linear-to-tr from-primary to-primary/40 items-center justify-center text-primary-foreground shadow-lg shadow-primary/20 mb-3 font-mono font-bold text-lg">
            P
          </div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">
            DevPortfolio Platform
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            {mode === "login"
              ? "Sign in to manage your portfolio, case studies, and inquiries"
              : "Create a free developer account to launch your portfolio"}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex p-1 bg-muted rounded-xl mb-4 border border-border">
          <button
            type="button"
            onClick={() => setMode("login")}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
              mode === "login"
                ? "bg-card text-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setMode("register")}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
              mode === "register"
                ? "bg-card text-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Card */}
        <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-2xl">
          {mode === "login" ? (
            /* ───────── LOGIN FORM ───────── */
            <form onSubmit={handleLoginSubmit(onLoginSubmit)} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-foreground mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none z-10" />
                  <Input
                    type="email"
                    {...registerForm("email", { required: "Email is required" })}
                    placeholder="admin@portfolio.dev"
                    className="pl-9 text-xs h-10"
                  />
                </div>
                {loginErrors.email && (
                  <span className="text-[10px] text-destructive mt-1 block">
                    {loginErrors.email.message}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none z-10" />
                  <Input
                    type="password"
                    {...registerForm("password", {
                      required: "Password is required",
                    })}
                    placeholder="••••••••"
                    className="pl-9 text-xs h-10"
                  />
                </div>
                {loginErrors.password && (
                  <span className="text-[10px] text-destructive mt-1 block">
                    {loginErrors.password.message}
                  </span>
                )}
              </div>

              <Button
                type="submit"
                disabled={loginMutation.isPending}
                className="w-full mt-2 text-xs font-medium h-10 shadow-lg shadow-primary/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                {loginMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Authenticating...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In to Dashboard</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </Button>
            </form>
          ) : (
            /* ───────── REGISTER FORM ───────── */
            <form onSubmit={handleRegisterSubmit(onRegisterSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5">
                    First Name *
                  </label>
                  <Input
                    type="text"
                    {...registerNewUserForm("firstName", { required: "First name is required" })}
                    placeholder="David"
                    className="text-xs h-10"
                  />
                  {regErrors.firstName && (
                    <span className="text-[10px] text-destructive mt-1 block">
                      {regErrors.firstName.message}
                    </span>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5">
                    Last Name *
                  </label>
                  <Input
                    type="text"
                    {...registerNewUserForm("lastName", { required: "Last name is required" })}
                    placeholder="Okafor"
                    className="text-xs h-10"
                  />
                  {regErrors.lastName && (
                    <span className="text-[10px] text-destructive mt-1 block">
                      {regErrors.lastName.message}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground mb-1.5">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none z-10" />
                  <Input
                    type="email"
                    {...registerNewUserForm("email", { required: "Email is required" })}
                    placeholder="david@example.com"
                    className="pl-9 text-xs h-10"
                  />
                </div>
                {regErrors.email && (
                  <span className="text-[10px] text-destructive mt-1 block">
                    {regErrors.email.message}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground mb-1.5">
                  Password * (min 6 chars)
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none z-10" />
                  <Input
                    type="password"
                    {...registerNewUserForm("password", {
                      required: "Password is required",
                      minLength: { value: 6, message: "Min 6 characters" },
                    })}
                    placeholder="••••••••"
                    className="pl-9 text-xs h-10"
                  />
                </div>
                {regErrors.password && (
                  <span className="text-[10px] text-destructive mt-1 block">
                    {regErrors.password.message}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground mb-1.5">
                  Desired URL Slug (optional)
                </label>
                <div className="relative">
                  <Globe className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none z-10" />
                  <Input
                    type="text"
                    {...registerNewUserForm("desiredSlug")}
                    placeholder="david-okafor"
                    className="pl-9 text-xs h-10 font-mono"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={registerMutation.isPending}
                className="w-full mt-2 text-xs font-medium h-10 shadow-lg shadow-primary/20 flex items-center justify-center gap-2 cursor-pointer bg-primary text-primary-foreground"
              >
                {registerMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <>
                    <span>Register & Setup Portfolio</span>
                    <Sparkles className="w-3.5 h-3.5" />
                  </>
                )}
              </Button>
            </form>
          )}

          {/* Seeded credentials helper hint */}
          <div className="mt-6 pt-4 border-t border-border text-center space-y-1.5">
            <p className="text-[11px] text-muted-foreground">
              Demo Superadmin: <code className="text-foreground font-mono">admin@portfolio.dev</code> / <code className="text-foreground font-mono">Admin@2026!</code>
            </p>
            <p className="text-[11px] text-muted-foreground">
              Demo Developer: <code className="text-foreground font-mono">elena@devstudio.us</code> / <code className="text-foreground font-mono">Dev@2026!</code>
            </p>
          </div>
        </div>

        {/* Back to marketing link */}
        <div className="text-center mt-6">
          <Link href="/" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            &larr; Back to DevPortfolio Platform
          </Link>
        </div>
      </div>
    </div>
  );
}
