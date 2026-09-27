"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  useProfile,
  useProjects,
  useSkills,
  useTestimonials,
  usePosts,
  useSubmitContactMessage,
} from "@/hooks";
import { IProject, ITestimonial, IPost } from "@/interfaces";
import {
  ArrowUpRight,
  ArrowDown,
  ExternalLink,
  Mail,
  Briefcase,
  MapPin,
  CheckCircle2,
  Send,
  Loader2,
  Layers,
  Code2,
  Quote,
  ChevronRight,
} from "lucide-react";
import {
  GithubIcon,
  LinkedinIcon,
  TwitterIcon,
  ChromeSparkleIcon,
} from "@/components/ui/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function HomeView() {
  const { data: profile } = useProfile();
  const { data: projectsRes, isLoading: projectsLoading } = useProjects({
    featured: true,
  });
  const { data: skills = [] } = useSkills();
  const { data: testimonials = [] } = useTestimonials();
  const { data: postsRes } = usePosts({ limit: 3 });
  const submitMessageMutation = useSubmitContactMessage();

  const projects: IProject[] = projectsRes?.data || [];
  const posts: IPost[] = postsRes?.data || [];

  // Contact form local state
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactSubject, setContactSubject] = useState("");
  const [contactMessage, setContactMessage] = useState("");

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactEmail.trim() || !contactMessage.trim()) {
      toast.error("Please fill in your name, email, and message.");
      return;
    }

    submitMessageMutation.mutate(
      {
        senderName: contactName.trim(),
        senderEmail: contactEmail.trim(),
        subject: contactSubject.trim() || "Project Inquiry via Portfolio",
        message: contactMessage.trim(),
      },
      {
        onSuccess: () => {
          setContactName("");
          setContactEmail("");
          setContactSubject("");
          setContactMessage("");
        },
      },
    );
  };

  const firstName = profile?.firstName || "Developer";
  const lastName = profile?.lastName || "Portfolio";
  const fullName = profile ? `${firstName} ${lastName}`.trim() : "Developer Portfolio";
  const headline =
    profile?.headline || "Full-Stack Engineer & Systems Architect";
  const bio =
    profile?.bio ||
    "I engineer high-throughput systems, resilient web architectures, and high-performance digital experiences.";
  const location = profile?.location || "Remote";
  const avatarUrl = profile?.avatarUrl || "";
  const isAvailable = profile?.isAvailableForHire ?? true;

  const headlineWords = (headline || "Software Engineer").trim().split(/\s+/);
  const midpoint = Math.ceil(headlineWords.length / 2);
  const titleLine1 = headlineWords.slice(0, midpoint).join(" ");
  const titleLine2 = headlineWords.slice(midpoint).join(" ");

  return (
    <div className="space-y-28 sm:space-y-36 pb-20">
      {/* ─────────────────────────────────────────────────────────────
          1. HERO SECTION (Mega Editorial Headline + Portrait Frame)
      ───────────────────────────────────────────────────────────── */}
      <section className="relative pt-28 sm:pt-36 min-h-[90vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[850px] h-[350px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-5xl mx-auto space-y-8 relative z-10 w-full flex flex-col items-center">
          {/* Metadata Badges Header */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 text-xs font-mono text-muted-foreground">
            <span className="hidden sm:inline-flex items-center gap-1 px-3 py-1 rounded-full bg-muted/80 border border-border/80">
              <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
              <span>{location}</span>
            </span>
          </div>

          {/* Mega Typography Header with 3D Chrome Sparkles */}
          <div className="space-y-3 relative">
            <div className="flex items-center justify-center gap-3 sm:gap-6">
              <ChromeSparkleIcon className="w-5 h-5 sm:w-8 sm:h-8 text-primary animate-pulse shrink-0" />
              <h1 className="text-3xl xs:text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-foreground uppercase leading-none select-none">
                {titleLine1}
              </h1>
              <ChromeSparkleIcon className="w-5 h-5 sm:w-8 sm:h-8 text-primary animate-pulse shrink-0 hidden xs:block" />
            </div>
            {titleLine2 && (
              <div className="flex items-center justify-center gap-3 sm:gap-6">
                <h1 className="text-3xl xs:text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-foreground uppercase leading-none select-none text-transparent bg-clip-text bg-linear-to-r from-foreground via-foreground/90 to-foreground/60">
                  {titleLine2}
                </h1>
                <ChromeSparkleIcon className="w-5 h-5 sm:w-8 sm:h-8 text-primary animate-pulse shrink-0 block xs:hidden" />
              </div>
            )}
          </div>

          {/* Subtitle / Value Proposition */}
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-muted-foreground leading-relaxed px-4 pt-2">
            {profile?.subHeadline || bio}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/projects"
              className="px-6 py-3 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground text-xs sm:text-sm font-semibold shadow-lg shadow-primary/20 flex items-center gap-2 transition-all hover:scale-102 active:scale-98 cursor-pointer"
            >
              <span>Explore Selected Works</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 rounded-full bg-card hover:bg-muted text-foreground text-xs sm:text-sm font-medium border border-border shadow-xs flex items-center gap-2 transition-all cursor-pointer"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. STRATEGIC PHILOSOPHY & ELEVATOR BIO
      ───────────────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="p-8 sm:p-14 rounded-3xl bg-card/60 dark:bg-card/40 border border-border/80 backdrop-blur-md space-y-8 shadow-xs relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center gap-2 text-primary">
            <ChromeSparkleIcon className="w-4 h-4" />
            <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground font-semibold">
              Engineering Philosophy
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
            Building Digital Experiences with Precision and Purpose.
          </h2>

          <p className="text-sm sm:text-lg text-muted-foreground leading-relaxed">
            {bio}
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-4">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-primary hover:underline"
            >
              <span>Read complete career journey & values</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. SELECTED WORKS / FEATURED PROJECTS (Ambient Glow Cards)
      ───────────────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8 scroll-mt-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border/80 pb-4">
          <div>
            <div className="flex items-center gap-2 text-primary pb-1">
              <ChromeSparkleIcon className="w-3.5 h-3.5" />
              <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground font-semibold">
                Portfolio Showcase
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Selected Works & Flagship Builds
            </h2>
          </div>

          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline self-start sm:self-auto"
          >
            <span>View All Works ({projects.length})</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {projectsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="h-96 rounded-3xl bg-card border border-border animate-pulse"
              />
            ))}
          </div>
        ) : projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.slice(0, 4).map((project: IProject) => (
              <div
                key={project._id}
                className="group relative rounded-3xl bg-card border border-border/80 hover:border-primary/50 overflow-hidden shadow-xs hover:shadow-2xl transition-all duration-300 flex flex-col"
              >
                {/* Thumbnail */}
                <div className="relative aspect-[16/10] w-full bg-muted/80 overflow-hidden">
                  {project.thumbnailUrl ? (
                    <Image
                      src={project.thumbnailUrl}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground font-mono text-xs">
                      No Preview Available
                    </div>
                  )}

                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full bg-background/85 border border-border backdrop-blur-md text-[10px] font-mono font-semibold text-foreground">
                      {project.category || "Full-Stack"}
                    </span>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-base sm:text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                          title="Live Demo"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {project.summary}
                    </p>
                  </div>

                  {/* Tech Tags & Read More */}
                  <div className="pt-2 border-t border-border/60 flex items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {(project.technologies || [])
                        .slice(0, 3)
                        .map((tech: string) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 rounded-md bg-muted text-[10px] font-mono text-muted-foreground"
                          >
                            {tech}
                          </span>
                        ))}
                    </div>

                    <Link
                      href={`/projects/${project.slug}`}
                      className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1 shrink-0"
                    >
                      <span>Details</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center rounded-3xl bg-card border border-border space-y-2">
            <Layers className="w-8 h-8 text-muted-foreground mx-auto" />
            <p className="text-sm font-semibold text-foreground">
              No featured projects yet
            </p>
            <p className="text-xs text-muted-foreground">
              Add projects marked as featured in the CMS.
            </p>
          </div>
        )}
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. SKILLS & TECHNICAL STACK MATRIX
      ───────────────────────────────────────────────────────────── */}
      {skills.length > 0 && (
        <section className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8 scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border/80 pb-4">
            <div>
              <div className="flex items-center gap-2 text-primary pb-1">
                <ChromeSparkleIcon className="w-3.5 h-3.5" />
                <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground font-semibold">
                  Technical Stack
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                Technologies & Tooling
              </h2>
            </div>
            <p className="text-xs font-mono text-muted-foreground">
              {skills.length} core technical proficiencies
            </p>
          </div>

          <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {skills.map((skill) => (
              <div
                key={skill._id}
                className="p-4 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/80 hover:border-primary/50 text-center space-y-2 transition-all hover:scale-102 shadow-xs group"
              >
                <div className="w-8 h-8 rounded-xl bg-muted flex items-center justify-center mx-auto text-primary font-bold text-xs group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Code2 className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground truncate">
                    {skill.name}
                  </p>
                  <p className="text-[10px] text-muted-foreground font-mono capitalize">
                    {skill.category || "Tool"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────────────────────
          7. TESTIMONIALS & ENDORSEMENTS
      ───────────────────────────────────────────────────────────── */}
      {testimonials.length > 0 && (
        <section
          id="testimonials"
          className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8 scroll-mt-24"
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border/80 pb-4">
            <div>
              <div className="flex items-center gap-2 text-primary pb-1">
                <ChromeSparkleIcon className="w-3.5 h-3.5" />
                <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground font-semibold">
                  Social Proof
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                Client & Peer Endorsements
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((test: ITestimonial) => (
              <div
                key={test._id}
                className="p-6 sm:p-8 rounded-3xl bg-card/60 dark:bg-card/40 border border-border/80 space-y-4 shadow-xs flex flex-col justify-between"
              >
                <Quote className="w-6 h-6 text-primary/40" />
                <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed italic">
                  &ldquo;{test.quote}&rdquo;
                </p>

                <div className="flex items-center gap-3 pt-3 border-t border-border/60">
                  <Avatar className="w-10 h-10 rounded-full border border-border">
                    <AvatarImage src={test.avatarUrl} alt={test.clientName} />
                    <AvatarFallback className="font-bold text-xs bg-primary/15 text-primary">
                      {test.clientName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="text-xs font-bold text-foreground">
                      {test.clientName}
                    </h4>
                    <p className="text-[11px] text-muted-foreground">
                      {test.clientRole} {test.company && `@ ${test.company}`}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────────────────────
          8. RECENT WRITING & INSIGHTS
      ───────────────────────────────────────────────────────────── */}
      {posts.length > 0 && (
        <section
          id="articles"
          className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8 scroll-mt-24"
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border/80 pb-4">
            <div>
              <div className="flex items-center gap-2 text-primary pb-1">
                <ChromeSparkleIcon className="w-3.5 h-3.5" />
                <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground font-semibold">
                  Technical Writing
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                Articles & Architecture Thoughts
              </h2>
            </div>

            <Link
              href="/blog"
              className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline self-start sm:self-auto"
            >
              <span>View All Articles</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-3">
            {posts.map((post: IPost) => (
              <Link
                key={post._id}
                href={`/blog/${post.slug}`}
                className="group p-5 sm:p-6 rounded-2xl bg-card/60 dark:bg-card/40 hover:bg-card border border-border/80 hover:border-primary/50 transition-all duration-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-muted-foreground">
                      {new Date(
                        post.createdAt || Date.now(),
                      ).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <span className="text-[10px] font-mono text-muted-foreground">
                      •
                    </span>
                    <span className="text-[10px] font-mono text-primary font-medium">
                      {post.tags?.[0] || "Engineering"}
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-foreground group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                </div>

                <div className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground group-hover:text-primary transition-colors shrink-0">
                  <span>Read Article</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────────────────────
          9. INTERACTIVE CONTACT TERMINAL & INQUIRY FORM
      ───────────────────────────────────────────────────────────── */}
      <section
        id="contact"
        className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8 scroll-mt-24"
      >
        <div className="p-8 sm:p-12 rounded-3xl bg-card border border-border shadow-xl space-y-8 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

          <div className="space-y-3 relative z-10">
            <div className="flex items-center gap-2 text-primary">
              <ChromeSparkleIcon className="w-4 h-4" />
              <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground font-semibold">
                Direct Inquiry
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight">
              Let&apos;s Build Something Remarkable Together.
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-xl leading-relaxed">
              Have an upcoming product build, architecture advisory need, or
              contracting role? Send a message directly to my inbox.
            </p>
          </div>

          <form
            onSubmit={handleContactSubmit}
            className="space-y-4 relative z-10"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground">
                  Your Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="your.email@company.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground">
                Subject / Project Scope
              </label>
              <input
                type="text"
                value={contactSubject}
                onChange={(e) => setContactSubject(e.target.value)}
                placeholder="e.g. Next.js Enterprise Re-architecture & Staff Advisory"
                className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground">
                Project Details & Requirements *
              </label>
              <textarea
                required
                rows={4}
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
                placeholder="Tell me about your product vision, timeline, stack, and goals..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none leading-relaxed"
              />
            </div>

            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-[11px] font-mono text-muted-foreground">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Encrypted transmission directly to CRM</span>
              </div>

              <button
                type="submit"
                disabled={submitMessageMutation.isPending}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold shadow-md shadow-primary/20 flex items-center justify-center gap-2 transition-all hover:scale-102 active:scale-98 disabled:opacity-50 cursor-pointer"
              >
                {submitMessageMutation.isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                <span>Send Direct Inquiry</span>
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
