import { Box, Typography } from "@mui/material";
import { noteSection } from "./styles";
import { COLOR_CHART_ANNOTATIONS } from "../../constants";

const NoteSection = ({ chartColor }: any) => {
  const gotSkillColor =
    chartColor?.label.gotSkill || COLOR_CHART_ANNOTATIONS.GOTSKILL;
  const ytdColor = chartColor?.label.ytd || COLOR_CHART_ANNOTATIONS.YTD;
  const finishedColor =
    chartColor?.label.finished || COLOR_CHART_ANNOTATIONS.FINISHED;
  const ongoingColor =
    chartColor?.label.onGoing || COLOR_CHART_ANNOTATIONS.ONGOING;
  const planColor = chartColor?.label.plan || COLOR_CHART_ANNOTATIONS.PLAN;
  const currentYear = new Date().getFullYear();

  const displayContents = [
    "(x) Got skill",
    "(x) Added last month (ongoing)",
    "(x) Added last month (finished)",
    `(x) Added in ${currentYear}`,
    `(x) Target to add more till the end of ${currentYear}`,
  ];

  const colorArrays = [
    gotSkillColor,
    ongoingColor,
    finishedColor,
    ytdColor,
    planColor,
  ];

  return (
    <Box sx={noteSection}>
      {displayContents.map((content: string, index) => (
        <Typography sx={{ color: `${colorArrays[index]}` }} key={content}>
          {content}
        </Typography>
      ))}
    </Box>
  );
};

export default NoteSection;
