import axios from "axios";
import { useContext, useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  // CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  // Legend,
  // ResponsiveContainer,
} from "recharts";
import { BranchIDContext } from "../context/branchID";

const StackChart = ({ selectedRange }) => {
  const [userSatisfationData, setUserSatisfationData] = useState();
  const { branchID } = useContext(BranchIDContext);

  
  // Function to group by weeks
  const groupByWeeks = (data) => {
    const weeks = [];
    data.forEach((item) => {
      const date = new Date(item.date);
      const weekStart = new Date(date.setDate(date.getDate() - date.getDay())); // Start of the week
      const weekLabel = weekStart.toISOString().split("T")[0]; // Format as YYYY-MM-DD

      let week = weeks.find((w) => w.name === weekLabel);
      if (!week) {
        week = { name: weekLabel, yes: 0, no: 0 };
        weeks.push(week);
      }

      week.yes += parseInt(item.yes, 10);
      week.no += parseInt(item.no, 10);
    });
    return weeks;
  };

  const aggregateData = (data, range) => {
    if (range <= 14) {
      return data?.map((item) => ({
        name: item.date,
        yes: parseInt(item.yes, 10),
        no: parseInt(item.no, 10),
      }));
    } else {
      return groupByWeeks(data);
    }
  };

  const [range, setRange] = useState(7); // Default to 7 days

  const filteredData = userSatisfationData?.slice(0, range); // Limit data based on range
  const chartData = aggregateData(filteredData, range); // Aggregate based on range

  const getUserSatisfationData = async () => {
    const url = "https://api.hongs.razorsharp.in";
    try {
      const tokenString = sessionStorage.getItem("token");
      const token = JSON.parse(tokenString);
      const response = await axios.get(
        `${url}/dashboard/satisfaction/${branchID}/${selectedRange.toLowerCase()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data, "response.data");
      setUserSatisfationData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserSatisfationData();
  }, [selectedRange]);
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="yes" fill="#82B572" />
        <Bar dataKey="no" fill="#D05759" />
      </BarChart>
    </ResponsiveContainer>
  );
// return (
//   <ResponsiveContainer width="100%" height={300}>
//     <BarChart
//       style={{ backgroundColor: "#E5EEFF" }}
//       data={data}
//       // margin={{
//       //   top: 20,
//       //   right: 30,
//       //   left: 20,
//       //   bottom: 20,
//       // }}
//       barSize={30}
//     >
//       <CartesianGrid strokeDasharray="3 3" />

//       <XAxis
//         dataKey="date"
//         label={{
//           fontSize: 14,
//           icon: "circle",
//           value: "X-axis - Date",
//           position: "insideBottomCenter",
//           angle: 0,
//           offset: -20,
//           dy: 30,
//           dx: 300,

//           fill: "black",
//         }}
//       />

//       <YAxis
//         label={{
//           fontSize: 14,
//           value: "Y-axis - Customer count",
//           position: "insideTop",
//           angle: 0,
//           dy: -8,
//           dx: 200,
//           fill: "black",
//         }}
//       />

//       <Tooltip wrapperStyle={{ backgroundColor: "transparent" }} />

//       <Legend iconType="circle" />

//       <Bar dataKey="Yes" fill="#82B572" />
//       <Bar dataKey="No" fill="#D05759" />
//     </BarChart>
//   </ResponsiveContainer>
// );
// };
}
export default StackChart;
