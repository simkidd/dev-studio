"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useRegister } from "@/hooks";
import { IRegisterCredentials } from "@/interfaces";
import { Terminal, Lock, Mail, User, Loader2, ArrowRight, Eye, EyeOff, CheckCircle2, Sparkles } from "lucide-react";
import Link from "next/link";

export function RegisterView() {
  const [showPassword, setShowPassword] = useState(false);
  const registerMutation = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterCredentials>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: IRegisterCredentials) => {
    registerMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      {/* Top Navigation Bar */}
      <header className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-xl bg-foreground text-background flex items-center justify-center font-mono text-xs font-bold shadow-xs group-hover:scale-105 transition-transform">
            <Terminal className="w-4 h-4" />
          </div>
          <span className="font-bold tracking-tight text-sm text-foreground">
            DevPortfolio
          </span>
        </Link>

        <div className="flex items-center gap-3 text-xs">
          <span className="text-muted-foreground hidden sm:inline">Already have an account?</span>
          <Link
            href="/login"
            className="px-3.5 py-1.5 rounded-full bg-muted hover:bg-muted/80 text-foreground font-medium transition-colors"
          >
            Sign In
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-5xl mx-auto w-full px-4 sm:px-6 py-8 my-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Editorial Value Pillar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="hidden lg:flex lg:col-span-6 flex-col justify-between space-y-8 pr-6"
        >
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Launch in 2 minutes</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground leading-tight">
              A developer portfolio that actually lands interviews.
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Create your account in seconds. Configure your custom slug, pick from hand-crafted themes, and import your GitHub repositories right in the onboarding flow.
            </p>
          </div>

          {/* Value Checklist */}
          <div className="space-y-3 pt-4 border-t border-border/60">
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Free forever tier with full theme customizer</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Dedicated portfolio URL (e.g. devportfolio.app/yourname)</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Interactive project showcases, experience timeline & skills</span>
            </div>
          </div>

          {/* User Review */}
          <div className="p-4 rounded-2xl bg-card border border-border space-y-2">
            <p className="text-xs text-muted-foreground italic leading-relaxed">
              &ldquo;I set up my entire portfolio in under 10 minutes and got my first direct recruiter outreach that same week.&rdquo;
            </p>
            <div className="flex items-center gap-2 text-[11px] font-mono text-foreground font-semibold">
              <span>Marcus Vance</span>
              <span className="text-muted-foreground">&bull;</span>
              <span className="text-primary">Full-Stack Developer</span>
            </div>
          </div>
        </motion.div>

        {/* Right Registration Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 w-full max-w-md mx-auto"
        >
          <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="space-y-1.5">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                Create your account
              </h2>
              <p className="text-xs text-muted-foreground">
                No credit card required. Get started with your developer portfolio.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* First & Last Name */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground block">
                    First Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      {...register("firstName", { required: "First name is required" })}
                      placeholder="Jane"
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-background border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-xs"
                    />
                  </div>
                  {errors.firstName && (
                    <span className="text-[11px] text-destructive block font-medium">
                      {errors.firstName.message}
                    </span>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground block">
                    Last Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      {...register("lastName", { required: "Last name is required" })}
                      placeholder="Doe"
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-background border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-xs"
                    />
                  </div>
                  {errors.lastName && (
                    <span className="text-[11px] text-destructive block font-medium">
                      {errors.lastName.message}
                    </span>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground block">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="email"
                    {...register("email", { required: "Email address is required" })}
                    placeholder="jane.doe@example.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-background border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-mono text-xs"
                  />
                </div>
                {errors.email && (
                  <span className="text-[11px] text-destructive block font-medium">
                    {errors.email.message}
                  </span>
                )}
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground block">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                    placeholder="Minimum 6 characters"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-background border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-mono text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && (
                  <span className="text-[11px] text-destructive block font-medium">
                    {errors.password.message}
                  </span>
                )}
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={registerMutation.isPending}
                className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider hover:opacity-95 shadow-md shadow-primary/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
              >
                {registerMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <>
                    <span>Create Account & Continue</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </motion.button>
            </form>

            <div className="pt-3 border-t border-border text-center">
              <p className="text-[11px] text-muted-foreground">
                By creating an account, you agree to our terms of service and privacy policy.
              </p>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-7xl mx-auto px-6 py-6 text-center text-xs text-muted-foreground font-mono">
        &copy; {new Date().getFullYear()} DevPortfolio Platform &bull; Built for Software Engineers
      </footer>
    </div>
  );
}
