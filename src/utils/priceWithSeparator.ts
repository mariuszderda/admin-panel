export const priceWithSeparator = (price: number): string => {
  return `${price.toLocaleString("pl-Pl", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} zł`;
};
