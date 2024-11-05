// import React from "react";
import {
  FunnelChart,
  Funnel,
  LabelList,
  ResponsiveContainer,
  Legend,
  Tooltip,
  Cell,
} from "recharts";

const data = [
  { value: 100, name: "Total Orders", fill: "#FD8744" }, // Orange
  { value: 80, name: "Upsell Opportunities", fill: "#0B8FD9" }, // Blue
  { value: 50, name: "Successful Upsell Conversions", fill: "#47A563" }, // Green
];

const CustomFunnelChart = () => {
  return (
    // <div style={{ width: "500px", height: "234px" }}>
    //   <ResponsiveContainer width="100%" height="100%">
    //     <FunnelChart>
    //       <Legend
    //         height={36}
    //         iconType="circle"
    //         layout="vertical"
    //         verticalAlign="middle"
    //         align="right"
    //         iconSize={8}
    //         formatter={renderColorfulLegendText}
    //       />

    //       <Funnel dataKey="value" data={data} isAnimationActive>
    //         <LabelList
    //           position="center"
    //           fill="#fff"
    //           stroke="none"
    //           dataKey="value"
    //         />
    //       </Funnel>
    //     </FunnelChart>
    //   </ResponsiveContainer>

    //   {/* <div
    //     style={{
    //       display: "flex",
    //       flexDirection: "column",
    //       position: "absolute",
    //       right: "10px",
    //       top: "10px",
    //       backgroundColor: "rgba(255, 255, 255, 0.8)",
    //       padding: "10px",
    //       borderRadius: "5px",
    //     }}
    //   >
    //     {data?.map((entry, index) => (
    //       <div
    //         key={`item-${index}`}
    //         style={{
    //           display: "flex",
    //           alignItems: "center",
    //           marginBottom: "5px",
    //         }}
    //       >
    //         <div
    //           style={{
    //             width: "10px",
    //             height: "10px",
    //             borderRadius: "50%",
    //             backgroundColor: entry.fill,
    //             marginRight: "5px",
    //           }}
    //         />
    //         <span style={{ color: "#000", fontSize: "12px" }}>
    //           {entry.name}
    //         </span>
    //       </div>
    //     ))}
    //   </div> */}
    // </div>

    // <div style={{ width: "500px", height: "234px" }}>
    // <ResponsiveContainer width="100%" height="100%">

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
          payload={data.map((item) => ({
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
          data={data}
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

    //  </ResponsiveContainer>

    // </div>
  );
};

export default CustomFunnelChart;
