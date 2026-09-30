import { IPublicPortfolioBundle, PortfolioTemplateId } from "@/interfaces";

export const ALEX_MORGAN_DEMO_BUNDLE: IPublicPortfolioBundle = {
  portfolio: {
    _id: "demo-alex-portfolio",
    userId: "demo-alex-user",
    slug: "alex-morgan",
    templateId: "nova-engine",
    isPublished: true,
    publishedAt: "2026-01-15T00:00:00.000Z",
    seoTitle: "Alex Morgan | Senior Staff Architect & Systems Engineer",
    seoDescription: "Official developer portfolio of Alex Morgan - Distributed Systems, Kubernetes, and Next.js.",
    themePreference: "dark",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-03-01T00:00:00.000Z",
  },
  profile: {
    firstName: "Alex",
    lastName: "Morgan",
    headline: "Senior Staff Full-Stack & Distributed Systems Architect",
    subHeadline: "Building resilient enterprise microservices, high-throughput data pipelines, and flagship web experiences.",
    bio: "10+ years architecting web platforms handling $50M+ processed ARR, sub-50ms p99 latencies, and 99.99% uptime SLAs. Specializing in TypeScript, Next.js, React, Node.js, distributed caches, and cloud infrastructure.",
    aboutMarkdown: `Over the past decade, I've designed and scaled multi-tenant distributed systems for hyper-growth technology companies. My engineering philosophy centers around architectural simplicity, deterministic performance, and developer ergonomics.

Whether leading zero-downtime database migrations, building high-frequency telemetry pipelines, or crafting tactile frontend interfaces in Next.js, I treat software engineering as a precision discipline.`,
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    resumeUrl: "https://example.com/alex-morgan-resume.pdf",
    location: "San Francisco, CA (Remote)",
    contactEmail: "alex@portfolio.dev",
    contactPhone: "+1 (415) 890-2341",
    isAvailableForHire: true,
    availabilityNote: "Systems online. Available for staff engineering leadership, advisory retainers, and mission-critical cloud migrations.",
    socialLinks: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      discord: "https://discord.com",
      email: "alex@portfolio.dev",
    },
    stats: {
      yearsExperience: 10,
      completedProjects: 42,
      happyClients: 18,
      codeCommits: 4800,
    },
  },
  projects: [
    {
      _id: "p1",
      title: "HyperScale Event Gateway",
      slug: "hyperscale-event-gateway",
      summary: "Distributed event mesh handling 1.2M req/sec with sub-5ms p99 latency across 8 global edge regions.",
      caseStudy: `### Architectural Overview
Designed and deployed a globally distributed event routing gateway designed for low-latency financial telemetry and multi-cloud webhooks.

### Key Milestones
- Engineered an in-memory ring-buffer pipeline utilizing Rust and Node.js worker pools.
- Reduced inter-region replication latency from 140ms to 18ms via QUIC edge routing.
- Integrated automated Prometheus monitoring and dynamic circuit-breaking to prevent cascading downstream failures.`,
      thumbnailUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
      galleryImages: [],
      technologies: ["TypeScript", "Next.js", "Rust", "Apache Kafka", "Redis", "Docker", "Kubernetes"],
      category: "Backend",
      liveUrl: "https://example.com/demo/gateway",
      githubUrl: "https://github.com/example/hyperscale-gateway",
      isFeatured: true,
      metrics: [
        { label: "Throughput", value: "1.2M req/s" },
        { label: "Latency (p99)", value: "4.8ms" },
        { label: "Global Nodes", value: "8 Regions" },
        { label: "Uptime SLA", value: "99.999%" },
      ],
      order: 1,
      isPublished: true,
      createdAt: "2026-01-10T00:00:00.000Z",
      updatedAt: "2026-02-15T00:00:00.000Z",
    },
    {
      _id: "p2",
      title: "OmniPulse Real-Time Telemetry HUD",
      slug: "omnipulse-telemetry-hud",
      summary: "Next.js & WebGL observability dashboard rendering 100,000+ live node metrics simultaneously at 60fps.",
      caseStudy: `### Engineering Details
A developer-first monitoring control plane providing real-time infrastructure visibility and intelligent anomaly detection across hybrid clouds.

### Technical Achievements
- Custom Canvas/WebGL charting engine rendering 100k data points with zero frame drops.
- WebSocket binary packet protocol reducing bandwidth overhead by 78%.
- Dark-mode ergonomic interface tailored for command centers and operations engineers.`,
      thumbnailUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
      galleryImages: [],
      technologies: ["React 19", "Next.js 15", "TypeScript", "TailwindCSS", "WebGL", "WebSockets"],
      category: "Frontend",
      liveUrl: "https://example.com/demo/omnipulse",
      githubUrl: "https://github.com/example/omnipulse-hud",
      isFeatured: true,
      metrics: [
        { label: "Render Rate", value: "60 FPS" },
        { label: "Live Nodes", value: "100k+" },
        { label: "Bandwidth Saved", value: "78%" },
      ],
      order: 2,
      isPublished: true,
      createdAt: "2026-01-20T00:00:00.000Z",
      updatedAt: "2026-02-20T00:00:00.000Z",
    },
    {
      _id: "p3",
      title: "Aether Cloud Infrastructure Synthesizer",
      slug: "aether-cloud-synthesizer",
      summary: "Declarative multi-cloud orchestration engine generating production-ready Terraform blueprints from visual system diagrams.",
      caseStudy: `### System Architecture
Transforms high-level visual architectural graphs into verified, compliant HCL and Kubernetes manifests in seconds.

### Key Capabilities
- Automated security posture checks against CIS benchmarks prior to blueprint generation.
- Zero-drift reconciliation engine synchronizing live AWS, GCP, and Azure state.`,
      thumbnailUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
      galleryImages: [],
      technologies: ["Go", "Node.js", "Terraform", "AWS", "GCP", "PostgreSQL"],
      category: "DevOps",
      liveUrl: "https://example.com/demo/aether",
      githubUrl: "https://github.com/example/aether-cloud",
      isFeatured: true,
      order: 3,
      isPublished: true,
      createdAt: "2026-02-01T00:00:00.000Z",
      updatedAt: "2026-02-28T00:00:00.000Z",
    },
  ],
  experiences: [
    {
      _id: "e1",
      company: "Apex Cloud Systems",
      role: "Principal Systems Architect",
      isRemote: true,
      startDate: "2023-01-01",
      isCurrent: true,
      summary: "Lead architecture for enterprise data infrastructure processing over 10 billion events weekly across global Kubernetes clusters.",
      achievements: [
        "Architected multi-region failover strategy saving $1.4M annually in cloud computing costs.",
        "Mentored a distributed team of 24 senior backend and infrastructure engineers.",
      ],
      technologies: ["Kubernetes", "Next.js", "TypeScript", "Kafka", "Rust", "Terraform"],
      createdAt: "2026-01-01T00:00:00.000Z",
      updatedAt: "2026-01-01T00:00:00.000Z",
    },
    {
      _id: "e2",
      company: "Vector Telemetry Inc",
      role: "Staff Infrastructure Engineer",
      isRemote: true,
      startDate: "2020-03-01",
      endDate: "2022-12-31",
      isCurrent: false,
      summary: "Built high-frequency time-series ingestion engines and real-time observability telemetry platforms.",
      achievements: [
        "Scaled time-series database ingestion from 50k to 800k metrics/sec.",
        "Built custom WebAssembly modules for browser-side data compression.",
      ],
      technologies: ["Go", "Node.js", "ClickHouse", "Docker", "AWS", "WebSockets"],
      createdAt: "2026-01-01T00:00:00.000Z",
      updatedAt: "2026-01-01T00:00:00.000Z",
    },
  ],
  skills: [
    { _id: "s1", name: "TypeScript", category: "Languages", proficiency: 98, order: 1, isTopSkill: true, createdAt: "2026-01-01T00:00:00.000Z", updatedAt: "2026-01-01T00:00:00.000Z" },
    { _id: "s2", name: "Next.js", category: "Frontend", proficiency: 95, order: 2, isTopSkill: true, createdAt: "2026-01-01T00:00:00.000Z", updatedAt: "2026-01-01T00:00:00.000Z" },
    { _id: "s3", name: "React", category: "Frontend", proficiency: 95, order: 3, isTopSkill: true, createdAt: "2026-01-01T00:00:00.000Z", updatedAt: "2026-01-01T00:00:00.000Z" },
    { _id: "s4", name: "Node.js", category: "Backend", proficiency: 92, order: 4, isTopSkill: true, createdAt: "2026-01-01T00:00:00.000Z", updatedAt: "2026-01-01T00:00:00.000Z" },
    { _id: "s5", name: "Kubernetes", category: "DevOps/Cloud", proficiency: 90, order: 5, isTopSkill: true, createdAt: "2026-01-01T00:00:00.000Z", updatedAt: "2026-01-01T00:00:00.000Z" },
    { _id: "s6", name: "PostgreSQL", category: "Database", proficiency: 90, order: 6, isTopSkill: true, createdAt: "2026-01-01T00:00:00.000Z", updatedAt: "2026-01-01T00:00:00.000Z" },
    { _id: "s7", name: "Redis", category: "Database", proficiency: 92, order: 7, isTopSkill: true, createdAt: "2026-01-01T00:00:00.000Z", updatedAt: "2026-01-01T00:00:00.000Z" },
    { _id: "s8", name: "Docker", category: "DevOps/Cloud", proficiency: 94, order: 8, isTopSkill: true, createdAt: "2026-01-01T00:00:00.000Z", updatedAt: "2026-01-01T00:00:00.000Z" },
  ],
  testimonials: [
    {
      _id: "t1",
      clientName: "David Vance",
      company: "FinTech Global",
      clientRole: "VP of Engineering",
      quote: "Alex transformed our distributed payment architecture. Unprecedented attention to latency benchmarks and system reliability.",
      isFeatured: true,
      isApproved: true,
      createdAt: "2026-01-15T00:00:00.000Z",
      updatedAt: "2026-01-15T00:00:00.000Z",
    },
  ],
  posts: [
    {
      _id: "post1",
      title: "Architecting Zero-Downtime Multi-Region Databases in 2026",
      slug: "architecting-zero-downtime-databases",
      excerpt: "A deep dive into distributed consensus, deterministic replication, and practical conflict resolution patterns.",
      content: `When scaling globally distributed database clusters, network partitions and speed-of-light constraints are immutable laws. In this guide, we dissect practical quorum configurations, active-active replication pipelines, and real-world fallback techniques for mission-critical platforms.

### 1. The Quorum Reality
Traditional single-primary databases fail under multi-region demands. By implementing consensus-backed replication trees, we achieve deterministic reads with sub-5ms local caches.`,
      coverImageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
      tags: ["Distributed Systems", "Database", "Architecture"],
      readingTimeMinutes: 6,
      viewsCount: 1420,
      likesCount: 88,
      isPublished: true,
      publishedAt: "2026-02-10T00:00:00.000Z",
      createdAt: "2026-02-10T00:00:00.000Z",
      updatedAt: "2026-02-10T00:00:00.000Z",
    },
    {
      _id: "post2",
      title: "Sub-50ms p99 Latency: Optimizing Next.js Edge Runtimes",
      slug: "sub-50ms-latency-nextjs-edge",
      excerpt: "Benchmarking server components, streaming SSR, and edge distributed caching to achieve instant global TTFB.",
      content: `Modern web users demand instantaneous page loads. By combining Next.js Server Components with globally replicated edge key-value stores, we can eliminate database waterfalls completely.

### 2. Streaming SSR & Partial Prerendering
Leveraging granular suspense boundaries allows initial HTML frames to reach clients in under 30ms, streaming dynamic payloads progressively as background promises resolve.`,
      coverImageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
      tags: ["Next.js", "Performance", "Frontend"],
      readingTimeMinutes: 5,
      viewsCount: 2310,
      likesCount: 142,
      isPublished: true,
      publishedAt: "2026-02-22T00:00:00.000Z",
      createdAt: "2026-02-22T00:00:00.000Z",
      updatedAt: "2026-02-22T00:00:00.000Z",
    },
  ],
};

export const ELENA_ROSTOVA_DEMO_BUNDLE: IPublicPortfolioBundle = {
  portfolio: {
    _id: "demo-elena-portfolio",
    userId: "demo-elena-user",
    slug: "elena-rostova",
    templateId: "apex-studio",
    isPublished: true,
    publishedAt: "2026-01-20T00:00:00.000Z",
    seoTitle: "Elena Rostova | Creative Technologist & Interaction Designer",
    seoDescription: "Bespoke digital flagships, WebGL interaction, and luxury frontend engineering.",
    themePreference: "system",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-03-01T00:00:00.000Z",
  },
  profile: {
    firstName: "Elena",
    lastName: "Rostova",
    headline: "Creative Technologist & Interaction Engineer",
    subHeadline: "Crafting bespoke digital flagships, WebGL 3D environments, and tactile luxury web platforms.",
    bio: "Specializing in the intersection of haute-couture aesthetics and precision frontend engineering. 8+ years crafting award-winning digital experiences for luxury brands, design studios, and visionary product founders.",
    aboutMarkdown: `I bridge the gap between bespoke visual art direction and complex reactive software architecture. Every digital interface is treated as a tactile spatial experience.

My work has been recognized globally for kinetic fluidity, editorial brutalism, and sub-second WebGL rendering performance.`,
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    location: "New York & Paris (Global)",
    contactEmail: "elena@devstudio.us",
    isAvailableForHire: true,
    availabilityNote: "Open for select bespoke digital flagship commissions, creative direction, and design engineering advisory.",
    socialLinks: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      email: "elena@devstudio.us",
    },
    stats: {
      yearsExperience: 8,
      completedProjects: 36,
      happyClients: 22,
      codeCommits: 3100,
    },
  },
  projects: [
    {
      _id: "ep1",
      title: "L'Ombre Spatial Showcase",
      slug: "lombre-spatial-showcase",
      summary: "Immersive 3D WebGL flagship and spatial commerce experience for European haute horlogerie atelier.",
      caseStudy: `### Studio Commission
Architected an interactive 3D timepiece configurator rendering ray-traced reflections in real-time within the browser.

### Key Milestones
- Sub-40ms shader execution on mobile hardware using Three.js and custom GLSL vertex shaders.
- Fluid fluidic layout transitions with Framer Motion and Next.js App Router.`,
      thumbnailUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
      galleryImages: [],
      technologies: ["WebGL", "Three.js", "React", "Next.js", "GLSL", "Framer Motion"],
      category: "Frontend",
      liveUrl: "https://example.com/demo/lombre",
      githubUrl: "https://github.com/example/lombre",
      isFeatured: true,
      order: 1,
      isPublished: true,
      createdAt: "2026-01-15T00:00:00.000Z",
      updatedAt: "2026-02-10T00:00:00.000Z",
    },
    {
      _id: "ep2",
      title: "Maison Aurelia Editorial Flagship",
      slug: "maison-aurelia-flagship",
      summary: "High-fashion digital monograph featuring kinetic typography, smooth glide parallax, and instant edge caching.",
      caseStudy: `### Project Concept
Created a digital publishing house flagship bridging brutalist Swiss grid systems with fluid micro-interactions.`,
      thumbnailUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      galleryImages: [],
      technologies: ["Next.js", "TypeScript", "TailwindCSS", "Framer Motion"],
      category: "Frontend",
      liveUrl: "https://example.com/demo/aurelia",
      githubUrl: "https://github.com/example/aurelia",
      isFeatured: true,
      order: 2,
      isPublished: true,
      createdAt: "2026-02-01T00:00:00.000Z",
      updatedAt: "2026-02-18T00:00:00.000Z",
    },
  ],
  experiences: [
    {
      _id: "ee1",
      company: "Studio Atelier Paris",
      role: "Creative Technology Director",
      isRemote: true,
      startDate: "2022-04-01",
      isCurrent: true,
      summary: "Direct bespoke web architecture, 3D WebGL experiences, and design systems for global design flagships.",
      achievements: [
        "Won 4 Awwwards Site of the Day accolades for custom interaction platforms.",
        "Built reusable shader interaction library adopted across 14 enterprise client portals.",
      ],
      technologies: ["Three.js", "WebGL", "Next.js", "TypeScript", "GLSL"],
      createdAt: "2026-01-01T00:00:00.000Z",
      updatedAt: "2026-01-01T00:00:00.000Z",
    },
  ],
  skills: [
    { _id: "es1", name: "Three.js / WebGL", category: "Frontend", proficiency: 96, order: 1, isTopSkill: true, createdAt: "2026-01-01T00:00:00.000Z", updatedAt: "2026-01-01T00:00:00.000Z" },
    { _id: "es2", name: "Next.js", category: "Frontend", proficiency: 94, order: 2, isTopSkill: true, createdAt: "2026-01-01T00:00:00.000Z", updatedAt: "2026-01-01T00:00:00.000Z" },
    { _id: "es3", name: "Framer Motion", category: "Tools", proficiency: 98, order: 3, isTopSkill: true, createdAt: "2026-01-01T00:00:00.000Z", updatedAt: "2026-01-01T00:00:00.000Z" },
    { _id: "es4", name: "System Architecture", category: "Architecture", proficiency: 95, order: 4, isTopSkill: true, createdAt: "2026-01-01T00:00:00.000Z", updatedAt: "2026-01-01T00:00:00.000Z" },
  ],
  testimonials: [
    {
      _id: "et1",
      clientName: "Claire Deauville",
      company: "Maison Aurelia",
      clientRole: "Managing Director",
      quote: "Elena elevated our digital brand presence into an interactive work of art. Flawless execution and unmatched aesthetic sensibility.",
      isFeatured: true,
      isApproved: true,
      createdAt: "2026-01-20T00:00:00.000Z",
      updatedAt: "2026-01-20T00:00:00.000Z",
    },
  ],
  posts: [
    {
      _id: "epost1",
      title: "The Physics of Kinetic Typography in Modern Web Design",
      slug: "physics-of-kinetic-typography",
      excerpt: "Harmonizing spring physics, scroll velocity, and variable font optical weights for tactile readability.",
      content: `Dynamic typography should feel organic and weighted rather than mechanical. In this essay, we explore how mapping scroll delta velocity to variable font width axes creates a sense of tactile inertia.`,
      coverImageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
      tags: ["Typography", "Design Engineering", "Interaction"],
      readingTimeMinutes: 5,
      viewsCount: 1840,
      likesCount: 96,
      isPublished: true,
      publishedAt: "2026-02-14T00:00:00.000Z",
      createdAt: "2026-02-14T00:00:00.000Z",
      updatedAt: "2026-02-14T00:00:00.000Z",
    },
  ],
};

/**
 * Returns a static demo bundle for resilient 0ms hydration when server is cold or when viewing demo profiles.
 */
export function getStaticDemoBundle(slug?: string, templateOverride?: PortfolioTemplateId | string): IPublicPortfolioBundle | null {
  const normalizedSlug = (slug || "").toLowerCase().trim();

  let baseBundle: IPublicPortfolioBundle | null = null;

  if (normalizedSlug === "elena-rostova" || normalizedSlug === "demo-apex" || templateOverride === "apex-studio") {
    baseBundle = JSON.parse(JSON.stringify(ELENA_ROSTOVA_DEMO_BUNDLE));
  } else if (
    normalizedSlug === "alex-morgan" ||
    normalizedSlug === "demo-nova" ||
    normalizedSlug === "demo-classic" ||
    normalizedSlug === "demo" ||
    !normalizedSlug
  ) {
    baseBundle = JSON.parse(JSON.stringify(ALEX_MORGAN_DEMO_BUNDLE));
  }

  if (baseBundle && templateOverride) {
    baseBundle.portfolio.templateId = templateOverride as PortfolioTemplateId;
  }

  return baseBundle;
}
