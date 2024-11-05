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
    { name: "01/10/24", No: 30, Yes: 70 },
    { name: "02/10/24", No: 45, Yes: 55 },
    { name: "03/10/24", No: 25, Yes: 75 },
    { name: "04/10/24", No: 40, Yes: 60 },
    { name: "05/10/24", No: 60, Yes: 40 },
    { name: "06/10/24", No: 55, Yes: 45 },
    { name: "07/10/24", No: 35, Yes: 65 },
    { name: "08/10/24", No: 20, Yes: 80 },
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
