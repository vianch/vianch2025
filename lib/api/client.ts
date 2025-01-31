/* Utils */
import { getBaseUrl } from "@/utils/url.utils";

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
    Object.entries(params)?.forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.append(key, String(value));
      }
    });
  }

  const response = await fetch(url?.href?.toString() || url.toString());
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to fetch data");
  }

  return data;
};
