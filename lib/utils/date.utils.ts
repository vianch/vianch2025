export const formatDateToReadable = (dateString: string): string => {
  const date = new Date(dateString);

  // Get the day and add leading zero if needed
  const day = date.getDate();
  const formattedDay = day < 10 ? `0${day}` : `${day}`;

  // Get month name and year
  const month = date.toLocaleDateString("en-US", { month: "long" });
  const year = date.getFullYear();

  // Return formatted date
  return `${month} ${formattedDay}, ${year}`;
};
