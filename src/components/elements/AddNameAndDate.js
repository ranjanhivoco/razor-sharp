import DateRangePicker from "./DateRangePicker";

const AddNameAndDate = ({ title,hideDate }) => {
  return (
    <div
      style={{
        padding: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <h3
        style={{
          color: "black",
          fontFamily: "Inter",
          fontSize: "16px",
          fontWeight: 500,
          lineHeight: "19px",
          textAlign: "left",
        }}
      >
        {title}
      </h3>

      {!hideDate && <DateRangePicker />}
    </div>
  );
};

export default AddNameAndDate;
