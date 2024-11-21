export const convertDateFormat = (dateString) => {
  const [month, day, year] = dateString.split("/");
  return `${day}/${month}/${year}`;
};

export const formatLargeNumber = (number) => {
  if (number >= 1_000_000) {
    return (number / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  } else if (number >= 1_000) {
    return (number / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  }
  return number.toString();
};

export const dateStringToMMDDYY = (dateString) => {
  return dateString
    ? dateString.toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
    : null;
};

export const getTimePeriodText = (period) => {
  period = period.toLowerCase();
  if (period === "7d") {
    return "Last week";
  } else if (period === "14d") {
    return "Last fortnight";
  } else if (period === "1m") {
    return "Last month";
  } else if (period === "3m") {
    return "Last quarter";
  } else {
    return "Invalid period";
  }
};

