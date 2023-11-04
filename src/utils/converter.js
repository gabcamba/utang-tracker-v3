export const toFloat = (amount) => {
  return Number(parseFloat(amount).toFixed(2));
};

export const toInt = (amount) => {
  return parseInt(amount);
};

export const formatCurrency = (amount) => {
  return amount.toLocaleString();
};
