import { IMessage } from "./message.interface";
import { IProject } from "./project.interface";

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
    projects: Partial<IProject>[];
  };
}
