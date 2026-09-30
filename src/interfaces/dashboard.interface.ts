import { IMessage } from "./message.interface";
import { IProject } from "./project.interface";

export interface ICompletionStep {
  id: string;
  label: string;
  done: boolean;
}

export interface IDashboardStats {
  counts: {
    projects: {
      total: number;
      published: number;
      featured: number;
    };
    posts: {
      total: number;
      published: number;
      totalViews: number;
      totalLikes: number;
    };
    messages: {
      total: number;
      unread: number;
    };
    experiences: number;
    skills: number;
    testimonials: number;
  };
  recent: {
    messages: IMessage[];
    projects: IProject[];
  };
  portfolio?: {
    slug: string;
    templateId: string;
    isPublished: boolean;
    seoTitle?: string;
    seoDescription?: string;
  };
  completion?: {
    percentage: number;
    steps: ICompletionStep[];
  };
}

