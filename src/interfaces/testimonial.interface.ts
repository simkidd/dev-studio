export interface ITestimonial {
  _id: string;
  clientName: string;
  clientRole: string;
  company: string;
  avatarUrl?: string;
  quote: string;
  rating?: number;
  projectRef?: string | { _id: string; title: string; slug: string; thumbnailUrl?: string };
  linkedInUrl?: string;
  companyUrl?: string;
  isFeatured: boolean;
  isApproved: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}
