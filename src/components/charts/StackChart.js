import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const StackChart = () => {
  //   const data = [
  //     { name: "01/10/24", No: 30, Yes: 70 },
  //     { name: "02/10/24", No: 45, Yes: 55 },
  //     { name: "03/10/24", No: 25, Yes: 75 },
  //     { name: "04/10/24", No: 40, Yes: 60 },
  //     { name: "05/10/24", No: 60, Yes: 40 },
  //     { name: "06/10/24", No: 55, Yes: 45 },
  //     { name: "07/10/24", No: 35, Yes: 65 },
  //     { name: "08/10/24", No: 20, Yes: 80 },
  // ];

  const data = [
    { date: "30-10-24", Yes: 80, No: 40 },
    { date: "31-10-24", Yes: 50, No: 60 },
    { date: "01-11-24", Yes: 70, No: 50 },
    { date: "02-11-24", Yes: 60, No: 20 },
    { date: "03-11-24", Yes: 30, No: 80 },
  ];

  return (
    // <ResponsiveContainer
    //   style={{
    //     // border:"1px solid red",
    //     marginTop: "",
    //   }}
    //   width="100%"
    //   height={300}
    // >
    //   <BarChart data={data}>
    //     <CartesianGrid />
    //     <XAxis dataKey="name" />
    //     <YAxis />
    //     <Tooltip />
    //     <Legend />
    //     <Bar dataKey="No" stackId="a" fill="#4287FF" />
    //     <Bar dataKey="Yes" stackId="a" fill="#F8BC00" />
    //   </BarChart>
    // </ResponsiveContainer>

    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        style={{ backgroundColor: "#E5EEFF" }}
        data={data}
        // margin={{
        //   top: 20,
        //   right: 30,
        //   left: 20,
        //   bottom: 20,
        // }}
        barSize={30}
      >
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis
          dataKey="date"
          label={{
            fontSize:14,
            icon: "circle",
            value: "X-axis - Date",
            position: "insideBottomCenter",
            angle:0,
            offset: -20,
            dy: 30,
            dx:300,

            fill: "black",
          }}
        />

        <YAxis
          label={{
            fontSize:14,
            value: "Y-axis - Customer count",
            position: "insideTop",
            angle:0,
            dy: -8,
            dx:200,
            fill: "black",
          }}
        />

        <Tooltip wrapperStyle={{ backgroundColor: "transparent" }} />
        <Legend iconType="circle" />
        <Bar dataKey="Yes" fill="#82B572" />
        <Bar dataKey="No" fill="#D05759" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default StackChart;
