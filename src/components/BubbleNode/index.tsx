import { Box, Typography, darken } from "@mui/material";
import { useState, useEffect } from "react";
import { nodeBeforeStyle, nodeLabel, nodeStyle, arrowStyle } from "./styles";
import { BubbleNodeProps } from "../../models/bubbleNode";
// import { ColorTranslator, Harmony, Mix } from "colortranslator";
import eventBus from "../../utilities/event-bus";
import { COLOR_CHART_ANNOTATIONS, LOCAL_STORAGE } from "../../constants";
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
}: BubbleNodeProps) {
  const [isHover, setHover] = useState(false);
  const [fixedRadius] = useState(120);
  //Chart color
  const getChartColor: any = localStorage.getItem(LOCAL_STORAGE.CHART_COLOR);
  const chartColor = JSON.parse(getChartColor);
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
      : darken(bubbleData.color, 0.15);
  };
  const base = bubbleData.target / maxTarget;
  const radius = (chartSize / 24) * base;
  const dfRadius = (defaultTarget / maxTarget) * (chartSize / 24);
  const drawRadius =
    bubbleData.target <= defaultTarget
      ? dfRadius + fixedRadius / 2
      : radius + fixedRadius / 2;

  const scale = drawRadius / (fixedRadius / 2);

  return (
    <Box
      className={isHover ? "bubbleNode bubbleNodeHover" : "bubbleNode "}
      onMouseOver={handleHover}
      onMouseLeave={handleLeave}
      sx={{
        ...nodeStyle,
        borderColor: dottedColor,
        borderWidth: bubbleData.highlighted ? "3px" : "1px",
        left: `${bubbleData.x}%`,
        bottom: `${bubbleData.y}%`,
        padding: `${drawRadius}px`,
        "&:before": {
          ...nodeBeforeStyle,
          width: `${fixedRadius}px`,
          paddingTop: `${fixedRadius}px`,
          backgroundColor: getBGColor(),
        },
        "&:hover": {
          zIndex: "10",
          "&:before": {
            transform: `translate(-50%, -50%) scale(${scale})`,
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
          "& span": {
            fontSize: "10px",
          },
        }}
      >
        <ArrowLeftIcon
          sx={{
            left: bubbleData.target <= defaultTarget ? "-50%" : "-25%",
          }}
        />
        <ArrowRightIcon
          sx={{
            left: bubbleData.target <= defaultTarget ? "35%" : "60%",
          }}
        />
        <span>+{bubbleData.target}</span>
      </Box>
    </Box>
  );
}
