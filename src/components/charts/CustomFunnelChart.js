import axios from "axios";
import { useEffect, useState } from "react";
import {
  FunnelChart,
  Funnel,
  LabelList,
  ResponsiveContainer,
  Legend,
  Tooltip,
  
  Cell,
} from "recharts";

const CustomFunnelChart = ({ selectedRange }) => {
  const [upsellGraphData, setUpsellGraphData] = useState([
    { value: 70, name: "Total Orders", fill: "#FD8744" },
    { value: 80, name: "Upsell Opportunities", fill: "#0B8FD9" },
    { value: 10, name: "Successful Upsell Conversions", fill: "#47A563" },
  ]);

  const UpsellAttemptsData = async () => {
    const url = "https://api.hongs.razorsharp.in";
    try {
      const tokenString = sessionStorage.getItem("token");
      const token = JSON.parse(tokenString);
      const response = await axios.get(
        `${url}/dashboard/upsell/2304/${selectedRange.toLowerCase()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUpsellGraphData([
        { ...upsellGraphData[0], value: response.data.currentTotalOrder },
        { ...upsellGraphData[1], value: response.data.currentTotalAttempted },
        { ...upsellGraphData[2], value: response.data.currentTotalsuccessful },
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    UpsellAttemptsData();
  }, [selectedRange]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // width: "100%",
        // height: "334px",
      }}
    >
      <FunnelChart width={364} height={400}>
        <Legend
          style={{ alignSelf: "flex-start" }}
          iconType="circle"
          verticalAlign="bottom"
          horizOriginX={0}
          layout="vertical"
          payload={upsellGraphData?.map((item) => ({
            value: item.name,
            type: "circle",
            id: item.name,
            color: item.fill,
          }))}
          // formatter={(value, entry) => (
          //   <span style={{ color: "#000", fontWeight: 400, fontSize: "14px" }}>
          //     {`${value}: ${entry.payload.value}`}
          //   </span>
          // )}
          
          contentStyle={{ fontSize: "14px", fontWeight: "bold", color: "#000" }}      
        />

        <Funnel
          dataKey="value"
          data={upsellGraphData}
          isAnimationActive
          label={{ position: "center", fill: "#fff" }}
        >
          <LabelList
            position="inside"
            fill="#fff"
            stroke="none"
            dataKey="value"
          />
        </Funnel>
      </FunnelChart>
    </div>
  );
};

export default CustomFunnelChart;
