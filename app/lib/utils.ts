///// Utility functions /////

///// Format currency /////
export const formatCurrency = (amount: number) => {
  return (amount).toLocaleString("en-US", {
    style: "currency",
    currency: "AED",
  });
};

///// Format date to local /////
export const formatDateToLocal = (
  dateStr: string,
  locale: string = "en-US"
) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};
