import { useState } from "react";
import { BubbleChartHTMLProps } from "../../models/bubbleNode";
import { Box } from "@mui/material";
import BubbleNode from "../BubbleNode";
import { DataChildType } from "../../models";
import { generateChartDataExt } from "../../transformData";

export default function BubbleChartHTML({
  options,
  dataset,
}: BubbleChartHTMLProps) {
  const [bubbles, setBubbles] = useState<DataChildType[]>(
    generateChartDataExt(dataset)
  );

  const [hoverId, setHoverId] = useState(null);

  const handleHover = (id: any) => {
    setHoverId(id);
  };
  const handleLeave = () => {
    setHoverId(null);
  };
  return (
    <Box
      className={hoverId ? "hover" : ""}
      sx={{
        position: "relative",
        zIndex: "1",
        border: "1px solid red",
        height: "80vh",
      }}
    >
      {bubbles &&
        bubbles.map((bubble: any, i: number) => (
          <BubbleNode
            key={`bubble-${i}`}
            bubbleData={bubble}
            onHover={() => handleHover(bubble.id)}
            onMouseLeave={handleLeave}
            hoverId={hoverId}
          />
        ))}
    </Box>
  );
}
