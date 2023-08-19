export const formatAmount = (amount) => {
  {
    return (amount).toLocaleString("de-DE", {
      style: "currency",
      currency: "EUR",
      currencyDisplay: "code",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
  }
};
