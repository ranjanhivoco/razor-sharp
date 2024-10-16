import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import CustomPieChart from "./CustomPieChart";

const mockData = [
  { message: "January", message_count: 30 },
  { message: "February", message_count: 50 },
  { message: "March", message_count: 40 },
  { message: "April", message_count: 80 },
  { message: "May", message_count: 60 },
  { message: "June", message_count: 90 },
  { message: "July", message_count: 70 },
  { message: "August", message_count: 100 },
  { message: "September", message_count: 50 },
  { message: "October", message_count: 65 },
  { message: "November", message_count: 85 },
  { message: "December", message_count: 95 }
];


const CustomizedAxisTick = ({ x, y, payload }) => {

  
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="middle"
        fill="#000"
        style={{
          fontSize: 16,
          textAlign: "left",
          textWrap: "wrap",
          width: "100px",
          height: "16px",
          whiteSpace: "pre-line",
        }}
      >
        <tspan
          style={{
            fontSize: 8,
            textAlign: "left",
            textWrap: "wrap",
            width: "100px",
            height: "16px",
            whiteSpace: "pre-line",
          }}
          dx={10}
          dy={8}
        >
          {payload.value}
        </tspan>
        <tspan x="10" dy={12}>
          {"              "}
        </tspan>
      </text>
    </g>
  );
};


const CustomBarChart = ({background,barColor,data=mockData}) => {

  return (
    <ResponsiveContainer
      // style={{ background: "#77DD7729" }}
      style={{ background: background,borderRadius:"8px" }}
      width="100%"
      height={300}
    >
      <BarChart
        data={data}
        // ticks={[5, 6, 7, 8, 9, 10, 11, 12, 13]}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid  />

        <XAxis
          tick={<CustomizedAxisTick />} // Use custom tick for wrapped text
          interval={0} // Show all labels
          angle={0} // Rotate labels by -30 degrees
          textAnchor="" // Align the text properly after rotation
          dataKey="message" // x axis
        />

        <YAxis />
        <Tooltip />
        {/* tool top for on hover effetcs  */}

        <Bar
          dataKey="message_count"
          // fill="#3CAB00"
          fill={barColor}
          barSize={110}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CustomBarChart;
