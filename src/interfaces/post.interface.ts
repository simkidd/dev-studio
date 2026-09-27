export interface IPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImageUrl?: string;
  coverImagePublicId?: string;
  tags: string[];
  canonicalUrl?: string;
  readingTimeMinutes: number;
  viewsCount: number;
  likesCount: number;
  isPublished: boolean;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}
