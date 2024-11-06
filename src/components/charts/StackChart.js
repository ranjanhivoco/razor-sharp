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
    const data = [
      { date: "01/10/24", No: 30, Yes: 70 },
      { date: "02/10/24", No: 45, Yes: 55 },
      { date: "03/10/24", No: 25, Yes: 75 },
      { date: "04/10/24", No: 40, Yes: 60 },
      { date: "05/10/24", No: 60, Yes: 40 },
      { date: "06/10/24", No: 55, Yes: 45 },
      { date: "07/10/24", No: 35, Yes: 65 },
      { date: "08/10/24", No: 20, Yes: 80 },
    ];

  // const data = [
  //   { date: "30-10-24", Yes: 50, No: 30 },
  //   { date: "31-10-24", Yes: 80, No: 50 },
  //   { date: "01-11-24", Yes: 75, No: 40 },
  //   { date: "02-11-24", Yes: 80, No: 20 },
  //   { date: "03-11-24", Yes: 90, No: 50 },
  //   { date: "04-11-24", Yes: 50, No: 30 },
  //   { date: "05-11-24", Yes: 30, No: 20 },


  // ];

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
            fontSize: 14,
            icon: "circle",
            value: "X-axis - Date",
            position: "insideBottomCenter",
            angle: 0,
            offset: -20,
            dy: 30,
            dx: 300,

            fill: "black",
          }}
        />

        <YAxis
          label={{
            fontSize: 14,
            value: "Y-axis - Customer count",
            position: "insideTop",
            angle: 0,
            dy: -8,
            dx: 200,
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
