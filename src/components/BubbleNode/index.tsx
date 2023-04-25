import { Box, Typography, darken } from "@mui/material";
import { useState } from "react";
import { nodeBeforeStyle, nodeLabel, nodeStyle } from "./styles";
import { BubbleNodeProps } from "../../models/bubbleNode";
import { ColorTranslator, Harmony, Mix } from "colortranslator";

export default function BubbleNode({
  hoverId,
  bubbleData,
  onHover,
  onMouseLeave,
}: BubbleNodeProps) {
  const [isHover, setHover] = useState(false);
  const handleHover = () => {
    setHover(true);
    onHover();
  };
  const handleLeave = () => {
    setHover(false);
    onMouseLeave();
  };

  const getBGColor = () => {
    if (!hoverId) return bubbleData.color;

    return hoverId === bubbleData.id
      ? bubbleData.color
      : darken(bubbleData.color, 0.4);
  };

  return (
    <Box
      className={isHover ? "bubbleNode bubbleNodeHover" : "bubbleNode "}
      onMouseOver={handleHover}
      onMouseLeave={handleLeave}
      sx={{
        ...nodeStyle,
        left: `${bubbleData.x}%`,
        bottom: `${bubbleData.y}%`,
        padding: `80px`,
        "&:before": {
          ...nodeBeforeStyle,
          backgroundColor: getBGColor(),
        },
      }}
      data-type={bubbleData.type}
    >
      <Typography sx={nodeLabel}>
        Lorem Ipsum (<span>10</span> <span>+10</span> <span>/10</span> )
      </Typography>
    </Box>
  );
}
