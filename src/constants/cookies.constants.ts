export const COOKIE_KEYS = {
  ACCESS_TOKEN: "dev_portfolio_access_token",
  REFRESH_TOKEN: "dev_portfolio_refresh_token",
  USER: "dev_portfolio_user",
} as const;

export const COOKIE_CONFIG = {
  expires: 7, // 7 days
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};
