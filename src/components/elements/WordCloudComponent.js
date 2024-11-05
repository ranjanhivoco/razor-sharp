import React from "react";
import WordCloud from "react-wordcloud";

const words = [
  { text: "spring rolls", value: 40 },
  { text: "chilly", value: 35 },
  { text: "manchurian", value: 25 },
  { text: "combo", value: 15 },
  { text: "paneer", value: 28 },
  { text: "cold drinks", value: 18 },
  { text: "noodles", value: 32 },
  { text: "momos", value: 24 },
  { text: "fried rice", value: 21 },
  { text: "honey chilli", value: 30 },
  { text: "hakka noodles", value: 36 },
  { text: "gravy", value: 22 },
  { text: "thukpa", value: 27 },
  { text: "chicken wings", value: 33 },
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
