export const convertDateFormat = (dateString) => {
  const [month, day, year] = dateString.split("/");
  return `${day}/${month}/${year}`;
};


// const inputDate = "10/17/24";
// const outputDate = convertDateFormat(inputDate);
// (outputDate); // Output: "17/10/24"



export  const dateStringToMMDDYY  = (dateString) => {
  return dateString
    ? dateString.toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
    : null;
};