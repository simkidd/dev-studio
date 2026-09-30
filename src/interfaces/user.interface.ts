export type UserRole = "user" | "admin" | "superadmin";

export interface IUser {
  _id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
  headline?: string;
  role: UserRole;
  portfolioSlug?: string;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IAuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface IAuthResponse {
  user: IUser;
  tokens: IAuthTokens;
}

export interface ILoginCredentials {
  email: string;
  password: string;
}

export interface IRegisterCredentials {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  desiredSlug?: string;
}

export interface IChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

