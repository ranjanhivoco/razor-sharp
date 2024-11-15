import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { subDays } from "date-fns";
import { dateStringToMMDDYY } from "../helper/helper";
import { useState } from "react";

const CustomDatePicker = ({  setFormattedDate }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setFormattedDate(dateStringToMMDDYY(date));
  };

  const maxSelectableDate = subDays(new Date(), 1);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "end",
      }}
    >
      <div
        style={{
          border: "1px solid #000",
          borderRadius: "4px",
          width: "150px",
        }}
      >
        <DatePicker
          showIcon
          selected={selectedDate}
          onChange={handleDateChange}
          selectsStart
          maxDate={maxSelectableDate}
          dateFormat="dd/MM/yy"
          placeholderText="Choose Date"
          popperPlacement="bottom-start" // Aligns the date picker towards the left
        />
      </div>
    </div>
  );
};

export default CustomDatePicker;
