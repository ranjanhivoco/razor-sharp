import { values } from "lodash";
import React, { PureComponent, useEffect, useState } from "react";
import { PieChart, Pie, Legend, ResponsiveContainer, Tooltip } from "recharts";

const renderColorfulLegendText = (value, entry) => {
  return (
    <span style={{ color: "#000", fontWeight: 400, fontSize: "18px" }}>
      {value}
    </span>
  );
};

const DashBoardDonut = ({ maleCount, femaleCount }) => {
  const [data, setData] = useState([
    { name: "Female", value: Number(femaleCount), fill: "#EE396A" },
    { name: "Male", value: Number(maleCount), fill: "#4287FF" },
  ]);

  useEffect(() => {
    setData([
      { ...data[0], value: Number(femaleCount) },
      { ...data[1], value: Number(maleCount) },
    ]);
  }, [maleCount, femaleCount]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        {/* text */}
        <Legend
          //   height={50}
          iconType="circle"
          layout="vertical"
          verticalAlign="middle"
          align="right"
          iconSize={12}
          formatter={renderColorfulLegendText}
        />

        <Tooltip
          contentStyle={{
            fontSize: "12px", // Decrease font size for a smaller tooltip
            padding: "5px", // Reduce padding for a smaller appearance
          }}
          formatter={(value, name, props) => `${value}`}
        />

        <Pie
          data={data}
          cx={140}
          // cy={90}
          outerRadius={100}
          innerRadius={80}
          fill="#8884d8"
          paddingAngle={0}
          dataKey="value"
        ></Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default DashBoardDonut;
