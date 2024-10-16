import React from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { x: 1, y: 12 },
  { x: 2, y: 14 },
  { x: 3, y: 8 },
  { x: 4, y: 10 },
  { x: 5, y: 7 },
  { x: 6, y: 9 },
  { x: 7, y: 5 },
  { x: 8, y: 13 },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: "#f5f5f5",
          padding: "10px",
          border: "1px solid #ccc",
        }}
      >
        <p>{`X: ${payload[0].payload.x}`}</p>
        <p>{`Y: ${payload[0].payload.y}`}</p>
        {/* <p>{`Z: ${payload[0].payload.z}`}</p> */}
      </div>
    );
  }
  return null;
};

const CustomBubbleChart = () => {
  return (
    <div style={{ borderRadius: "8px", height: "300px" }}>
      {/* <h3>Customer Orders</h3>

      <p style={{ color: 'red', marginBottom: '10px' }}>-25% Last Month</p> */}

      <ResponsiveContainer
        style={{
          backgroundColor: "#FFDFE7",
          borderRadius: "8px",
          padding: "12px",
        }}
        width="100%"
        height="100%"
      >
        <ScatterChart>
          <CartesianGrid strokeDasharray="" />
          <XAxis dataKey="x" />
          <YAxis dataKey="y" />
          <Tooltip content={<CustomTooltip />} />
          <Scatter
            data={data}
            fill="#ff69b4"
            fillOpacity={0.8}
            shape="circle"
          />
        </ScatterChart>
      </ResponsiveContainer>
      {/* <div style={{ textAlign: "right", marginTop: "10px" }}>
        <a href="#">View details</a>
      </div> */}
    </div>
  );
};

export default CustomBubbleChart;
