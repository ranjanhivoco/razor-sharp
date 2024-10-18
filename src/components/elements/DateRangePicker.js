import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { subDays } from "date-fns";
import { EventOutlined } from "@mui/icons-material";

const DateRangePicker = () => {
  
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Calculate the maximum selectable date (day before today)
  const maxSelectableDate = subDays(new Date(), 1);

  console.log(startDate, endDate);

  return (
    <div
      style={{
        display: "flex",
        gap: "4px",
        justifyContent: "space-evenly",
        alignItems:"center",
        // marginRight: 0,
        // marginLeft: "auto",
      }}
    >
      <div
        style={{
          border: "1px solid #cbd5e1",
          borderRadius: "4px",
          // width: "150px",
          background: "#fff",
        }}
      >
        <DatePicker
          className="custom-datepicker"
          isClearable
          showIcon
          selected={startDate}
          onChange={(date) => {
            setStartDate(date);
            setEndDate(null); // Reset end date when start date changes
          }}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          maxDate={maxSelectableDate}
          placeholderText="Select Start Date"
          inputProps={{ style: { color: "#000" } }} // Placeholder color
        />
      </div>

      <span style={{color: "#141414"}}>to</span>
      
      <div
        style={{
          border: "1px solid #cbd5e1",
          borderRadius: "4px",
          width: "150px",
          background: "#fff",
        }}
      >
        <DatePicker
          className="custom-datepicker"
          isClearable
          showIcon
          // style={{ width: "200px" }}
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          // startDate={startDate}
          endDate={endDate}
          minDate={startDate} // Ensure end date is after start date
          maxDate={maxSelectableDate}
          placeholderText="Select End Date"
        />
      </div>
    </div>
  );
};

export default DateRangePicker;
