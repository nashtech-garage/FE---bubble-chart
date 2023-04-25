import { useEffect, useLayoutEffect, useState, useRef, useMemo } from "react";
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
  /*  useEffect(() => {
    console.log(bubbles);
  }); */
  const ref = useRef<any>(null);
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    if (ref.current) setWidth(ref.current.offsetWidth);
  }, []);

  const maxTarget = useMemo(
    () => Math.max(...bubbles.map((data: any) => data.target)),
    [bubbles]
  );
  const defaultTarget = Math.round(maxTarget / 2);

  const handleHover = (id: any) => {
    setHoverId(id);
  };
  const handleLeave = () => {
    setHoverId(null);
  };
  return (
    <Box
      ref={ref}
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
            maxTarget={maxTarget}
            defaultTarget={defaultTarget}
            chartSize={width}
          />
        ))}
    </Box>
  );
}
