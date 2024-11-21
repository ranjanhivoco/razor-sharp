import axios from "axios";
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

const DashBoardPieChart = ({ selectedRange }) => {
  const [threeStepProcessData, setThreeStepProcessData] = useState([]);

  const getThreeStepsData = async () => {
    const endpoint = "https://api.hongs.razorsharp.in";
    try {
      const tokenString = sessionStorage.getItem("token");
      const token = JSON.parse(tokenString);
      const response = await axios.get(
        `${endpoint}/dashboard/procedure/2304/${selectedRange.toLowerCase()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setThreeStepProcessData([
        {
          name: "All 3 Steps",
          value: Number(response?.data?.currentTotalAll_step_followed),
        },
        {
          name: "Partial Steps",
          value: Number(response?.data?.currentTotalPartially),
        },
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  const totalValue = threeStepProcessData?.reduce(
    (acc, entry) => acc + (entry.value || 0),
    0
  );

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
        {`${((threeStepProcessData[index].value / totalValue) * 100).toFixed(
          1
        )}%`}
      </text>
    );
  };

  useEffect(() => {
    getThreeStepsData();
  }, [selectedRange]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Legend
          iconType="circle"
          layout="centric"
          verticalAlign="middle"
          align="right"
          iconSize={12}
          formatter={(value, entry) => (
            <span style={{ color: "#000", fontWeight: 400, fontSize: "14px" }}>
              {`${value}: ${entry.payload.value}`}
            </span>
          )}
        />
        <Tooltip
          contentStyle={{
            fontSize: "12px",
            padding: "5px",
            marginLeft: "10px",
          }}
          formatter={(value, name, props) => `${value}`}
        />

        <Pie
          data={threeStepProcessData}
          labelLine={false}
          outerRadius={95}
          cx={120}
          //   fill="#9A6ADB29"
          dataKey="value"
          label={renderCustomizedLabel}
        >
          {threeStepProcessData?.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default DashBoardPieChart;
