import React from "react";
import WordCloud from "react-wordcloud";

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
  fontSizes: [12, 60],
};

const WordCloudComponent = () => {
  return (
      <WordCloud
        words={words}
        options={options}
        style={{
          border: "solid 1px #ddd",
          background: "#1B1B1B",
          width: "100%",
          height: "100%",
          borderRadius: "6px",
        }}
      />
  );
};

export default WordCloudComponent;
