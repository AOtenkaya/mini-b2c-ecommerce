export const formatPrice = (price, currency = "$", fractionDigits = 2) => {
  if (isNaN(price)) {
    throw new Error("Invalid price value. Ensure it's a number.");
  }
  return `${currency}${price.toFixed(fractionDigits)}`;
};
