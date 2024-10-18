import {
  Legend,
  Tooltip,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

const StackChart = () => {
  const data = [
    { name: "24/10/24", No: 30, Yes: 70 },
    { name: "24/10/24", No: 12, Yes: 88 },
    { name: "24/10/24", No: 15, Yes: 85 },
    { name: "24/10/24", No: 35, Yes: 65 },
    { name: "24/10/24", No: 54, Yes: 46 },
    { name: "24/10/24", No: 72, Yes: 28 },
    { name: "24/10/24", No: 32, Yes: 68 },
  ];

  return (
    <ResponsiveContainer
      style={{
        // border:"1px solid red",
        marginTop: "",
      }}
      width="100%"
      height={300}
    >
      <BarChart data={data}>
        <CartesianGrid />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="No" stackId="a" fill="#4287FF" />
        <Bar dataKey="Yes" stackId="a" fill="#F8BC00" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default StackChart;
