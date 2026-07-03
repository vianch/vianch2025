/* Services */
import { logger } from "@/lib/services/logger/logger.service";

/* Utils */
import { getBaseUrl } from "@/lib/utils/url.utils";

/**
 * Makes a GET request to the specified API endpoint
 * @param endpoint - The API endpoint to call
 * @param params - Query parameters to include in the request
 * @returns Promise with the response data
 */
export const fetchApi = async <T>(
  endpoint: string,
  params?: Record<string, string | number>
): Promise<T> => {
  const url = new URL(`/api/v1/${endpoint}`, getBaseUrl());

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.append(key, String(value));
      }
    });
  }

  const isPage = endpoint.startsWith("pages");

  try {
    const response = await fetch(url.href, isPage ? { cache: "no-store" } : {});
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.error || `Failed to fetch ${endpoint} (${response.status})`);
    }

    return data;
  } catch (error) {
    logger.error("API request failed", error, { endpoint });
    throw error;
  }
};
