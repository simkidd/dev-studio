"use client";

import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useProfile, useUpdateProfile, useUploadFile } from "@/hooks";
import { IProfile } from "@/interfaces";
import {
  User,
  Save,
  Loader2,
  Globe,
  Mail,
  Sparkles,
  FileText,
  Search,
  ExternalLink,
  MapPin,
  Briefcase,
  Layers,
  Award,
  Users,
  GitCommit,
  CheckCircle2,
  AlertCircle,
  Eye,
} from "lucide-react";
import {
  GithubIcon,
  LinkedinIcon,
  TwitterIcon,
  DiscordIcon,
  YoutubeIcon,
} from "@/components/ui/icons";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { FileDropzone } from "@/components/ui/file-dropzone";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export interface ProfileFormData {
  brandName?: string;
  logoUrl?: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  headline: string;
  subHeadline?: string;
  bio: string;
  aboutMarkdown: string;
  location: string;
  isAvailableForHire: boolean;
  availabilityNote: string;
  avatarUrl: string;
  resumeUrl: string;
  yearsExperience: number;
  completedProjects: number;
  happyClients: number;
  codeCommits: number;
  github: string;
  linkedin: string;
  twitter: string;
  discord: string;
  youtube: string;
  website: string;
  email: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
}

export function ProfileView() {
  const { data: profile, isLoading } = useProfile();
  const updateProfileMutation = useUpdateProfile();
  const uploadFileMutation = useUploadFile();
  const [activeTab, setActiveTab] = useState("general");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<ProfileFormData>({
    defaultValues: {
      brandName: "",
      logoUrl: "",
      firstName: "",
      middleName: "",
      lastName: "",
      headline: "",
      subHeadline: "",
      bio: "",
      aboutMarkdown: "",
      location: "",
      isAvailableForHire: true,
      availabilityNote: "",
      avatarUrl: "",
      resumeUrl: "",
      yearsExperience: 6,
      completedProjects: 40,
      happyClients: 25,
      codeCommits: 1200,
      github: "",
      linkedin: "",
      twitter: "",
      discord: "",
      youtube: "",
      website: "",
      email: "",
      seoTitle: "",
      seoDescription: "",
      seoKeywords: "",
    },
  });

  const avatarUrl = watch("avatarUrl");
  const logoUrl = watch("logoUrl");
  const resumeUrl = watch("resumeUrl");
  const isAvailable = watch("isAvailableForHire");
  const firstName = watch("firstName");
  const lastName = watch("lastName");
  const headline = watch("headline");
  const seoTitle = watch("seoTitle");
  const seoDescription = watch("seoDescription");

  useEffect(() => {
    if (profile) {
      reset({
        brandName: profile.brandName || "",
        logoUrl: profile.logoUrl || "",
        firstName: profile.firstName || "",
        middleName: profile.middleName || "",
        lastName: profile.lastName || "",
        headline: profile.headline || "",
        subHeadline: profile.subHeadline || "",
        bio: profile.bio || "",
        aboutMarkdown: profile.aboutMarkdown || "",
        location: profile.location || "",
        isAvailableForHire: profile.isAvailableForHire ?? true,
        availabilityNote: profile.availabilityNote || "",
        avatarUrl: profile.avatarUrl || "",
        resumeUrl: profile.resumeUrl || "",
        yearsExperience: profile.stats?.yearsExperience ?? 6,
        completedProjects: profile.stats?.completedProjects ?? 40,
        happyClients: profile.stats?.happyClients ?? 25,
        codeCommits: profile.stats?.codeCommits ?? 1200,
        github: profile.socialLinks?.github || "",
        linkedin: profile.socialLinks?.linkedin || "",
        twitter: profile.socialLinks?.twitter || "",
        discord: profile.socialLinks?.discord || "",
        youtube: profile.socialLinks?.youtube || "",
        website: profile.socialLinks?.website || "",
        email: profile.socialLinks?.email || "",
        seoTitle: profile.seoTitle || "",
        seoDescription: profile.seoDescription || "",
        seoKeywords: Array.isArray(profile.seoKeywords)
          ? profile.seoKeywords.join(", ")
          : (profile.seoKeywords as any) || "",
      });
    }
  }, [profile, reset]);

  const handleAvatarSelect = (file: File) => {
    uploadFileMutation.mutate(
      { file, folder: "avatars" },
      {
        onSuccess: (data) => {
          if (data?.url) {
            setValue("avatarUrl", data.url, {
              shouldValidate: true,
              shouldDirty: true,
            });
            toast.success("Avatar image uploaded successfully");
          }
        },
      },
    );
  };

  const handleLogoSelect = (file: File) => {
    uploadFileMutation.mutate(
      { file, folder: "logos" },
      {
        onSuccess: (data) => {
          if (data?.url) {
            setValue("logoUrl", data.url, {
              shouldValidate: true,
              shouldDirty: true,
            });
            toast.success("Brand logo uploaded successfully");
          }
        },
      },
    );
  };

  const handleResumeSelect = (file: File) => {
    uploadFileMutation.mutate(
      { file, folder: "documents" },
      {
        onSuccess: (data) => {
          if (data?.url) {
            setValue("resumeUrl", data.url, {
              shouldValidate: true,
              shouldDirty: true,
            });
            toast.success("Resume document uploaded successfully");
          }
        },
      },
    );
  };

  const onSubmit = (data: ProfileFormData) => {
    const keywordsArray = data.seoKeywords
      ? data.seoKeywords
          .split(",")
          .map((k) => k.trim())
          .filter(Boolean)
      : [];

    const payload: Partial<IProfile> = {
      brandName: data.brandName?.trim() || undefined,
      logoUrl: data.logoUrl || undefined,
      firstName: data.firstName.trim(),
      middleName: data.middleName?.trim() || undefined,
      lastName: data.lastName.trim(),
      headline: data.headline.trim(),
      subHeadline: data.subHeadline?.trim() || undefined,
      bio: data.bio.trim(),
      aboutMarkdown: data.aboutMarkdown,
      location: data.location.trim(),
      isAvailableForHire: data.isAvailableForHire,
      availabilityNote: data.availabilityNote.trim(),
      avatarUrl: data.avatarUrl,
      resumeUrl: data.resumeUrl,
      stats: {
        yearsExperience: Number(data.yearsExperience) || 0,
        completedProjects: Number(data.completedProjects) || 0,
        happyClients: Number(data.happyClients) || 0,
        codeCommits: Number(data.codeCommits) || 0,
      },
      socialLinks: {
        github: data.github.trim(),
        linkedin: data.linkedin.trim(),
        twitter: data.twitter.trim(),
        discord: data.discord.trim(),
        youtube: data.youtube.trim(),
        website: data.website.trim(),
        email: data.email.trim(),
      },
      seoTitle: data.seoTitle.trim(),
      seoDescription: data.seoDescription.trim(),
      seoKeywords: keywordsArray,
    };

    updateProfileMutation.mutate(payload, {
      onSuccess: () => {
        reset(data);
      },
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-6 max-w-5xl mx-auto animate-pulse pb-6">
        <div className="h-10 bg-muted/60 rounded-xl w-1/3" />
        <div className="h-12 bg-muted/50 rounded-xl w-full" />
        <div className="h-96 bg-card border border-border rounded-2xl p-6 space-y-4">
          <div className="h-20 w-20 bg-muted/60 rounded-full" />
          <div className="h-8 bg-muted/50 rounded-lg w-1/2" />
          <div className="h-24 bg-muted/40 rounded-lg w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-6 max-w-5xl w-full">
      {/* Top Header & Floating Save Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
              Settings & Identity
            </h1>
            {isDirty && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-amber-500/10 text-amber-500 border border-amber-500/20">
                <AlertCircle className="w-3 h-3" />
                Unsaved changes
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-1 max-w-2xl">
            Configure developer bio, availability status, key performance
            metrics, social links, and SEO metadata.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={handleSubmit(onSubmit)}
            disabled={updateProfileMutation.isPending || isSubmitting}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold shadow-sm flex items-center justify-center gap-2 disabled:opacity-50 transition-all cursor-pointer hover:shadow-primary/20 hover:shadow-md active:scale-98"
          >
            {updateProfileMutation.isPending ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Save className="w-3.5 h-3.5" />
            )}
            <span>Save Profile</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          {/* Responsive Navigation Tabs List */}
          <div className="w-full overflow-x-auto pb-1">
            <TabsList className="inline-flex items-center justify-start gap-1 p-1 bg-muted/80 dark:bg-muted/50 border border-border/80 rounded-xl h-auto shadow-inner">
              <TabsTrigger
                value="general"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-xs transition-all cursor-pointer whitespace-nowrap"
              >
                <User className="w-3.5 h-3.5 text-primary" />
                <span>General & Identity</span>
              </TabsTrigger>
              <TabsTrigger
                value="bio"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-xs transition-all cursor-pointer whitespace-nowrap"
              >
                <FileText className="w-3.5 h-3.5 text-primary" />
                <span>Bio & Story</span>
              </TabsTrigger>
              <TabsTrigger
                value="social"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-xs transition-all cursor-pointer whitespace-nowrap"
              >
                <Globe className="w-3.5 h-3.5 text-primary" />
                <span>Social Links</span>
              </TabsTrigger>
              <TabsTrigger
                value="seo"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-xs transition-all cursor-pointer whitespace-nowrap"
              >
                <Search className="w-3.5 h-3.5 text-primary" />
                <span>SEO & Search</span>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* TAB 1: General & Identity */}
          <TabsContent value="general" className="space-y-6 focus:outline-none">
            {/* Identity & Avatar Card */}
            <div className="bg-card border border-border/80 rounded-2xl p-4 sm:p-6 space-y-5 shadow-xs">
              <div className="flex items-center justify-between border-b border-border/60 pb-3">
                <h2 className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-2">
                  <User className="w-4 h-4 text-primary" />
                  <span>Master Identity & Profile Photo</span>
                </h2>
                <span className="text-[11px] text-muted-foreground font-mono">
                  {firstName && lastName
                    ? `${firstName} ${lastName}`
                    : "Developer Profile"}
                </span>
              </div>

              <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 pt-1">
                {/* Avatar Uploader Dropzone */}
                <div className="flex flex-col items-center gap-2 shrink-0">
                  <FileDropzone
                    variant="avatar"
                    previewUrl={avatarUrl}
                    onFileSelect={handleAvatarSelect}
                    isUploading={uploadFileMutation.isPending}
                  />
                  <span className="text-[11px] text-muted-foreground text-center">
                    PNG, JPG or WebP (Square recommended)
                  </span>
                </div>

                {/* Name Fields Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1 w-full">
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-medium text-foreground flex items-center justify-between">
                      <span>Brand / Logo Name</span>
                      <span className="text-[10px] text-muted-foreground font-normal">
                        Optional (Defaults to Full Name)
                      </span>
                    </label>
                    <Input
                      {...register("brandName")}
                      placeholder="e.g. AcmeDev or Portfolio Name"
                      className="rounded-lg"
                    />
                    <span className="text-[10px] text-muted-foreground block">
                      Displayed on the floating navbar and footer brand logo.
                    </span>
                  </div>

                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-medium text-foreground flex items-center justify-between">
                      <span>Navbar Brand Logo Icon</span>
                      <span className="text-[10px] text-muted-foreground font-normal">
                        Optional (SVG / PNG)
                      </span>
                    </label>
                    <FileDropzone
                      variant="compact"
                      label={logoUrl ? "Replace brand logo icon" : "Upload brand logo icon (SVG, PNG)"}
                      previewUrl={logoUrl}
                      onFileSelect={handleLogoSelect}
                      onClear={() => setValue("logoUrl", "", { shouldDirty: true })}
                      isUploading={uploadFileMutation.isPending}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-foreground">
                      First Name *
                    </label>
                    <Input
                      {...register("firstName", {
                        required: "First name is required",
                      })}
                      placeholder="First name"
                      className="rounded-lg"
                    />
                    {errors.firstName && (
                      <span className="text-[10px] text-destructive">
                        {errors.firstName.message}
                      </span>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-foreground flex items-center justify-between">
                      <span>Middle Name</span>
                      <span className="text-[10px] text-muted-foreground font-normal">
                        Optional
                      </span>
                    </label>
                    <Input
                      {...register("middleName")}
                      placeholder="Middle name"
                      className="rounded-lg"
                    />
                  </div>

                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-medium text-foreground">
                      Last Name *
                    </label>
                    <Input
                      {...register("lastName", {
                        required: "Last name is required",
                      })}
                      placeholder="Last name"
                      className="rounded-lg"
                    />
                    {errors.lastName && (
                      <span className="text-[10px] text-destructive">
                        {errors.lastName.message}
                      </span>
                    )}
                  </div>

                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-medium text-foreground">
                      Hero Headline (Display Title) *
                    </label>
                    <Input
                      {...register("headline", {
                        required: "Headline is required",
                      })}
                      placeholder="e.g. Software Engineer or Full-Stack Architect"
                      className="rounded-lg"
                    />
                    {errors.headline && (
                      <span className="text-[10px] text-destructive">
                        {errors.headline.message}
                      </span>
                    )}
                  </div>

                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-medium text-foreground">
                      Hero Subtitle (Value Proposition)
                    </label>
                    <Textarea
                      {...register("subHeadline")}
                      rows={2}
                      placeholder="e.g. Specializing in modern web platforms, distributed backends, and elegant user experiences."
                      className="rounded-lg text-xs leading-relaxed resize-none"
                    />
                  </div>

                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-medium text-foreground flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                      Current Location / Base
                    </label>
                    <Input
                      {...register("location")}
                      placeholder="e.g. London, UK (Open to Global Remote)"
                      className="rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Availability Status Card */}
            <div className="bg-card border border-border/80 rounded-2xl p-4 sm:p-6 space-y-4 shadow-xs">
              <div className="flex items-center justify-between border-b border-border/60 pb-3">
                <h2 className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-primary" />
                  <span>Work & Availability Status</span>
                </h2>
                <div className="flex items-center gap-1.5">
                  <span
                    className={cn(
                      "w-2 h-2 rounded-full",
                      isAvailable
                        ? "bg-emerald-500 animate-pulse"
                        : "bg-muted-foreground/50",
                    )}
                  />
                  <span className="text-[11px] font-medium text-muted-foreground">
                    {isAvailable ? "Available" : "Occupied"}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center pt-1">
                <div
                  className={cn(
                    "flex items-start gap-3.5 p-3.5 rounded-xl border transition-colors cursor-pointer",
                    isAvailable
                      ? "bg-emerald-500/5 border-emerald-500/20 dark:bg-emerald-500/10"
                      : "bg-muted/40 border-border",
                  )}
                >
                  <Controller
                    name="isAvailableForHire"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        id="hireable"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="mt-0.5"
                      />
                    )}
                  />
                  <label
                    htmlFor="hireable"
                    className="text-xs font-medium text-foreground cursor-pointer select-none space-y-0.5"
                  >
                    <span className="block font-semibold text-foreground">
                      Available for Hire
                    </span>
                    <span className="text-[11px] text-muted-foreground block leading-relaxed">
                      Display an active hiring pulse beacon on the hero and
                      navigation header.
                    </span>
                  </label>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground">
                    Availability Badge Note
                  </label>
                  <Input
                    {...register("availabilityNote")}
                    placeholder="e.g. Open for Staff Roles, Advisory & Select Contracts"
                    className="rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* Impact & Metric Numbers Card */}
            <div className="bg-card border border-border/80 rounded-2xl p-4 sm:p-6 space-y-4 shadow-xs">
              <div className="flex items-center justify-between border-b border-border/60 pb-3">
                <h2 className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-2">
                  <Award className="w-4 h-4 text-primary" />
                  <span>Key Impact Metrics & Statistics</span>
                </h2>
                <span className="text-[11px] text-muted-foreground">
                  Shown in portfolio hero highlights
                </span>
              </div>

              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-4 gap-3.5 pt-1">
                <div className="space-y-1.5 p-3 rounded-xl bg-muted/40 border border-border/60">
                  <label className="text-xs font-medium text-foreground flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-primary" />
                    Experience (Yrs)
                  </label>
                  <Input
                    type="number"
                    {...register("yearsExperience", { valueAsNumber: true })}
                    className="font-mono text-sm font-semibold rounded-lg bg-background"
                    min={0}
                  />
                </div>

                <div className="space-y-1.5 p-3 rounded-xl bg-muted/40 border border-border/60">
                  <label className="text-xs font-medium text-foreground flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-emerald-500" />
                    Completed Projects
                  </label>
                  <Input
                    type="number"
                    {...register("completedProjects", { valueAsNumber: true })}
                    className="font-mono text-sm font-semibold rounded-lg bg-background"
                    min={0}
                  />
                </div>

                <div className="space-y-1.5 p-3 rounded-xl bg-muted/40 border border-border/60">
                  <label className="text-xs font-medium text-foreground flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-indigo-500" />
                    Happy Clients
                  </label>
                  <Input
                    type="number"
                    {...register("happyClients", { valueAsNumber: true })}
                    className="font-mono text-sm font-semibold rounded-lg bg-background"
                    min={0}
                  />
                </div>

                <div className="space-y-1.5 p-3 rounded-xl bg-muted/40 border border-border/60">
                  <label className="text-xs font-medium text-foreground flex items-center gap-1.5">
                    <GitCommit className="w-3.5 h-3.5 text-amber-500" />
                    Code Commits
                  </label>
                  <Input
                    type="number"
                    {...register("codeCommits", { valueAsNumber: true })}
                    className="font-mono text-sm font-semibold rounded-lg bg-background"
                    min={0}
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          {/* TAB 2: Bio, Story & Resume */}
          <TabsContent value="bio" className="space-y-6 focus:outline-none">
            <div className="bg-card border border-border/80 rounded-2xl p-4 sm:p-6 space-y-5 shadow-xs">
              <div className="flex items-center justify-between border-b border-border/60 pb-3">
                <h2 className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span>Bio & Engineering Story</span>
                </h2>
              </div>

              {/* Elevator Bio */}
              <div className="space-y-1.5 min-w-0 max-w-full">
                <label className="text-xs font-medium text-foreground">
                  Short Elevator Bio (Homepage Hero) *
                </label>
                <Textarea
                  {...register("bio", { required: "Bio is required" })}
                  placeholder="I design and build resilient cloud systems, high-performance web applications, and intuitive user experiences..."
                  rows={3}
                  className="rounded-lg resize-none leading-relaxed text-xs w-full min-w-0 max-w-full min-h-[75px]"
                />
                {errors.bio && (
                  <span className="text-[10px] text-destructive">
                    {errors.bio.message}
                  </span>
                )}
              </div>

              {/* Comprehensive About Story */}
              <div className="space-y-1.5 pt-2 min-w-0 max-w-full">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <label className="text-xs font-medium text-foreground">
                    Comprehensive Story / About Me
                  </label>
                  <span className="text-[11px] font-mono text-muted-foreground">
                    Supports multiline paragraphs and formatted text
                  </span>
                </div>
                <Textarea
                  {...register("aboutMarkdown")}
                  placeholder="Write your comprehensive background, engineering philosophy, and career achievements..."
                  rows={5}
                  className="w-full min-w-0 max-w-full resize-none overflow-y-auto leading-relaxed text-xs font-sans rounded-lg"
                />
              </div>

              {/* Resume Document Link & Dropzone */}
              <div className="space-y-3 pt-4 border-t border-border/60">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-primary" />
                    <span>Resume / CV Document</span>
                  </label>
                  {resumeUrl && (
                    <a
                      href={resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary hover:underline inline-flex items-center gap-1.5 font-medium transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Preview Uploaded CV</span>
                    </a>
                  )}
                </div>

                <div className="space-y-2">
                  <Input
                    type="url"
                    {...register("resumeUrl")}
                    placeholder="https://... or upload PDF below"
                    className="rounded-lg text-xs"
                  />
                  <FileDropzone
                    variant="compact"
                    label="Click or drop PDF / Word resume to upload to Cloudinary"
                    accept={{
                      "application/pdf": [".pdf"],
                      "application/msword": [".doc", ".docx"],
                    }}
                    onFileSelect={handleResumeSelect}
                    isUploading={uploadFileMutation.isPending}
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          {/* TAB 3: Social Links & Connectivity */}
          <TabsContent value="social" className="space-y-6 focus:outline-none">
            <div className="bg-card border border-border/80 rounded-2xl p-4 sm:p-6 space-y-5 shadow-xs">
              <div className="flex items-center justify-between border-b border-border/60 pb-3">
                <h2 className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-2">
                  <Globe className="w-4 h-4 text-primary" />
                  <span>Online Presence & Social Handles</span>
                </h2>
                <span className="text-[11px] text-muted-foreground">
                  Populates footer and contact cards
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground flex items-center gap-1.5">
                    <GithubIcon className="w-3.5 h-3.5 text-muted-foreground" />
                    GitHub Profile
                  </label>
                  <Input
                    type="url"
                    {...register("github")}
                    placeholder="https://github.com/your-handle"
                    className="rounded-lg text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground flex items-center gap-1.5">
                    <LinkedinIcon className="w-3.5 h-3.5 text-muted-foreground" />
                    LinkedIn Profile
                  </label>
                  <Input
                    type="url"
                    {...register("linkedin")}
                    placeholder="https://linkedin.com/in/your-handle"
                    className="rounded-lg text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground flex items-center gap-1.5">
                    <TwitterIcon className="w-3.5 h-3.5 text-muted-foreground" />
                    X / Twitter Profile
                  </label>
                  <Input
                    type="url"
                    {...register("twitter")}
                    placeholder="https://x.com/your-handle"
                    className="rounded-lg text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-muted-foreground" />
                    Direct Contact Email
                  </label>
                  <Input
                    type="email"
                    {...register("email")}
                    placeholder="contact@yourdomain.com"
                    className="rounded-lg text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-muted-foreground" />
                    Personal Website / Portfolio
                  </label>
                  <Input
                    type="url"
                    {...register("website")}
                    placeholder="https://yourportfolio.dev"
                    className="rounded-lg text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground flex items-center gap-1.5">
                    <DiscordIcon className="w-3.5 h-3.5 text-muted-foreground" />
                    Discord Username / Server
                  </label>
                  <Input
                    type="text"
                    {...register("discord")}
                    placeholder="username or https://discord.gg/..."
                    className="rounded-lg text-xs"
                  />
                </div>

                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs font-medium text-foreground flex items-center gap-1.5">
                    <YoutubeIcon className="w-3.5 h-3.5 text-muted-foreground" />
                    YouTube Channel
                  </label>
                  <Input
                    type="url"
                    {...register("youtube")}
                    placeholder="https://youtube.com/@your-channel"
                    className="rounded-lg text-xs"
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          {/* TAB 4: SEO & Search Metadata */}
          <TabsContent value="seo" className="space-y-6 focus:outline-none">
            <div className="bg-card border border-border/80 rounded-2xl p-4 sm:p-6 space-y-5 shadow-xs">
              <div className="flex items-center justify-between border-b border-border/60 pb-3">
                <h2 className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-2">
                  <Search className="w-4 h-4 text-primary" />
                  <span>Search Engine Optimization (SEO) & Metadata</span>
                </h2>
                <span className="text-[11px] text-muted-foreground">
                  Live Google Preview
                </span>
              </div>

              {/* Live SERP Preview Box */}
              <div className="p-4 rounded-xl bg-muted/40 border border-border/80 space-y-1.5">
                <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground font-mono">
                  <Eye className="w-3.5 h-3.5 text-primary" />
                  <span>Google Search Result Snippet Preview</span>
                </div>
                <div className="pt-2">
                  <p className="text-[11px] text-muted-foreground font-mono truncate">
                    https://yoursite.com
                  </p>
                  <h3 className="text-sm font-semibold text-blue-500 dark:text-blue-400 hover:underline cursor-pointer truncate">
                    {seoTitle ||
                      (headline
                        ? `${firstName || "Developer"} — ${headline}`
                        : "Developer Portfolio")}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5 leading-relaxed">
                    {seoDescription ||
                      "Portfolio and engineering insights of full-stack architect specializing in high-performance cloud applications."}
                  </p>
                </div>
              </div>

              <div className="space-y-4 pt-1">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-medium text-foreground">
                      Global Meta Title Tag
                    </label>
                    <span className="text-[10px] font-mono text-muted-foreground">
                      Recommended: 50–60 characters
                    </span>
                  </div>
                  <Input
                    type="text"
                    {...register("seoTitle")}
                    placeholder="e.g. Senior Full-Stack Architect & Cloud Specialist"
                    className="rounded-lg text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-medium text-foreground">
                      Global Meta Description Tag
                    </label>
                    <span className="text-[10px] font-mono text-muted-foreground">
                      Recommended: 120–160 characters
                    </span>
                  </div>
                  <Textarea
                    {...register("seoDescription")}
                    placeholder="Explore modern portfolio projects, distributed systems architectures, and full-stack engineering insights."
                    rows={3}
                    className="rounded-lg text-xs resize-none leading-relaxed"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground">
                    Target Keywords (Comma-separated)
                  </label>
                  <Input
                    type="text"
                    {...register("seoKeywords")}
                    placeholder="Full-Stack Engineer, React, Node.js, TypeScript, Cloud Architect, Next.js, Distributed Systems"
                    className="rounded-lg text-xs"
                  />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </form>
    </div>
  );
}
