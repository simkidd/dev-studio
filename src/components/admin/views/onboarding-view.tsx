"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser, useProfile, useUpdateProfile, usePortfolioSettings, useUpdatePortfolioSettings } from "@/hooks";
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Terminal,
  Palette,
  Globe,
  Rocket,
  Layers,
  Code2,
  Layout,
} from "lucide-react";
import { PortfolioTemplateId } from "@/interfaces";
import { toast } from "sonner";
import Link from "next/link";

export function OnboardingView() {
  const router = useRouter();
  const { data: user } = useUser();
  const { data: profile } = useProfile();
  const { mutateAsync: updateProfile } = useUpdateProfile();
  const { data: portfolio } = usePortfolioSettings();
  const { mutateAsync: updatePortfolio } = useUpdatePortfolioSettings();

  const [step, setStep] = useState(1);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [headline, setHeadline] = useState("Full-Stack Software Engineer");
  const [bio, setBio] = useState("Building high-impact web platforms, distributed backends, and sleek digital experiences.");
  const [location, setLocation] = useState("Remote / Worldwide");
  const [templateId, setTemplateId] = useState<PortfolioTemplateId>("classic-dev");
  const [slug, setSlug] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
    }
    if (profile) {
      if (profile.headline) setHeadline(profile.headline);
      if (profile.bio) setBio(profile.bio);
      if (profile.location) setLocation(profile.location);
    }
    if (portfolio) {
      if (portfolio.templateId) setTemplateId(portfolio.templateId);
      if (portfolio.slug) setSlug(portfolio.slug);
    }
  }, [user, profile, portfolio]);

  const handleNext = () => {
    if (step === 1 && (!firstName.trim() || !headline.trim())) {
      toast.error("Please enter your name and headline.");
      return;
    }
    if (step === 4 && !slug.trim()) {
      toast.error("Please choose a portfolio URL slug.");
      return;
    }
    setStep((prev) => Math.min(prev + 1, 5));
  };

  const handlePrev = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleFinish = async () => {
    setIsSaving(true);
    try {
      await updateProfile({
        firstName,
        lastName,
        headline,
        bio,
        location,
        isAvailableForHire: true,
      });

      await updatePortfolio({
        slug: slug.toLowerCase().replace(/[^a-z0-9-]/g, "-"),
        templateId,
        isPublished: true,
        seoTitle: `${firstName} ${lastName} | Developer Portfolio`,
        seoDescription: bio,
      });

      toast.success("🎉 Your developer portfolio is live!");
      router.push("/admin");
    } catch (err: any) {
      toast.error(err?.message || "Failed to complete setup. Please check your inputs.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between p-4 sm:p-8">
      {/* Top Header */}
      <div className="max-w-4xl mx-auto w-full flex items-center justify-between py-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-linear-to-tr from-primary to-primary/40 flex items-center justify-center font-bold text-primary-foreground font-mono text-sm shadow-md">
            P
          </div>
          <span className="text-base font-bold tracking-tight">DevPortfolio Setup</span>
        </div>

        {/* Progress Dots */}
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                step === i
                  ? "w-8 bg-primary"
                  : step > i
                  ? "w-2 bg-primary/60"
                  : "w-2 bg-muted"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Main Form Body */}
      <div className="max-w-xl mx-auto w-full my-auto py-8">
        <div className="bg-card border border-border rounded-3xl p-6 sm:p-10 shadow-xl space-y-8">
          {/* STEP 1: NAME & HEADLINE */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 text-xs font-mono text-primary uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Step 1 of 5</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                  What is your name &amp; title?
                </h2>
                <p className="text-xs text-muted-foreground">
                  This will be the primary identity showcased across your public portfolio.
                </p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1 block">First Name *</label>
                    <input
                      type="text"
                      placeholder="Alex"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border text-sm focus:outline-hidden focus:border-primary transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1 block">Last Name</label>
                    <input
                      type="text"
                      placeholder="Morgan"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border text-sm focus:outline-hidden focus:border-primary transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">Professional Headline *</label>
                  <input
                    type="text"
                    placeholder="e.g. Senior Full-Stack & Distributed Systems Architect"
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border text-sm focus:outline-hidden focus:border-primary transition-all"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: BIO & LOCATION */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 text-xs font-mono text-primary uppercase tracking-wider">
                  <Layers className="w-3.5 h-3.5" />
                  <span>Step 2 of 5</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                  Tell visitors about yourself
                </h2>
                <p className="text-xs text-muted-foreground">
                  Add a short biography and your working location preference.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">Short Bio</label>
                  <textarea
                    rows={4}
                    placeholder="Describe what you build, your engineering focus, and key accomplishments..."
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border text-sm focus:outline-hidden focus:border-primary transition-all resize-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">Location</label>
                  <input
                    type="text"
                    placeholder="e.g. San Francisco, CA / London (Remote)"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border text-sm focus:outline-hidden focus:border-primary transition-all"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: TEMPLATE SELECTION */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 text-xs font-mono text-primary uppercase tracking-wider">
                  <Palette className="w-3.5 h-3.5" />
                  <span>Step 3 of 5</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                  Choose a Template
                </h2>
                <p className="text-xs text-muted-foreground">
                  Select how your portfolio will present your work. You can switch anytime without losing data.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                {/* 1. Classic Dev */}
                <div
                  onClick={() => setTemplateId("classic-dev")}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-3 ${
                    templateId === "classic-dev"
                      ? "border-blue-500 bg-blue-500/5 ring-2 ring-blue-500/20 shadow-md"
                      : "border-border bg-muted/30 hover:border-border/80"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <Layout className="w-5 h-5 text-blue-500" />
                    {templateId === "classic-dev" && (
                      <CheckCircle2 className="w-4 h-4 text-blue-500" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-foreground">Modern Minimal</h3>
                    <p className="text-[10px] text-muted-foreground mt-1">
                      Floating capsule bar, editorial headline, balanced portfolio grid.
                    </p>
                  </div>
                </div>

                {/* 2. Nova Engine */}
                <div
                  onClick={() => setTemplateId("nova-engine")}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-3 ${
                    templateId === "nova-engine"
                      ? "border-primary bg-primary/5 ring-2 ring-primary/20 shadow-md"
                      : "border-border bg-muted/30 hover:border-border/80"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <Code2 className="w-5 h-5 text-primary" />
                    {templateId === "nova-engine" && (
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-foreground">Nova Engine</h3>
                    <p className="text-[10px] text-muted-foreground mt-1">
                      Deep obsidian telemetry, terminal header &amp; systems metric badges.
                    </p>
                  </div>
                </div>

                {/* 3. Apex Studio */}
                <div
                  onClick={() => setTemplateId("apex-studio")}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-3 ${
                    templateId === "apex-studio"
                      ? "border-amber-400 bg-amber-400/5 ring-2 ring-amber-400/20 shadow-md"
                      : "border-border bg-muted/30 hover:border-border/80"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <Palette className="w-5 h-5 text-amber-400" />
                    {templateId === "apex-studio" && (
                      <CheckCircle2 className="w-4 h-4 text-amber-400" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-foreground">Apex Studio</h3>
                    <p className="text-[10px] text-muted-foreground mt-1">
                      Editorial typography, glass dock nav &amp; creative showcase styling.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: URL SLUG */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 text-xs font-mono text-primary uppercase tracking-wider">
                  <Globe className="w-3.5 h-3.5" />
                  <span>Step 4 of 5</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                  Claim your unique URL
                </h2>
                <p className="text-xs text-muted-foreground">
                  This will be your personal portfolio link to share with recruiters and clients.
                </p>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Portfolio Slug *</label>
                <div className="flex items-center rounded-xl bg-background border border-border overflow-hidden px-3.5 py-2.5">
                  <span className="text-xs font-mono text-muted-foreground mr-1 select-none">
                    devportfolio.com/
                  </span>
                  <input
                    type="text"
                    required
                    placeholder="your-name"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-"))}
                    className="flex-1 bg-transparent text-sm font-mono focus:outline-hidden text-foreground"
                  />
                </div>
                <p className="text-[11px] text-muted-foreground">
                  Lowercase letters, numbers, and hyphens only.
                </p>
              </div>
            </div>
          )}

          {/* STEP 5: REVIEW & PUBLISH */}
          {step === 5 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-500 uppercase tracking-wider">
                  <Rocket className="w-3.5 h-3.5" />
                  <span>Step 5 of 5 &bull; Ready to Launch</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                  Review &amp; Publish
                </h2>
                <p className="text-xs text-muted-foreground">
                  Everything is configured. You can add projects, experiences, and customize settings in your dashboard.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-muted/40 border border-border/80 space-y-3 text-xs">
                <div className="flex justify-between py-1 border-b border-border/50">
                  <span className="text-muted-foreground">Name:</span>
                  <span className="font-semibold text-foreground">{firstName} {lastName}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-border/50">
                  <span className="text-muted-foreground">Headline:</span>
                  <span className="font-semibold text-foreground truncate max-w-[240px]">{headline}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-border/50">
                  <span className="text-muted-foreground">Template:</span>
                  <span className="font-semibold text-primary capitalize">
                    {templateId === "apex-studio" ? "Apex Studio" : templateId === "nova-engine" ? "Nova Engine" : "Modern Minimal"}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-muted-foreground">Public URL:</span>
                  <span className="font-mono text-primary font-semibold">devportfolio.com/{slug}</span>
                </div>
              </div>
            </div>
          )}

          {/* Actions Bar */}
          <div className="flex items-center justify-between pt-6 border-t border-border">
            {step > 1 ? (
              <button
                onClick={handlePrev}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-muted hover:bg-muted/80 text-foreground transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            {step < 5 ? (
              <button
                onClick={handleNext}
                className="px-6 py-2.5 rounded-xl text-xs font-bold bg-primary text-primary-foreground hover:opacity-90 transition-opacity flex items-center gap-2 shadow-md shadow-primary/20 cursor-pointer"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={handleFinish}
                disabled={isSaving}
                className="px-8 py-2.5 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-600 text-white transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/20 cursor-pointer disabled:opacity-50"
              >
                {isSaving ? (
                  <span>Publishing Portfolio...</span>
                ) : (
                  <>
                    <Rocket className="w-4 h-4" />
                    <span>Publish &amp; Open Dashboard</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="max-w-4xl mx-auto w-full text-center py-4 text-xs text-muted-foreground font-mono">
        Step {step} of 5 &bull; DevPortfolio SaaS Platform
      </div>
    </div>
  );
}
