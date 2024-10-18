import DateRangePicker from "./DateRangePicker";

const AddNameAndDate = ({ title, hideDate }) => {
  return (
    <div
      style={{
        padding: "10px",
        display: "flex",
        alignItems: "center",
        gap:"8px",
        justifyContent: "space-between",
      }}
    >
      <h3
        style={{
          // color: "black",
          // fontFamily: "Inter",
          // fontSize: "16px",
          // fontWeight: 500,
          // lineHeight: "19px",
          // textAlign: "left",
        }}
      >
        {title}
      </h3>

      <div
        style={{
          display: "block",
        }}
        className="d-none d-md-block" // Hidden on xs (phones) and visible on md and larger
      >
        {!hideDate && <DateRangePicker />}
      </div>
    </div>
  );
};

export default AddNameAndDate;
