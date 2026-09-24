"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { useLogin } from "@/hooks";
import { ILoginCredentials } from "@/interfaces";
import { Terminal, Lock, Mail, Loader2, ArrowRight } from "lucide-react";

export function LoginView() {
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginCredentials>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: ILoginCredentials) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center px-4 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[320px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 items-center justify-center text-white shadow-xl shadow-indigo-500/25 mb-4">
            <Terminal className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold text-foreground tracking-tight">
            Developer Portfolio CMS
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Enter your credentials to access the admin studio
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-card border border-border rounded-xl p-6 sm:p-8 shadow-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-foreground mb-1.5">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  placeholder="admin@portfolio.dev"
                  className="w-full bg-background border border-border rounded-lg pl-9 pr-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                />
              </div>
              {errors.email && (
                <span className="text-[10px] text-destructive mt-1 block">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-foreground mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="password"
                  {...register("password", { required: "Password is required" })}
                  placeholder="••••••••"
                  className="w-full bg-background border border-border rounded-lg pl-9 pr-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                />
              </div>
              {errors.password && (
                <span className="text-[10px] text-destructive mt-1 block">
                  {errors.password.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              disabled={loginMutation.isPending}
              className="w-full mt-2 bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2.5 px-4 rounded-lg text-xs transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {loginMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Sign in to Studio</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-border text-center">
            <p className="text-[11px] text-muted-foreground">
              Default seeded credentials: <br />
              <code className="text-foreground font-mono">admin@portfolio.dev</code> / <code className="text-foreground font-mono">Admin@2026!</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
