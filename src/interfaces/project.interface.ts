export type ProjectCategory =
  | "Full-Stack"
  | "Frontend"
  | "Backend"
  | "Mobile"
  | "DevOps"
  | "AI/ML"
  | "System Design";

export interface IProjectMetric {
  label: string;
  value: string;
}

export interface IProjectImage {
  url: string;
  publicId?: string;
}

export interface IProject {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  caseStudy?: string;
  thumbnailUrl: string;
  thumbnailPublicId?: string;
  galleryImages: IProjectImage[];
  technologies: string[];
  category: ProjectCategory;
  liveUrl?: string;
  githubUrl?: string;
  isFeatured: boolean;
  metrics?: IProjectMetric[];
  order: number;
  isPublished: boolean;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

