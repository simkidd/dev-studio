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
} from "lucide-react";
import {
  GithubIcon,
  LinkedinIcon,
  TwitterIcon,
  DiscordIcon,
  YoutubeIcon,
} from "@/components/ui/icons";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { FileDropzone } from "@/components/ui/file-dropzone";
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
  const resumeUrl = watch("resumeUrl");

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
        happyClients: profile.stats?.happyClients || 25,
        codeCommits: profile.stats?.codeCommits || 1200,
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
            setValue("avatarUrl", data.url, { shouldValidate: true });
            toast.success("Avatar image uploaded successfully");
          }
        },
      }
    );
  };

  const handleResumeSelect = (file: File) => {
    uploadFileMutation.mutate(
      { file, folder: "documents" },
      {
        onSuccess: (data) => {
          if (data?.url) {
            setValue("resumeUrl", data.url, { shouldValidate: true });
            toast.success("Resume document uploaded successfully");
          }
        },
      }
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
        happyClients: Number(data.happyClients),
        codeCommits: Number(data.codeCommits),
      },
      socialLinks: {
        github: data.github,
        linkedin: data.linkedin,
        twitter: data.twitter,
        discord: data.discord,
        youtube: data.youtube,
        website: data.website,
        email: data.email,
      },
      seoTitle: data.seoTitle,
      seoDescription: data.seoDescription,
      seoKeywords: keywordsArray,
    };

    updateProfileMutation.mutate(payload);
  };

  return (
    <div className="space-y-6 pb-20 max-w-4xl">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-foreground tracking-tight">
            Settings & Identity
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Configure developer bio, availability status, social connectivity, and SEO metadata.
          </p>
        </div>

        <button
          onClick={handleSubmit(onSubmit)}
          disabled={updateProfileMutation.isPending || isSubmitting}
          className="px-4 py-2 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold shadow-xs flex items-center gap-2 disabled:opacity-50 transition-colors cursor-pointer"
        >
          {updateProfileMutation.isPending ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Save className="w-3.5 h-3.5" />
          )}
          <span>Save Changes</span>
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          {/* Navigation Tabs List */}
          <TabsList className="bg-muted/80 rounded-xl grid grid-cols-2 sm:grid-cols-4 gap-1 w-full max-w-2xl border border-border/60">
            <TabsTrigger
              value="general"
              className="text-xs font-medium py-1.5 flex items-center justify-center gap-1.5 data-[state=active]:bg-background data-[state=active]:shadow-xs rounded-lg transition-all cursor-pointer"
            >
              <User className="w-3.5 h-3.5 text-primary" />
              <span>General</span>
            </TabsTrigger>
            <TabsTrigger
              value="bio"
              className="text-xs font-medium py-1.5 flex items-center justify-center gap-1.5 data-[state=active]:bg-background data-[state=active]:shadow-xs rounded-lg transition-all cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-primary" />
              <span>Bio & Story</span>
            </TabsTrigger>
            <TabsTrigger
              value="social"
              className="text-xs font-medium py-1.5 flex items-center justify-center gap-1.5 data-[state=active]:bg-background data-[state=active]:shadow-xs rounded-lg transition-all cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-primary" />
              <span>Social Links</span>
            </TabsTrigger>
            <TabsTrigger
              value="seo"
              className="text-xs font-medium py-1.5 flex items-center justify-center gap-1.5 data-[state=active]:bg-background data-[state=active]:shadow-xs rounded-lg transition-all cursor-pointer"
            >
              <Search className="w-3.5 h-3.5 text-primary" />
              <span>SEO & Meta</span>
            </TabsTrigger>
          </TabsList>

          {/* TAB 1: General & Identity */}
          <TabsContent value="general" className="space-y-5 focus:outline-none">
            {/* Avatar & Core Names Card */}
            <div className="bg-card border border-border rounded-xl p-5 space-y-4 shadow-xs">
              <h2 className="text-xs font-semibold text-foreground uppercase tracking-wider flex items-center gap-2">
                <User className="w-3.5 h-3.5 text-primary" />
                <span>Master Identity & Photo</span>
              </h2>

              <div className="flex flex-col sm:flex-row items-center gap-5 pt-1">
                {/* React Dropzone Avatar */}
                <FileDropzone
                  variant="avatar"
                  previewUrl={avatarUrl}
                  onFileSelect={handleAvatarSelect}
                  isUploading={uploadFileMutation.isPending}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1 w-full">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-foreground">First Name *</label>
                    <Input
                      {...register("firstName", { required: "First name is required" })}
                      placeholder="e.g. Alex"
                    />
                    {errors.firstName && (
                      <span className="text-[10px] text-destructive">{errors.firstName.message}</span>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-foreground">Last Name *</label>
                    <Input
                      {...register("lastName", { required: "Last name is required" })}
                      placeholder="e.g. Morgan"
                    />
                    {errors.lastName && (
                      <span className="text-[10px] text-destructive">{errors.lastName.message}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Value Hook Headline */}
              <div className="space-y-1.5 pt-1">
                <label className="text-xs font-medium text-foreground">
                  Hero Headline (Value Proposition) *
                </label>
                <Input
                  {...register("headline", { required: "Headline is required" })}
                  placeholder="e.g. Lead Full-Stack Architect & Cloud Systems Engineer"
                />
                {errors.headline && (
                  <span className="text-[10px] text-destructive">{errors.headline.message}</span>
                )}
              </div>

              {/* Location & Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-muted-foreground" />
                    Location
                  </label>
                  <Input
                    {...register("location")}
                    placeholder="e.g. San Francisco, CA (Remote)"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground">Years Experience</label>
                  <Input
                    type="number"
                    {...register("yearsExperience", { valueAsNumber: true })}
                    className="font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground">Completed Projects</label>
                  <Input
                    type="number"
                    {...register("completedProjects", { valueAsNumber: true })}
                    className="font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Availability Status Card */}
            <div className="bg-card border border-border rounded-xl p-5 space-y-4 shadow-xs">
              <h2 className="text-xs font-semibold text-foreground uppercase tracking-wider flex items-center gap-2">
                <Briefcase className="w-3.5 h-3.5 text-primary" />
                <span>Work Availability Status</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-background border border-border">
                  <Controller
                    name="isAvailableForHire"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        id="hireable"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    )}
                  />
                  <label
                    htmlFor="hireable"
                    className="text-xs font-medium text-foreground cursor-pointer select-none"
                  >
                    <span className="block font-semibold">Available for Hire</span>
                    <span className="text-[11px] text-muted-foreground">
                      Display "Available for new projects" status dot on header
                    </span>
                  </label>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground">
                    Availability Badge Note
                  </label>
                  <Input
                    {...register("availabilityNote")}
                    placeholder="e.g. Open for Staff Roles & $10k+ Contracts"
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          {/* TAB 2: Bio & Resume */}
          <TabsContent value="bio" className="space-y-5 focus:outline-none">
            <div className="bg-card border border-border rounded-xl p-5 space-y-4 shadow-xs">
              <h2 className="text-xs font-semibold text-foreground uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span>Bio & Engineering Story</span>
              </h2>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground">
                  Short Elevator Bio (Homepage Hero) *
                </label>
                <Textarea
                  {...register("bio", { required: "Bio is required" })}
                  placeholder="I build resilient distributed systems, sub-second React platforms, and cloud infrastructure..."
                  rows={3}
                  className="resize-none"
                />
                {errors.bio && (
                  <span className="text-[10px] text-destructive">{errors.bio.message}</span>
                )}
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-foreground">
                    Comprehensive Story / About Me (Markdown)
                  </label>
                  <span className="text-[10px] font-mono text-muted-foreground">
                    Supports GitHub-flavored Markdown
                  </span>
                </div>
                <Textarea
                  {...register("aboutMarkdown")}
                  placeholder="Detailed background, architecture philosophy, engineering leadership values..."
                  rows={8}
                  className="font-mono resize-y"
                />
              </div>

              {/* Resume Document Link & Dropzone */}
              <div className="space-y-3 pt-2 border-t border-border">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-foreground">Resume / CV Document</label>
                  {resumeUrl && (
                    <a
                      href={resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-primary hover:underline inline-flex items-center gap-1 font-mono"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>Preview Current File</span>
                    </a>
                  )}
                </div>

                <div className="space-y-2">
                  <Input
                    type="url"
                    {...register("resumeUrl")}
                    placeholder="https://... or drop file below"
                  />
                  <FileDropzone
                    variant="compact"
                    label="Click or drop PDF / Word resume to upload"
                    accept={{ "application/pdf": [".pdf"], "application/msword": [".doc", ".docx"] }}
                    onFileSelect={handleResumeSelect}
                    isUploading={uploadFileMutation.isPending}
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          {/* TAB 3: Social Links & Connectivity */}
          <TabsContent value="social" className="space-y-5 focus:outline-none">
            <div className="bg-card border border-border rounded-xl p-5 space-y-4 shadow-xs">
              <h2 className="text-xs font-semibold text-foreground uppercase tracking-wider flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-primary" />
                <span>Online Presence & Social Links</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground flex items-center gap-1.5">
                    <GithubIcon className="w-3.5 h-3.5 text-muted-foreground" />
                    GitHub Profile
                  </label>
                  <Input
                    type="url"
                    {...register("github")}
                    placeholder="https://github.com/username"
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
                    placeholder="https://linkedin.com/in/username"
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
                    placeholder="https://x.com/username"
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
                    placeholder="alex@yourdomain.com"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-muted-foreground" />
                    Personal Website / Blog
                  </label>
                  <Input
                    type="url"
                    {...register("website")}
                    placeholder="https://alexmorgan.dev"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground flex items-center gap-1.5">
                    <DiscordIcon className="w-3.5 h-3.5 text-muted-foreground" />
                    Discord Handle / Server URL
                  </label>
                  <Input
                    type="text"
                    {...register("discord")}
                    placeholder="alex_dev or https://discord.gg/..."
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          {/* TAB 4: SEO & Metadata */}
          <TabsContent value="seo" className="space-y-5 focus:outline-none">
            <div className="bg-card border border-border rounded-xl p-5 space-y-4 shadow-xs">
              <h2 className="text-xs font-semibold text-foreground uppercase tracking-wider flex items-center gap-2">
                <Search className="w-3.5 h-3.5 text-primary" />
                <span>Search Engine Optimization & Metadata</span>
              </h2>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground">
                  Global Meta Title Tag
                </label>
                <Input
                  type="text"
                  {...register("seoTitle")}
                  placeholder="Alex Morgan — Senior Full-Stack Architect & Cloud Specialist"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground">
                  Global Meta Description Tag
                </label>
                <Textarea
                  {...register("seoDescription")}
                  placeholder="Portfolio and technical insights of Alex Morgan. Specializing in high-performance Next.js architectures, distributed microservices, and modern UI engineering."
                  rows={3}
                  className="resize-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground">
                  Keywords (Comma-separated)
                </label>
                <Input
                  type="text"
                  {...register("seoKeywords")}
                  placeholder="Full-Stack Engineer, React, Node.js, TypeScript, Cloud Architect, Next.js"
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </form>
    </div>
  );
}
