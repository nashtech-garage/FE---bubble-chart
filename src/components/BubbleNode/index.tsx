import { Box, Typography, darken } from "@mui/material";
import { useState } from "react";
import { nodeBeforeStyle, nodeLabel, nodeStyle, arrowStyle } from "./styles";
import { BubbleNodeProps } from "../../models/bubbleNode";
import { ColorTranslator, Harmony, Mix } from "colortranslator";
import eventBus from "../../utilities/event-bus";
import { COLOR_CHART_ANNOTATIONS } from "../../constants";

export default function BubbleNode({
  hoverId,
  bubbleData,
  onHover,
  onMouseLeave,
  defaultTarget,
  chartSize,
  maxTarget,
}: BubbleNodeProps) {
  const [isHover, setHover] = useState(false);
  const [fixedRadius] = useState(60);
  const handleHover = () => {
    setHover(true);
    onHover();
    eventBus.dispatch(`chart-tooltip`, {
      elementData: bubbleData,
      bgColor: bubbleData.color,
    });
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
  const base = bubbleData.target / maxTarget;
  const radius = (chartSize / 24) * base;
  const dfRadius = (defaultTarget / maxTarget) * (chartSize / 24);
  const drawRadius =
    bubbleData.target <= defaultTarget
      ? dfRadius + fixedRadius
      : radius + fixedRadius;

  return (
    <Box
      className={isHover ? "bubbleNode bubbleNodeHover" : "bubbleNode "}
      onMouseOver={handleHover}
      onMouseLeave={handleLeave}
      sx={{
        ...nodeStyle,
        width: `${fixedRadius}px`,
        left: `${bubbleData.x}%`,
        bottom: `${bubbleData.y}%`,
        padding: `${drawRadius}px`,
        "&:before": {
          ...nodeBeforeStyle,
          backgroundColor: getBGColor(),
        },
      }}
      data-type={bubbleData.type}
    >
      <Typography sx={nodeLabel}>
        {bubbleData.name} (
        <span style={{ color: COLOR_CHART_ANNOTATIONS.GOTSKILL }}>
          {bubbleData.gotSkill}
        </span>{" "}
        <span style={{ color: COLOR_CHART_ANNOTATIONS.YTD }}>
          {bubbleData.YTD}
        </span>{" "}
        <span
          style={{
            color:
              bubbleData.addedType === "Finished"
                ? COLOR_CHART_ANNOTATIONS.FINISHED
                : COLOR_CHART_ANNOTATIONS.ONGOING,
          }}
        >
          +{bubbleData.LM}
        </span>{" "}
        <span style={{ color: COLOR_CHART_ANNOTATIONS.PLAN }}>
          /+{bubbleData.target}
        </span>
        )
      </Typography>
      <Box sx={{ ...arrowStyle, width: `${drawRadius - fixedRadius}px` }}></Box>
    </Box>
  );
}
