"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useProfile, useUpdateProfile, useUploadFile } from "@/hooks";
import { IProfile } from "@/interfaces";
import {
  User,
  Save,
  Loader2,
  Globe,
  Mail,
  Sparkles,
} from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/ui/icons";
import { toast } from "sonner";

export interface ProfileFormData {
  firstName: string;
  lastName: string;
  headline: string;
  bio: string;
  aboutMarkdown: string;
  location: string;
  isAvailableForHire: boolean;
  availabilityNote: string;
  avatarUrl: string;
  resumeUrl: string;
  yearsExperience: number;
  completedProjects: number;
  github: string;
  linkedin: string;
  twitter: string;
  website: string;
  email: string;
}

export function ProfileView() {
  const { data: profile, isLoading } = useProfile();
  const updateProfileMutation = useUpdateProfile();
  const uploadFileMutation = useUploadFile();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      headline: "",
      bio: "",
      aboutMarkdown: "",
      location: "",
      isAvailableForHire: true,
      availabilityNote: "",
      avatarUrl: "",
      resumeUrl: "",
      yearsExperience: 6,
      completedProjects: 40,
      github: "",
      linkedin: "",
      twitter: "",
      website: "",
      email: "",
    },
  });

  const avatarUrl = watch("avatarUrl");

  useEffect(() => {
    if (profile) {
      reset({
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
        headline: profile.headline || "",
        bio: profile.bio || "",
        aboutMarkdown: profile.aboutMarkdown || "",
        location: profile.location || "",
        isAvailableForHire: profile.isAvailableForHire ?? true,
        availabilityNote: profile.availabilityNote || "",
        avatarUrl: profile.avatarUrl || "",
        resumeUrl: profile.resumeUrl || "",
        yearsExperience: profile.stats?.yearsExperience || 6,
        completedProjects: profile.stats?.completedProjects || 40,
        github: profile.socialLinks?.github || "",
        linkedin: profile.socialLinks?.linkedin || "",
        twitter: profile.socialLinks?.twitter || "",
        website: profile.socialLinks?.website || "",
        email: profile.socialLinks?.email || "",
      });
    }
  }, [profile, reset]);

  const isUploadingAvatar = uploadFileMutation.isPending;

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    uploadFileMutation.mutate(
      { file, folder: "avatars" },
      {
        onSuccess: (data) => {
          if (data?.url) {
            setValue("avatarUrl", data.url, { shouldValidate: true });
            toast.success("Avatar image uploaded");
          }
        },
      }
    );
  };

  const onSubmit = (data: ProfileFormData) => {
    const payload: Partial<IProfile> = {
      firstName: data.firstName,
      lastName: data.lastName,
      headline: data.headline,
      bio: data.bio,
      aboutMarkdown: data.aboutMarkdown,
      location: data.location,
      isAvailableForHire: data.isAvailableForHire,
      availabilityNote: data.availabilityNote,
      avatarUrl: data.avatarUrl,
      resumeUrl: data.resumeUrl,
      stats: {
        yearsExperience: Number(data.yearsExperience),
        completedProjects: Number(data.completedProjects),
      },
      socialLinks: {
        github: data.github,
        linkedin: data.linkedin,
        twitter: data.twitter,
        website: data.website,
        email: data.email,
      },
    };

    updateProfileMutation.mutate(payload);
  };

  return (
    <div className="space-y-6 pb-20 max-w-4xl">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-foreground tracking-tight">
            Developer Identity & Profile
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Configure personal branding, elevator pitch, availability status, and social presence.
          </p>
        </div>

        <button
          onClick={handleSubmit(onSubmit)}
          disabled={updateProfileMutation.isPending || isSubmitting}
          className="px-4 py-2 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold shadow-sm flex items-center gap-2 disabled:opacity-50 cursor-pointer"
        >
          {updateProfileMutation.isPending ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Save className="w-3.5 h-3.5" />
          )}
          <span>Save Profile Changes</span>
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Card 1: Master Identity */}
        <div className="bg-card border border-border rounded-xl p-5 space-y-4 shadow-sm">
          <h2 className="text-xs font-semibold text-foreground uppercase tracking-wider flex items-center gap-2">
            <User className="w-3.5 h-3.5 text-primary" />
            <span>Master Identity & Avatar</span>
          </h2>

          <div className="flex flex-col sm:flex-row items-center gap-5 pt-2">
            <div className="relative w-20 h-20 rounded-full border-2 border-primary/40 overflow-hidden group shrink-0 bg-muted">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  <User className="w-8 h-8" />
                </div>
              )}
              <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity">
                <span className="text-[9px] text-white font-medium bg-primary px-2 py-0.5 rounded">
                  {isUploadingAvatar ? "..." : "Change"}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  disabled={isUploadingAvatar}
                  className="hidden"
                />
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1 w-full">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground">First Name *</label>
                <input
                  type="text"
                  {...register("firstName", { required: "First name is required" })}
                  placeholder="e.g. Alex"
                  className="w-full bg-background border border-border rounded-lg px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
                />
                {errors.firstName && (
                  <span className="text-[10px] text-destructive">{errors.firstName.message}</span>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground">Last Name *</label>
                <input
                  type="text"
                  {...register("lastName", { required: "Last name is required" })}
                  placeholder="e.g. Morgan"
                  className="w-full bg-background border border-border rounded-lg px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
                />
                {errors.lastName && (
                  <span className="text-[10px] text-destructive">{errors.lastName.message}</span>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground">Location</label>
              <input
                type="text"
                {...register("location")}
                placeholder="e.g. San Francisco, CA / London (Remote)"
                className="w-full bg-background border border-border rounded-lg px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground">Years Experience</label>
              <input
                type="number"
                {...register("yearsExperience", { valueAsNumber: true })}
                className="w-full bg-background border border-border rounded-lg px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary font-mono"
              />
            </div>
          </div>

          <div className="space-y-1.5 pt-2">
            <label className="text-xs font-medium text-foreground">
              Hero Headline (Value Hook) *
            </label>
            <input
              type="text"
              {...register("headline", { required: "Headline is required" })}
              placeholder="e.g. Lead Full-Stack Architect & Cloud Systems Engineer"
              className="w-full bg-background border border-border rounded-lg px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
            />
            {errors.headline && (
              <span className="text-[10px] text-destructive">{errors.headline.message}</span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="flex items-center gap-2 pt-6">
              <input
                type="checkbox"
                id="hireable"
                {...register("isAvailableForHire")}
                className="w-4 h-4 rounded bg-background border-border text-primary"
              />
              <label htmlFor="hireable" className="text-xs font-medium text-foreground cursor-pointer">
                Available for New Contracts & Senior Roles
              </label>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground">
                Availability Badge Subtitle
              </label>
              <input
                type="text"
                {...register("availabilityNote")}
                placeholder="e.g. Open for Staff Roles & $10k+ Projects"
                className="w-full bg-background border border-border rounded-lg px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
              />
            </div>
          </div>
        </div>

        {/* Card 2: Bio & Elevator Pitch */}
        <div className="bg-card border border-border rounded-xl p-5 space-y-4 shadow-sm">
          <h2 className="text-xs font-semibold text-foreground uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span>Bio & Engineering Story</span>
          </h2>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-foreground">
              Short Bio (Homepage Hero) *
            </label>
            <textarea
              {...register("bio", { required: "Bio is required" })}
              placeholder="I build resilient distributed systems, sub-second React platforms, and cloud infrastructure..."
              rows={3}
              className="w-full bg-background border border-border rounded-lg p-3 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary resize-none"
            />
            {errors.bio && (
              <span className="text-[10px] text-destructive">{errors.bio.message}</span>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-foreground">
              Comprehensive Bio / About Me (Markdown)
            </label>
            <textarea
              {...register("aboutMarkdown")}
              placeholder="Detailed background, design philosophy, leadership principles..."
              rows={6}
              className="w-full bg-background border border-border rounded-lg p-3 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary font-mono resize-y"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-foreground">Resume / CV Link</label>
            <input
              type="url"
              {...register("resumeUrl")}
              placeholder="https://..."
              className="w-full bg-background border border-border rounded-lg px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        {/* Card 3: Social & Online Presence */}
        <div className="bg-card border border-border rounded-xl p-5 space-y-4 shadow-sm">
          <h2 className="text-xs font-semibold text-foreground uppercase tracking-wider flex items-center gap-2">
            <Globe className="w-3.5 h-3.5 text-primary" />
            <span>Social Links & Connectivity</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground flex items-center gap-1.5">
                <GithubIcon className="w-3.5 h-3.5 text-muted-foreground" />
                GitHub Profile URL
              </label>
              <input
                type="url"
                {...register("github")}
                placeholder="https://github.com/..."
                className="w-full bg-background border border-border rounded-lg px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground flex items-center gap-1.5">
                <LinkedinIcon className="w-3.5 h-3.5 text-muted-foreground" />
                LinkedIn Profile URL
              </label>
              <input
                type="url"
                {...register("linkedin")}
                placeholder="https://linkedin.com/in/..."
                className="w-full bg-background border border-border rounded-lg px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground flex items-center gap-1.5">
                <TwitterIcon className="w-3.5 h-3.5 text-muted-foreground" />
                X / Twitter URL
              </label>
              <input
                type="url"
                {...register("twitter")}
                placeholder="https://x.com/..."
                className="w-full bg-background border border-border rounded-lg px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-muted-foreground" />
                Direct Contact Email
              </label>
              <input
                type="email"
                {...register("email")}
                placeholder="contact@yourdomain.com"
                className="w-full bg-background border border-border rounded-lg px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
              />
            </div>
          </div>
        </div>

        {/* Bottom Save Bar */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="submit"
            disabled={updateProfileMutation.isPending || isSubmitting}
            className="px-6 py-2.5 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-xs shadow-sm flex items-center gap-2 disabled:opacity-50 cursor-pointer"
          >
            {updateProfileMutation.isPending || isSubmitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            <span>Save Profile Configuration</span>
          </button>
        </div>
      </form>
    </div>
  );
}
