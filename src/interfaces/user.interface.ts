export type UserRole = "admin" | "superadmin";

export interface IUser {
  _id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
  headline?: string;
  role: UserRole;
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

export interface IChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}
