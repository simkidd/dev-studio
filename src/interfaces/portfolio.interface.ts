import { IProfile } from "./profile.interface";
import { IProject } from "./project.interface";
import { IExperience } from "./experience.interface";
import { ISkill } from "./skill.interface";
import { ITestimonial } from "./testimonial.interface";
import { IPost } from "./post.interface";

export type PortfolioTemplateId = "classic-dev" | "nova-engine" | "apex-studio";

export interface IPortfolio {
  _id: string;
  userId: string;
  slug: string;
  templateId: PortfolioTemplateId;
  isPublished: boolean;
  publishedAt?: string;
  seoTitle?: string;
  seoDescription?: string;
  socialImage?: string;
  customDomain?: string;
  themePreference?: "system" | "dark" | "light";
  createdAt: string;
  updatedAt: string;
}

export interface IUpdatePortfolioPayload {
  slug?: string;
  templateId?: PortfolioTemplateId;
  isPublished?: boolean;
  seoTitle?: string;
  seoDescription?: string;
  socialImage?: string;
  customDomain?: string;
  themePreference?: "system" | "dark" | "light";
}

export interface IPublicPortfolioBundle {
  portfolio: IPortfolio;
  profile: IProfile;
  projects: IProject[];
  experiences: IExperience[];
  skills: ISkill[];
  testimonials: ITestimonial[];
  posts: IPost[];
}
