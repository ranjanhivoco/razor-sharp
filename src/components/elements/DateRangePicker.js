import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { subDays } from "date-fns";
import { dateStringToMMDDYY } from "../helper/helper";

const DateRangePicker = ({ range, setRange }) => {
  // console.log(range,"range"); 
  const maxSelectableDate = subDays(new Date(), 1);
  return (
    <div
      style={{
        display: "flex",
        gap: "4px",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <div
        style={{
          border: "1px solid #cbd5e1",
          borderRadius: "4px",
          background: "#fff",
        }}
      >
        <DatePicker
          className="custom-datepicker"
          isClearable
          showIcon
          selected={range?.startDate}
          onChange={(date) => {
            setRange((prevRange) => ({
              ...prevRange,
              startDate:dateStringToMMDDYY(date),
            }));
          }}
          selectsStart
          startDate={range?.startDate}
          endDate={range?.endDate}
          maxDate={maxSelectableDate}
          placeholderText="Select Start Date"
          inputProps={{ style: { color: "#000" } }}
          dateFormat="dd/MM/yyyy"

        />
      </div>

      <span style={{ color: "#141414" }}>to</span>

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
          selected={range?.endDate}
          onChange={(date) =>
            setRange((prevRange) => ({
              ...prevRange,
              endDate: dateStringToMMDDYY(date),
            }))
          }
          selectsEnd
          endDate={range?.endDate}
          minDate={range?.startDate}
          maxDate={maxSelectableDate}
          placeholderText="Select End Date"
          dateFormat="dd/MM/yyyy"

        />
      </div>
    </div>
  );
};

export default DateRangePicker;
