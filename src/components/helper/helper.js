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



