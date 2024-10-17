export const convertDateFormat = (dateString) => {
  const [month, day, year] = dateString.split("/");
  return `${day}/${month}/${year}`;
};

// const inputDate = "10/17/24";
// const outputDate = convertDateFormat(inputDate);
// console.log(outputDate); // Output: "17/10/24"
