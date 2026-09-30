import { apiClient } from "../axios";
import {
  ApiResponse,
  IPortfolio,
  IUpdatePortfolioPayload,
  IPublicPortfolioBundle,
} from "@/interfaces";

export const portfolioApi = {
  // Public endpoint to load complete public portfolio bundle by slug
  getBySlug: async (slug: string): Promise<ApiResponse<IPublicPortfolioBundle>> => {
    const { data } = await apiClient.get<ApiResponse<IPublicPortfolioBundle>>(
      `/portfolios/public/${slug}`
    );
    return data;
  },

  // Authenticated endpoints for portfolio owner
  getSettings: async (): Promise<ApiResponse<IPortfolio>> => {
    const { data } = await apiClient.get<ApiResponse<IPortfolio>>(
      "/portfolios/settings/me"
    );
    return data;
  },

  updateSettings: async (
    payload: IUpdatePortfolioPayload
  ): Promise<ApiResponse<IPortfolio>> => {
    const { data } = await apiClient.put<ApiResponse<IPortfolio>>(
      "/portfolios/settings/me",
      payload
    );
    return data;
  },
};
