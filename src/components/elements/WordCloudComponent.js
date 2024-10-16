import React from "react";
import { Resizable } from "react-resizable";
import WordCloud from "react-wordcloud";

// rolls
// spring
// chilly
// manchurian
// ice cream
// burger
// combo
// rolls
// panner
// cold drinks
// noodles
// coffee
// chilly
// momos
// potato
// french fries
// fried rice

const words = [
  { text: "spring rolls", value: 40 },
  { text: "chilly", value: 35 },
  { text: "manchurian", value: 25 },
  { text: "ice cream", value: 20 },
  { text: "burger", value: 22 },
  { text: "combo", value: 15 },
  { text: "panner", value: 28 },
  { text: "cold drinks", value: 18 },
  { text: "noodles", value: 32 },
  { text: "coffee", value: 17 },
  { text: "momos", value: 24 },
  { text: "potato", value: 14 },
  { text: "french fries", value: 27 },
  { text: "fried rice", value: 21 },
];

const options = {
  rotations: 2,
  rotationAngles: [-90, 0],
  fontSizes: [15, 60],
};

const resizeStyle = {
  // display: "flex",
  // alignItems: "center",
  // justifyContent: "center",
  border: "solid 1px #ddd",
  background: "#1B1B1B",
  width: "100%",
  height: "100%",
  borderRadius: "6px",
};
const WordCloudComponent = () => (
  <Resizable
  defaultSize={{
    width: "100%",
    height: "100%",
  }}

    style={resizeStyle}
  >
    {/* <div
      style={{
        width: "100%",
        height: "100%",
        background: "#1B1B1B",
        borderRadius: "6px",
      }}
    > */}
      <WordCloud
        words={words}
        options={options}
        style={{ width: "100%", height: "100%" }}
      />
    {/* </div> */}
  </Resizable>
);

export default WordCloudComponent;
