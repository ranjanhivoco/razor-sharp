import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#62B170", "#E97D30"];
const renderColorfulLegendText = (value, entry) => {
  return (
    <span style={{ color: "#000", fontWeight: 400, fontSize: "12px" }}>
      {value}
    </span>
  );
};

const DashBoardPieChart = ({ attempted, successfull }) => {
  const [data, setData] = useState([
    { name: "Upsell Successfull", value: 34 },
    { name: "Upsell Attempts", value: 66 },
  ]);

  useEffect(() => {
    setData([
      { ...data[0], value: Number(successfull) },
      { ...data[1], value: Number(attempted) },
    ]);
  }, [attempted, successfull]);

  return (
    <ResponsiveContainer
      width="100%"
      height="100%"
    >
      <PieChart>
        <Legend
          height={36}
          iconType="circle"
          layout="vertical"
          verticalAlign="middle"
          align="right"
          iconSize={8}
          formatter={renderColorfulLegendText}
          activeIndex
          activeShape
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
          labelLine={false}
          outerRadius={95}
          cx={140}
          //   fill="#9A6ADB29"
          dataKey="value"
          //   label={renderCustomizedLabel}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default DashBoardPieChart;
