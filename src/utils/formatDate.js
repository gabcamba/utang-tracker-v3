export const formatDateTime = (timestamp) => {
  const date = new Date(timestamp);
  const options = {
    month: "2-digit",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  };
  return new Intl.DateTimeFormat("en-US", options).format(date);
};
