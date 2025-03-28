export const todayDate = () =>
  new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

export const todayTime = () =>
  new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
  });

export const formatDateToReadable = (dateString: string): string => {
  const date = new Date(dateString);

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
