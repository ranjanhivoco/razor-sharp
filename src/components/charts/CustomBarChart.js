import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import CustomPieChart from "./CustomPieChart";
import AddNameAndDate from "../elements/AddNameAndDate";

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

const CustomBarChart = ({background,barColor,data}) => {

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

// const CustomBarChart = ({}) => {
//   const data = [
//     { name: "24/10/24", x: 30, y: 70 },
//     { name: "24/10/24", x: 12, y: 88 },
//     { name: "24/10/24", x: 15, y: 85 },
//     { name: "24/10/24", x: 35, y: 65 },
//     { name: "24/10/24", x: 54, y: 46 },
//     { name: "24/10/24", x: 72, y: 28 },
//     { name: "24/10/24", x: 32, y: 68 },
//   ];

//   return (
//     <ResponsiveContainer
//       style={{ borderRadius: "8px", background: "#9A6ADB29" }}
//       width="100%"
//       height={300}
//     >
//       <BarChart data={data}>
//         <CartesianGrid />
//         <XAxis dataKey="name" />
//         <YAxis />
//         <Tooltip />
//         <Legend />
//         <Bar dataKey="x" stackId="a" fill="#8884d8" />
//         <Bar dataKey="y" stackId="a" fill="#82ca9d" />
//       </BarChart>
//     </ResponsiveContainer>
//   );
// };

export default CustomBarChart;
