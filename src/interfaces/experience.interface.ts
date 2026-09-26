export type ExperienceType =
  | "full-time"
  | "part-time"
  | "contract"
  | "freelance"
  | "internship";

export interface IExperience {
  _id: string;
  company: string;
  role: string;
  employmentType?: ExperienceType;
  location?: string;
  isRemote: boolean;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  summary: string;
  achievements: string[];
  technologies: string[];
  companyLogoUrl?: string;
  companyWebsiteUrl?: string;
  createdAt: string;
  updatedAt: string;
}
