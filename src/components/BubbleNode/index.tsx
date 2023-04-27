import { Box, Typography, darken } from "@mui/material";
import { useState } from "react";
import {
  nodeBeforeStyle,
  nodeLabel,
  nodeStyle,
  arrowStyle,
  arrowStyleRight,
  arrowStyleLeft,
} from "./styles";
import { BubbleNodeProps } from "../../models/bubbleNode";
import eventBus from "../../utilities/event-bus";
import { COLOR_CHART_ANNOTATIONS } from "../../constants";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

export default function BubbleNode({
  hoverId,
  bubbleData,
  onHover,
  onMouseLeave,
  defaultTarget,
  chartSize,
  maxTarget,
  chartColor,
}: BubbleNodeProps) {
  const [isHover, setHover] = useState(false);
  const [fixedRadius] = useState(120);
  const nodeColor = chartColor.types.find(
    (i: any) => i.type === bubbleData.type
  );

  //Chart color
  const dottedColor = bubbleData.highlighted
    ? chartColor?.highlight || "red"
    : chartColor?.dotted || "black";
  const titleColor = { color: chartColor?.label.title || "black" };
  const gotSkillColor = {
    color: chartColor?.label.gotSkill || COLOR_CHART_ANNOTATIONS.GOTSKILL,
  };
  const ytdColor = {
    color: chartColor?.label.ytd || COLOR_CHART_ANNOTATIONS.YTD,
  };
  const lmColor = {
    color:
      bubbleData.addedType === "Finished"
        ? chartColor?.label.finished || COLOR_CHART_ANNOTATIONS.FINISHED
        : chartColor?.label.onGoing || COLOR_CHART_ANNOTATIONS.ONGOING,
  };
  const planColor = {
    color: chartColor?.label.plan || COLOR_CHART_ANNOTATIONS.PLAN,
  };

  const handleHover = () => {
    setHover(true);
    onHover();
    eventBus.dispatch(`chart-tooltip`, {
      elementData: bubbleData,
      bgColor: nodeColor.color,
    });
  };

  const handleLeave = () => {
    setHover(false);
    onMouseLeave();
    eventBus.dispatch(`chart-tooltip`, {
      elementData: undefined,
      bgColor: nodeColor.color,
    });
  };

  const getOpacity = () => {
    if (!hoverId) return "1";

    return hoverId === bubbleData.id ? "1" : "0.5";
  };

  const base = bubbleData.target / maxTarget;
  const radius = (chartSize / 24) * base;
  const dfRadius = (defaultTarget / maxTarget) * (chartSize / 24);
  const drawRadius =
    bubbleData.target <= defaultTarget
      ? dfRadius + fixedRadius / 2
      : radius + fixedRadius / 2;

  return (
    <Box
      className={isHover ? "bubbleNode bubbleNodeHover" : "bubbleNode "}
      onMouseOver={handleHover}
      onMouseLeave={handleLeave}
      sx={{
        ...nodeStyle,
        opacity: getOpacity(),
        borderColor: dottedColor,
        borderWidth: "1px",
        left: `${bubbleData.x}%`,
        bottom: `${bubbleData.y}%`,
        padding: `${drawRadius}px`,
        "&:before": {
          ...nodeBeforeStyle,
          width: `${fixedRadius}px`,
          paddingTop: `${fixedRadius}px`,
          backgroundColor: nodeColor.color,
        },
        "&:hover": {
          zIndex: "10",
          "&:before": {
            transform: `translate(-50%, -50%)`,
            zIndex: "10",
          },
        },
      }}
      data-type={bubbleData.type}
    >
      <Typography sx={nodeLabel}>
        <span style={titleColor}>{bubbleData.name}</span> (
        <span style={gotSkillColor}>{bubbleData.gotSkill}</span>{" "}
        <span style={ytdColor}>{bubbleData.YTD}</span>{" "}
        <span style={lmColor}>+{bubbleData.LM}</span>{" "}
        <span style={planColor}>/+{bubbleData.target}</span>)
      </Typography>
      <Box
        sx={{
          ...arrowStyle,
          width: `${drawRadius - fixedRadius / 2}px`,
        }}
      >
        <ArrowLeftIcon
          sx={{
            ...arrowStyleLeft,
          }}
        />
        <ArrowRightIcon
          sx={{
            ...arrowStyleRight,
          }}
        />

        <span style={{ pointerEvents: "none" }}>+{bubbleData.target}</span>
      </Box>
    </Box>
  );
}
