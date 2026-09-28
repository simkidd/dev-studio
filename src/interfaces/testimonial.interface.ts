export interface ITestimonial {
  _id: string;
  clientName: string;
  clientRole: string;
  company: string;
  quote: string;
  projectRef?: string | { _id: string; title: string; slug: string; thumbnailUrl?: string };
  linkedInUrl?: string;
  companyUrl?: string;
  isFeatured: boolean;
  isApproved: boolean;
  createdAt: string;
  updatedAt: string;
}
