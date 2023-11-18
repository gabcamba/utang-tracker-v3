export const formatDateTime = (timestamp) => {
  const date = new Date(timestamp);
  const options = {
    timeStyle: 'short',
    dateStyle: 'short'
  };
  return new Intl.DateTimeFormat("en-PH", options).format(date);
};
