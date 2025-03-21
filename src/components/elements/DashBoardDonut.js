import axios from "axios";
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

const DashBoardDonut = ({ selectedRange }) => {
  const [customerGraphData, setCustomerGraphData] = useState([]);

  const getCustomerGraphData = async () => {
    const endpoint = "https://api.hongs.razorsharp.in";
    try {
      const tokenString = sessionStorage.getItem("token");
      const token = JSON.parse(tokenString);
      const response = await axios.get(
        `${endpoint}/dashboard/customer/2306/${selectedRange.toLowerCase()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCustomerGraphData([
        {
          name: "Female",
          value: Number(response?.data?.currentMaleSum),
          fill: "#EE396A",
        },
        {
          name: "Male",
          value: Number(response?.data?.currentFemaleSum),
          fill: "#4287FF",
        },
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCustomerGraphData();
  }, [selectedRange]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
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
          data={customerGraphData}
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
