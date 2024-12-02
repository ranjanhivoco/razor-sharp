import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { size } from "lodash";

const DynamicLineChart = ({ selectedRange }) => {
  const [userSatisfationData, setUserSatisfationData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getUserSatisfationData = async () => {
    setLoading(true);
    const url = "https://api.hongs.razorsharp.in";
    try {
      const tokenString = sessionStorage.getItem("token");
      const token = tokenString ? JSON.parse(tokenString) : null;

      if (!token) {
        console.error("Token not found");
        return;
      }

      const response = await axios.get(
        `${url}/dashboard/satisfaction/2304/${selectedRange.toLowerCase()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUserSatisfationData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserSatisfationData();
  }, [selectedRange]);

  // Calculate the maximum value of "yes" and "no" in the data
  const getMaxValue = () => {
    if (!userSatisfationData || userSatisfationData.length === 0) {
      return 0; // Default to 0 if no data
    }
    return Math.max(
      ...userSatisfationData.map((d) => Math.max(Number(d.yes), Number(d.no)))
    );
  };

  const maxValue = getMaxValue();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!userSatisfationData.length) {
    return <p>No data available for the selected range.</p>;
  }

  return (
    <div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={userSatisfationData}
          margin={{ top: 50, right: 30, left: 20, bottom: 2 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12, fill: "#666" }} // Reduce font size on X-axis
          />
          <YAxis
            domain={[0, maxValue + 5]}
            tick={{ fontSize: 12, fill: "#666" }} // Reduce font size on Y-axis
          />{" "}
          {/* Dynamically set Y-axis */}
          <Tooltip
            contentStyle={{
              fontSize: "12px",
              backgroundColor: "#ffffff",
              borderRadius: "5px",
            }}
          />
          <Legend />
          <Line type="monotone" dataKey="yes" stroke="#388E3C" />
          <Line type="monotone" dataKey="no" stroke="#D9534F" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DynamicLineChart;
