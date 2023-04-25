import { useEffect, useState } from "react";
import { BubbleChartHTMLProps } from "../../models/bubbleNode";
import { Box } from "@mui/material";
import BubbleNode from "../BubbleNode";
import { DataChildType } from "../../models";
import { generateChartDataExt, generateGridRows } from "../../transformData";
import { hover } from "./styles";

export default function BubbleChartHTML({
  options,
  dataset,
}: BubbleChartHTMLProps) {
  const [bubbles, setBubbles] = useState<DataChildType[]>(
    generateChartDataExt(dataset)
  );
  const [isHover, setHover] = useState(false);
  /*  useEffect(() => {
    console.log(bubbles);
  }); */
  const handleHover = () => {
    setHover(true);
  };
  const handleLeave = () => {
    setHover(false);
  };
  return (
    <Box
      className={isHover ? "hover" : ""}
      sx={{
        position: "relative",
        zIndex: "1",
        border: "1px solid red",
        height: "80vh",
        ...hover,
      }}
    >
      {bubbles &&
        bubbles.map((bubble: any, i: number) => (
          <BubbleNode
            key={`bubble-${i}`}
            bubbleData={bubble}
            onHover={handleHover}
            onMouseLeave={handleLeave}
          />
        ))}
    </Box>
  );
}
