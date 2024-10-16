import { useEffect, useState } from "react";
import { PieChart, Pie, Tooltip, Cell ,Legend ,ResponsiveContainer } from "recharts";



const COLORS = ["#3CAB00B2", "#FF2E1EE5"];
const renderColorfulLegendText = (value, entry) => {
  return (
    <span style={{ color: "#000", fontWeight: 400, fontSize: "12px" }}>
      {value}
    </span>
  );
};

const CustomPieChart = ({attempted,successfull}) => {
 
  const [data,setData] = useState( [
    { name: "Attempts", value: 66 },
    { name: "Successfull", value: 34 },
  ])

  useEffect(()=>{
    setData([{...data[0],value:Number(attempted)},{...data[1],value:Number(successfull)}])
  
   },[attempted,successfull])

  return (
    <ResponsiveContainer
      width="100%"
      height="100%"
      style={{ background: "#9A6ADB29", borderRadius: "8px" }}
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
          outerRadius={60}
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

export default CustomPieChart;
