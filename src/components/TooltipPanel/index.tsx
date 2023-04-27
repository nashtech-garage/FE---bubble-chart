import { AppBar, List, ListItem, ListItemText, Paper } from "@mui/material";
import { Box } from "@mui/system";
import { ADDED_TYPES, COLOR_CHART_ANNOTATIONS } from "../../constants";
import { Heading, listStyled } from "./styles";

const TooltipPanel = ({ elementData, chartColor }: any) => {
  const panel = elementData.elementData;
  const bgColor = elementData.bgColor;

  const gotSkillColor =
    chartColor?.label.gotSkill || COLOR_CHART_ANNOTATIONS.GOTSKILL;
  const ytdColor = chartColor?.label.ytd || COLOR_CHART_ANNOTATIONS.YTD;
  const finishedColor =
    chartColor?.label.finished || COLOR_CHART_ANNOTATIONS.FINISHED;
  const ongoingColor =
    chartColor?.label.onGoing || COLOR_CHART_ANNOTATIONS.ONGOING;
  const planColor = chartColor?.label.plan || COLOR_CHART_ANNOTATIONS.PLAN;

  return (
    <>
      <Box>
        <Paper variant="outlined">
          <AppBar position="static" sx={{ backgroundColor: bgColor }}>
            <Heading variant="h2">{panel?.name || "Skill name"}</Heading>
          </AppBar>
          <List component="ul" sx={listStyled}>
            <ListItem sx={{ color: gotSkillColor }}>
              <ListItemText primary="GotSkill:" />
              <ListItemText
                primary={panel?.gotSkill > 0 ? panel?.gotSkill : 0}
              />
            </ListItem>

            <ListItem sx={{ color: planColor }}>
              <ListItemText primary="Plan:" />
              <ListItemText primary={panel?.target > 0 ? panel?.target : 0} />
            </ListItem>
            <ListItem sx={{ color: ytdColor }}>
              <ListItemText primary="Added (YTD):" />
              <ListItemText primary={panel?.YTD > 0 ? panel?.YTD : 0} />
            </ListItem>
            <ListItem
              sx={{
                color:
                  panel?.addedType === ADDED_TYPES.FINISHED
                    ? finishedColor
                    : ongoingColor || ongoingColor,
              }}
            >
              <ListItemText primary="Added (LM):" />
              <ListItemText primary={panel?.LM > 0 ? panel?.LM : 0} />
            </ListItem>
          </List>
        </Paper>
      </Box>
    </>
  );
};

export default TooltipPanel;
