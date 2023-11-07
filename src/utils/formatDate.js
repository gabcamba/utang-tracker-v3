export const formatDateTime = (timestamp) => {
  const date = new Date(timestamp);
  const options = {
    timeStyle: 'short',
    dateStyle: 'medium'
  };
  return new Intl.DateTimeFormat("en-US", options).format(date);
};
