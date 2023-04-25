import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { nodeBeforeStyle, nodeLabel, nodeStyle } from "./styles";
import { BubbleNodeProps } from "../../models/bubbleNode";
import { ColorTranslator, Harmony, Mix } from "colortranslator";

export default function BubbleNode({
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
          backgroundColor: bubbleData.color,
        },
      }}
    >
      <Typography sx={nodeLabel}>
        Lorem Ipsum (<span>10</span> <span>+10</span> <span>/10</span> )
      </Typography>
    </Box>
  );
}
