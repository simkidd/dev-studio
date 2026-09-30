"use client";

import { ChromeSparkleIcon } from "@/components/ui/icons";
import { TechIcon } from "@/components/ui/tech-icon";
import { ProjectCard } from "@/components/public/cards/project-card";
import {
  usePosts,
  useProfile,
  useProjects,
  useSkills,
  useTestimonials,
} from "@/hooks";
import { IPost, IProject, ITestimonial } from "@/interfaces";
import { formatDate } from "@/lib/date.utils";
import {
  ArrowUpRight,
  ChevronRight,
  Layers,
  MapPin,
  Quote,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function HomeView() {
  const { data: profile } = useProfile();
  const { data: projectsRes, isLoading: projectsLoading } = useProjects({
    featured: true,
  });
  const { data: skills = [] } = useSkills();
  const { data: testimonials = [] } = useTestimonials();
  const { data: postsRes } = usePosts({ limit: 3 });

  const projects: IProject[] = projectsRes?.data || [];
  const posts: IPost[] = postsRes?.data || [];

  // Featured top skills selected in dashboard CMS
  const topSkills = skills.filter((s) => s.isTopSkill);
  const displayFeaturedSkills =
    topSkills.length > 0 ? topSkills : skills.slice(0, 8);

  const firstName = profile?.firstName || "Developer";
  const lastName = profile?.lastName || "Portfolio";
  const fullName = profile
    ? `${firstName} ${lastName}`.trim()
    : "Developer Portfolio";
  const headline =
    profile?.headline || "Full-Stack Engineer & Systems Architect";
  const bio =
    profile?.bio ||
    "I engineer high-throughput systems, resilient web architectures, and high-performance digital experiences.";
  const location = profile?.location || "Remote";
  const avatarUrl = profile?.avatarUrl || "";
  const isAvailable = profile?.isAvailableForHire ?? true;

  return (
    <div className="space-y-28 sm:space-y-36">
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
          <div className="relative max-w-4xl mx-auto">
            <h1 className="text-3xl xs:text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-foreground uppercase leading-[1.05] select-none text-center">
              <span className="inline-flex items-center justify-center gap-3 sm:gap-5 flex-wrap">
                <span>{headline}</span>
                <ChromeSparkleIcon className="w-6 h-6 sm:w-10 sm:h-10 text-primary animate-pulse inline-block shrink-0" />
              </span>
            </h1>
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
            <span>View All Works</span>
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
              <ProjectCard
                key={project._id}
                project={project}
              />
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
          5. FEATURED CORE SKILLS & TECHNICAL STACK
      ───────────────────────────────────────────────────────────── */}
      {displayFeaturedSkills.length > 0 && (
        <section
          id="skills"
          className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8 scroll-mt-24"
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border/80 pb-4">
            <div>
              <div className="flex items-center gap-2 text-primary pb-1">
                <ChromeSparkleIcon className="w-3.5 h-3.5" />
                <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground font-semibold">
                  Technical Stack
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                Technologies & Core Tooling
              </h2>
            </div>

            <Link
              href="/services"
              className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline self-start sm:self-auto"
            >
              <span>View All Technologies</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Featured Skills Grid */}
          <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {displayFeaturedSkills.map((skill) => (
              <div
                key={skill._id || skill.name}
                className="p-4 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/80 hover:border-primary/50 text-center space-y-2.5 transition-all hover:scale-102 shadow-xs group"
              >
                <div className="w-10 h-10 rounded-xl bg-muted/70 border border-border/60 flex items-center justify-center mx-auto p-2 group-hover:border-primary/40 group-hover:shadow-xs transition-all">
                  <TechIcon
                    name={skill.name}
                    icon={skill.icon}
                    size={22}
                    className="transition-transform group-hover:scale-110"
                  />
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

                <div className="pt-3 border-t border-border/60">
                  <h4 className="text-xs font-bold text-foreground">
                    {test.clientName}
                  </h4>
                  <p className="text-[11px] text-muted-foreground">
                    {test.clientRole} {test.company && `@ ${test.company}`}
                  </p>
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
                      {formatDate(post.createdAt)}
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
    </div>
  );
}
