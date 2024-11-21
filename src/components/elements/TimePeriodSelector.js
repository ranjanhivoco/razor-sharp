import React, { useState } from "react";
import { ButtonGroup, Button } from "react-bootstrap";

const TimeRangeSelector = ({ selectedRange, setSelectedRange }) => {
  const handleSelect = (range) => {
    setSelectedRange(range.toLowerCase());
  };

  return (
    <ButtonGroup className="time-range-selector">
      {["7D", "14D", "1M", "3M"].map((range) => (
        <Button
          variant=""
          key={range}
          onClick={() => handleSelect(range)}
          className={`time-button ${
            selectedRange.toLowerCase() === range.toLowerCase()
              ? "selected"
              : ""
          }`}
        >
          {range}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default TimeRangeSelector;
