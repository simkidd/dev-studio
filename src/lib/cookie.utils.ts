import Cookies from "js-cookie";
import { COOKIE_KEYS, COOKIE_CONFIG } from "../constants/cookies.constants";
import { IUser } from "../interfaces";

export const getAccessToken = (): string | undefined => {
  return Cookies.get(COOKIE_KEYS.ACCESS_TOKEN);
};

export const getRefreshToken = (): string | undefined => {
  return Cookies.get(COOKIE_KEYS.REFRESH_TOKEN);
};

export const getUserCookie = (): IUser | null => {
  const user = Cookies.get(COOKIE_KEYS.USER);
  if (!user) return null;
  try {
    return JSON.parse(user);
  } catch {
    return null;
  }
};

export const setAuthCookies = (tokens: { accessToken: string; refreshToken: string }, user?: IUser): void => {
  Cookies.set(COOKIE_KEYS.ACCESS_TOKEN, tokens.accessToken, {
    ...COOKIE_CONFIG,
    expires: 1 / 96, // 15 mins
  });
  Cookies.set(COOKIE_KEYS.REFRESH_TOKEN, tokens.refreshToken, COOKIE_CONFIG);
  if (user) {
    Cookies.set(COOKIE_KEYS.USER, JSON.stringify(user), COOKIE_CONFIG);
  }
};

export const clearAuthCookies = (): void => {
  Cookies.remove(COOKIE_KEYS.ACCESS_TOKEN, { path: "/" });
  Cookies.remove(COOKIE_KEYS.REFRESH_TOKEN, { path: "/" });
  Cookies.remove(COOKIE_KEYS.USER, { path: "/" });
};
