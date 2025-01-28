export const normalizeUrl = (url: string): string => {
  if (!url) return "";

  return url.startsWith("//") ? `https:${url}` : url;
};
