"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  useProfile,
  useProjects,
  useSkills,
  useExperiences,
  usePosts,
  useTestimonials,
  useSubmitContactMessage,
} from "@/hooks";
import { IProject, ISkill, IExperience, IPost, ITestimonial } from "@/interfaces";
import {
  ArrowRight,
  Sparkles,
  Layers,
  Code2,
  Briefcase,
  FileText,
  Star,
  Send,
  ExternalLink,
  Calendar,
  Clock,
  TrendingUp,
  Cpu,
  CheckCircle2,
  Terminal,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/icons";
import { formatDate, formatMonthYear } from "@/lib/date.utils";

export interface ContactFormData {
  senderName: string;
  senderEmail: string;
  company?: string;
  budgetRange?: string;
  subject?: string;
  message: string;
}

export function HomeView() {
  const [activeCategory, setActiveCategory] = useState("all");

  const { data: profile } = useProfile();
  const { data: projectsResponse, isLoading: projectsLoading } = useProjects({
    status: "published",
    limit: 6,
  });
  const { data: skills = [], isLoading: skillsLoading } = useSkills();
  const { data: rawExperiences = [], isLoading: expLoading } = useExperiences();
  const { data: postsResponse, isLoading: postsLoading } = usePosts({
    status: "published",
    limit: 3,
  });
  const { data: testimonials = [], isLoading: testLoading } = useTestimonials();

  const submitContactMutation = useSubmitContactMessage();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    defaultValues: {
      senderName: "",
      senderEmail: "",
      company: "",
      budgetRange: "$10,000 - $25,000",
      subject: "High-Throughput Full-Stack Project Inquiry",
      message: "",
    },
  });

  const onSubmitContact = (data: ContactFormData) => {
    submitContactMutation.mutate(data, {
      onSuccess: () => {
        reset();
      },
    });
  };

  const projects: IProject[] = projectsResponse?.data || [];
  const featuredProjects =
    projects.filter((p: IProject) => p.isFeatured).length > 0
      ? projects.filter((p: IProject) => p.isFeatured)
      : projects;

  const posts: IPost[] = postsResponse?.data || [];

  const experiences = React.useMemo(() => {
    return [...rawExperiences].sort((a, b) => {
      if (a.isCurrent && !b.isCurrent) return -1;
      if (!a.isCurrent && b.isCurrent) return 1;

      const timeA = new Date(a.startDate).getTime();
      const timeB = new Date(b.startDate).getTime();
      if (timeA !== timeB) return timeB - timeA;

      const endA = a.endDate ? new Date(a.endDate).getTime() : 0;
      const endB = b.endDate ? new Date(b.endDate).getTime() : 0;
      return endB - endA;
    });
  }, [rawExperiences]);

  const skillCategories = [
    "all",
    "Languages",
    "Frontend",
    "Backend",
    "Database",
    "DevOps/Cloud",
    "Architecture",
  ];

  const filteredSkills =
    activeCategory === "all"
      ? skills
      : skills.filter((s: ISkill) => s.category === activeCategory);

  return (
    <div className="space-y-32 pt-28 pb-16">
      {/* 1. HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl space-y-8">
          {/* Availability Pill */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-card border border-border text-xs font-mono text-muted-foreground shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-sm shadow-emerald-500" />
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Available for Q4/Q1</span>
            <span className="text-muted-foreground/60">•</span>
            <span className="text-foreground">Staff Architecture & $10k–$50k Contracts</span>
          </div>

          {/* Headline */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-foreground tracking-tight leading-[1.08]">
              Engineering High-Throughput Systems &{" "}
              <span className="bg-gradient-to-r from-primary via-indigo-400 to-emerald-400 bg-clip-text text-transparent">
                Exceptional Web Products.
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground font-normal leading-relaxed max-w-2xl">
              I partner with founders and engineering leaders to design scalable software architectures, reduce p99 latencies, and ship polished digital flagships.
            </p>
          </div>

          {/* Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-y border-border">
            <div className="space-y-0.5">
              <span className="text-2xl sm:text-3xl font-bold font-mono text-foreground tracking-tight">
                $50M+
              </span>
              <p className="text-xs text-muted-foreground">Processed ARR Supported</p>
            </div>
            <div className="space-y-0.5">
              <span className="text-2xl sm:text-3xl font-bold font-mono text-emerald-600 dark:text-emerald-400 tracking-tight">
                99.99%
              </span>
              <p className="text-xs text-muted-foreground">Production Uptime SLA</p>
            </div>
            <div className="space-y-0.5">
              <span className="text-2xl sm:text-3xl font-bold font-mono text-primary tracking-tight">
                -65%
              </span>
              <p className="text-xs text-muted-foreground">P99 Latency Reduction</p>
            </div>
            <div className="space-y-0.5">
              <span className="text-2xl sm:text-3xl font-bold font-mono text-foreground tracking-tight">
                10+ Yrs
              </span>
              <p className="text-xs text-muted-foreground">Production Experience</p>
            </div>
          </div>

          {/* Hero CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#projects"
              className="px-6 py-3.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-xs sm:text-sm font-semibold shadow-sm flex items-center gap-2 group transition-all"
            >
              <span>Explore Case Studies</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#contact"
              className="px-6 py-3.5 rounded-xl bg-card hover:bg-accent border border-border text-foreground text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2"
            >
              <Terminal className="w-4 h-4 text-primary" />
              <span>Inquire & Book Discovery Call</span>
            </a>
          </div>
        </div>
      </section>

      {/* 2. FEATURED CASE STUDIES / PROJECTS */}
      <section id="projects" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 scroll-mt-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 text-primary border border-primary/20 text-xs font-mono font-medium mb-3">
              <Layers className="w-3.5 h-3.5" />
              <span>SELECTED ARCHITECTURAL WORKS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
              Featured Case Studies & Engineering Deliverables
            </h2>
            <p className="text-muted-foreground text-sm mt-1 max-w-2xl">
              Deep architectural audits, high-scale microservices, and bespoke enterprise user interfaces.
            </p>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projectsLoading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="bg-card border border-border rounded-2xl p-6 h-80 animate-pulse"
              />
            ))
          ) : featuredProjects.length === 0 ? (
            <div className="col-span-full py-20 text-center bg-card border border-border rounded-2xl">
              <Layers className="w-10 h-10 text-muted-foreground mx-auto mb-2 opacity-60" />
              <p className="text-sm font-semibold text-foreground">No projects published yet</p>
              <p className="text-xs text-muted-foreground mt-1">
                Add case studies via the Admin CMS.
              </p>
            </div>
          ) : (
            featuredProjects.map((project: IProject) => (
              <div
                key={project._id}
                className="bg-card border border-border hover:border-primary/40 rounded-2xl overflow-hidden transition-all group flex flex-col justify-between shadow-sm hover:shadow-md"
              >
                {/* Project Header Image / Preview */}
                <div className="relative h-60 bg-muted overflow-hidden border-b border-border">
                  {project.thumbnailUrl ? (
                    <img
                      src={project.thumbnailUrl}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-muted/60 p-6 text-center">
                      <Cpu className="w-10 h-10 text-primary/40 mb-2" />
                      <span className="text-sm font-bold text-foreground">
                        {project.title}
                      </span>
                    </div>
                  )}

                  {/* Impact Metric Overlay Badge */}
                  {project.metrics && project.metrics.length > 0 && (
                    <div className="absolute bottom-3 left-3 bg-background/90 backdrop-blur-md border border-border px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-sm">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span className="text-xs font-mono font-bold text-foreground">
                        {project.metrics[0].value}
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        {project.metrics[0].label}
                      </span>
                    </div>
                  )}
                </div>

                {/* Body Content */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <span className="text-xs font-mono text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20">
                        {project.category}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {project.summary}
                    </p>
                  </div>

                  {/* Tech stack badges */}
                  <div className="space-y-4 pt-4 border-t border-border">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {project.technologies.slice(0, 5).map((tech: string) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded text-[10px] font-mono bg-muted text-muted-foreground border border-border"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-3">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                          >
                            <span>Live System</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-foreground"
                          >
                            <GithubIcon className="w-3.5 h-3.5" />
                            <span>Repository</span>
                          </a>
                        )}
                      </div>

                      {project.metrics && project.metrics.length > 1 && (
                        <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-medium">
                          +{project.metrics[1].value} {project.metrics[1].label}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* 3. INTERACTIVE TECH MATRIX */}
      <section id="tech-stack" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 scroll-mt-24">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 text-primary border border-primary/20 text-xs font-mono font-medium">
            <Code2 className="w-3.5 h-3.5" />
            <span>CORE ARCHITECTURAL COMPETENCIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
            Technical Stack & Production Mastery
          </h2>
          <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
            Battle-tested frameworks, distributed paradigms, and cloud primitives utilized in enterprise production.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {skillCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-accent"
              }`}
            >
              {cat === "all" ? "All Domains" : cat}
            </button>
          ))}
        </div>

        {/* Skill Matrix Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skillsLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-card border border-border rounded-xl p-4 h-24 animate-pulse"
              />
            ))
          ) : filteredSkills.length === 0 ? (
            <div className="col-span-full py-12 text-center text-muted-foreground text-xs font-mono">
              No skills listed for this category.
            </div>
          ) : (
            filteredSkills.map((skill: ISkill) => (
              <div
                key={skill._id}
                className="bg-card border border-border hover:border-primary/40 rounded-xl p-4 transition-all group shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                        {skill.name}
                      </span>
                      {skill.isTopSkill && (
                        <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                          CORE
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] font-mono text-primary">
                      {skill.category}
                    </span>
                  </div>

                  <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    {skill.proficiency ?? 90}%
                  </span>
                </div>

                <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden mt-3">
                  <div
                    className="h-full bg-gradient-to-r from-primary via-indigo-400 to-emerald-400 rounded-full"
                    style={{ width: `${skill.proficiency ?? 90}%` }}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* 4. CAREER TIMELINE & LEADERSHIP */}
      <section id="experience" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 scroll-mt-24">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 text-primary border border-primary/20 text-xs font-mono font-medium mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            <span>PROVEN TRACK RECORD</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
            Career Timeline & Measurable Impact
          </h2>
          <p className="text-muted-foreground text-xs sm:text-sm mt-1 max-w-xl">
            A history of driving technical roadmaps, leading distributed engineering teams, and solving complex scalability challenges.
          </p>
        </div>

        <div className="space-y-6 relative before:absolute before:inset-0 before:left-3.5 sm:before:left-4 before:w-0.5 before:bg-border">
          {expLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="bg-card border border-border rounded-xl p-6 ml-10 animate-pulse h-36"
              />
            ))
          ) : experiences.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground text-xs font-mono bg-card rounded-xl border border-border ml-10">
              No career history recorded.
            </div>
          ) : (
            experiences.map((exp: IExperience) => (
              <div key={exp._id} className="relative pl-10">
                {/* Timeline node icon */}
                <div className="absolute left-1.5 sm:left-2 top-4 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-2 border-background shadow-sm" />

                <div className="bg-card border border-border hover:border-primary/40 rounded-xl p-6 transition-all space-y-3 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span className="text-base font-bold text-foreground">
                          {exp.role}
                        </span>
                        <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20">
                          @{exp.company}
                        </span>
                        {exp.isCurrent && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                            Present Role
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="text-xs font-mono text-muted-foreground flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                      {formatMonthYear(exp.startDate)} -{" "}
                      {exp.isCurrent
                        ? "Present"
                        : exp.endDate
                        ? formatMonthYear(exp.endDate)
                        : "Present"}
                    </div>
                  </div>

                  {exp.summary && (
                    <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed">
                      {exp.summary}
                    </p>
                  )}

                  {exp.achievements && exp.achievements.length > 0 && (
                    <ul className="space-y-1.5 pt-1">
                      {exp.achievements.map((h: string, idx: number) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-xs text-foreground/80"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {exp.technologies && exp.technologies.length > 0 && (
                    <div className="flex items-center gap-1.5 flex-wrap pt-2">
                      {exp.technologies.map((t: string) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded text-[10px] font-mono bg-muted text-muted-foreground border border-border"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* 5. CLIENT & PEER ENDORSEMENTS / TESTIMONIALS */}
      <section id="testimonials" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 scroll-mt-24">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 text-primary border border-primary/20 text-xs font-mono font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>LEADERSHIP SOCIAL PROOF</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
            Client & Executive Endorsements
          </h2>
          <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
            Recommendations from VP of Engineering leaders, startup founders, and technical directors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="bg-card border border-border rounded-2xl p-6 h-56 animate-pulse"
              />
            ))
          ) : testimonials.length === 0 ? (
            <div className="col-span-full py-12 text-center text-muted-foreground text-xs font-mono bg-card rounded-2xl border border-border">
              No testimonials yet.
            </div>
          ) : (
            testimonials.map((t: ITestimonial) => (
              <div
                key={t._id}
                className="bg-card border border-border hover:border-primary/40 rounded-2xl p-6 flex flex-col justify-between transition-all group shadow-sm"
              >
                <div className="space-y-4">
                  {/* Star rating */}
                  <div className="flex items-center gap-1 text-amber-400">
                    {Array.from({ length: t.rating || 5 }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>

                  <p className="text-xs sm:text-sm text-foreground/85 italic leading-relaxed">
                    "{t.quote}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-6 border-t border-border mt-6">
                  <div className="w-9 h-9 rounded-full bg-muted border border-border flex items-center justify-center font-bold text-foreground text-xs overflow-hidden shrink-0">
                    {t.avatarUrl ? (
                      <img
                        src={t.avatarUrl}
                        alt={t.clientName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      t.clientName.charAt(0).toUpperCase()
                    )}
                  </div>
                  <div>
                    <span className="font-bold text-foreground text-xs block">
                      {t.clientName}
                    </span>
                    <span className="text-[11px] text-muted-foreground font-mono block">
                      {t.clientRole}
                      {t.company ? ` @ ${t.company}` : ""}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* 6. ENGINEERING INSIGHTS & ARTICLES */}
      <section id="articles" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 scroll-mt-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 text-primary border border-primary/20 text-xs font-mono font-medium mb-3">
              <FileText className="w-3.5 h-3.5" />
              <span>TECHNICAL WRITING</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
              Engineering Insights & Deep Dives
            </h2>
            <p className="text-muted-foreground text-xs sm:text-sm mt-1 max-w-xl">
              Architectural breakdowns, concurrency patterns, and lessons from building scalable systems.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {postsLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="bg-card border border-border rounded-2xl p-6 h-64 animate-pulse"
              />
            ))
          ) : posts.length === 0 ? (
            <div className="col-span-full py-12 text-center text-muted-foreground text-xs font-mono bg-card rounded-2xl border border-border">
              No articles published yet.
            </div>
          ) : (
            posts.map((post: IPost) => (
              <div
                key={post._id}
                className="bg-card border border-border hover:border-primary/40 rounded-2xl p-6 flex flex-col justify-between transition-all group shadow-sm"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground">
                    <span>{formatDate(post.createdAt)}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-muted-foreground" />
                      {post.readingTimeMinutes || 5} min
                    </span>
                  </div>

                  <h3 className="font-bold text-foreground text-base group-hover:text-primary transition-colors leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 flex-wrap pt-4 mt-4 border-t border-border">
                  {post.tags.slice(0, 3).map((t: string) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-muted text-muted-foreground border border-border"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* 7. INQUIRY / DISCOVERY CONTACT FORM (react-hook-form) */}
      <section id="contact" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 scroll-mt-24">
        <div className="bg-card border border-border rounded-3xl p-6 sm:p-12 shadow-md relative overflow-hidden">
          {/* Ambient corner glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="space-y-4 mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 text-primary border border-primary/20 text-xs font-mono font-medium">
              <Send className="w-3.5 h-3.5" />
              <span>DIRECT INQUIRY CHANNEL</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
              Start an Architectural Consultation
            </h2>
            <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed max-w-xl">
              Tell me about your system scope, timeline, and architectural objectives. I review every submission personally and respond within 12 hours.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmitContact)} className="space-y-5 relative z-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground">Your Name *</label>
                <input
                  type="text"
                  {...register("senderName", { required: "Name is required" })}
                  placeholder="e.g. David Vance"
                  className="w-full bg-background border border-border focus:border-primary rounded-xl px-4 py-3 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none transition-colors"
                />
                {errors.senderName && (
                  <span className="text-[10px] text-destructive">{errors.senderName.message}</span>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground">Work Email *</label>
                <input
                  type="email"
                  {...register("senderEmail", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email address",
                    },
                  })}
                  placeholder="e.g. david@company.com"
                  className="w-full bg-background border border-border focus:border-primary rounded-xl px-4 py-3 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none transition-colors"
                />
                {errors.senderEmail && (
                  <span className="text-[10px] text-destructive">{errors.senderEmail.message}</span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground">Company / Organization</label>
                <input
                  type="text"
                  {...register("company")}
                  placeholder="e.g. Fintech Dynamics"
                  className="w-full bg-background border border-border focus:border-primary rounded-xl px-4 py-3 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground">Target Budget / Engagement Scope</label>
                <select
                  {...register("budgetRange")}
                  className="w-full bg-background border border-border focus:border-primary rounded-xl px-4 py-3 text-xs text-foreground focus:outline-none transition-colors"
                >
                  <option value="$5,000 - $10,000">$5,000 - $10,000 (Sprint Audit / POC)</option>
                  <option value="$10,000 - $25,000">$10,000 - $25,000 (Full-Stack Architecture / Build)</option>
                  <option value="$25,000 - $50,000+">$25,000 - $50,000+ (Flagship Platform / Re-Architecture)</option>
                  <option value="Full-Time ($150k - $250k+ / yr)">Full-Time Staff/Lead Role ($150k - $250k+ / yr)</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground">Project Overview & Objectives *</label>
              <textarea
                {...register("message", { required: "Message is required" })}
                placeholder="Describe your product requirements, current architectural bottlenecks, target timelines..."
                rows={5}
                className="w-full bg-background border border-border focus:border-primary rounded-xl p-4 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none transition-colors resize-none"
              />
              {errors.message && (
                <span className="text-[10px] text-destructive">{errors.message.message}</span>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting || submitContactMutation.isPending}
              className="w-full py-3.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-xs sm:text-sm font-semibold shadow-sm flex items-center justify-center gap-2 group transition-all disabled:opacity-50 cursor-pointer"
            >
              <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              <span>
                {submitContactMutation.isPending
                  ? "Transmitting Inquiry..."
                  : "Dispatch Inquiry to Alex Morgan"}
              </span>
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
