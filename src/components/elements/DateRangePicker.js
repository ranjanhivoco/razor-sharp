import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { subDays } from "date-fns";

const DateRangePicker = () => {
  
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Calculate the maximum selectable date (day before today)
  const maxSelectableDate = subDays(new Date(), 1);

  console.log(startDate, endDate);

  return (
     <div style={{display:"flex","justifyContent":"space-evenly",marginRight:0,marginLeft:"auto"}}>
      <div style={{ border: "1px solid #cbd5e1", borderRadius: "4px",width:"150px" }}>
        <DatePicker
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
        />
      </div>

      <div style={{ border: "1px solid #cbd5e1", borderRadius: "4px",width:"150px" }}>
        <DatePicker
          showIcon
          // style={{ width: "200px" }}
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
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
