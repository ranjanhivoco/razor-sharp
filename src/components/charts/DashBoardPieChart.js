import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#4287FF", "#77C54D", "#F15633"];
const renderColorfulLegendText = (value, entry) => {
  return (
    <span
      style={{
        color: "#000",
        fontWeight: 400,
        fontSize: "18px",
        marginLeft: "",
      }}
    >
      {value}
    </span>
  );
};

const DashBoardPieChart = () =>
  // { attempted, successfull }
  {
    // const [data, setData] = useState([
    //   { name: "Upsell Successfull", value: 34 },
    //   { name: "Upsell Attempts", value: 66 },
    // ]);

    // useEffect(() => {
    //   setData([
    //     { ...data[0], value: Number(successfull) },
    //     { ...data[1], value: Number(attempted) },
    //   ]);
    // }, [attempted, successfull]);

    const data = [
      { name: "All 3 Steps", value: 8 },
      { name: "Partial Steps", value: 12 },
      { name: "None", value: 4 },
    ];

    const totalValue = data.reduce((acc, entry) => acc + entry.value, 0);

    const renderCustomizedLabel = ({
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      percent,
      index,
    }) => {
      const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
      const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
      const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

      return (
        <text
          x={x}
          y={y}
          fill="white"
          textAnchor={x > cx ? "start" : "end"}
          dominantBaseline="central"
          fontSize={14}
          fontWeight={500}
        >
          {`${((data[index].value / totalValue) * 100).toFixed(1)}%`}
        </text>
      );
    };

    return (
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Legend
            // height={36}
            iconType="circle"
            layout="centric"
            verticalAlign="middle"
            align="right"
            iconSize={12}
            formatter={(value, entry) => (
              <span
                style={{ color: "#000", fontWeight: 400, fontSize: "14px" }}
              >
                {`${value}: ${entry.payload.value}`}
              </span>
            )}
            activeIndex
            activeShape
          />
          <Tooltip
            contentStyle={{
              fontSize: "12px", // Decrease font size for a smaller tooltip
              padding: "5px", // Reduce padding for a smaller appearance
              marginLeft: "10px",
            }}
            formatter={(value, name, props) => `${value}`}
          />

          <Pie
            data={data}
            labelLine={false}
            outerRadius={95}
            cx={120}
            //   fill="#9A6ADB29"
            dataKey="value"
              label={renderCustomizedLabel}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    );
  };

export default DashBoardPieChart;
