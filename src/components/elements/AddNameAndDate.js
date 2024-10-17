import CustomDatePicker from "./CustomDatePicker";
import DateRangePicker from "./DateRangePicker";

const AddNameAndDate = ({ title }) => {
  return (
    <div>
      <h3
        style={{
          fontFamily: "Inter",
          fontSize: "16px",
          fontWeight: 500,
          lineHeight: "19px",
          textAlign: "left",
        }}
      >
        {title}
      </h3>

      <DateRangePicker />
      </div>
  );
};

export default AddNameAndDate;
