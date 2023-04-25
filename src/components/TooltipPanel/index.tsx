import { AppBar, List, ListItem, ListItemText, Paper } from "@mui/material";
import { Box } from "@mui/system";
import { ADDED_TYPES, COLOR_CHART_ANNOTATIONS } from "../../constants";
import { Heading, listStyled } from "./styles";
import BubbleNode from "../BubbleNode";

const TooltipPanel = (elementData: any) => {
  const data = elementData.elementData;
  const panel = data.elementData;
  const bgColor = data.bgColor;
  return (
    <>
      <Box>
        <Paper variant="outlined">
          <AppBar position="static" sx={{ backgroundColor: bgColor }}>
            <Heading variant="h2">{panel?.label}</Heading>
          </AppBar>
          <List component="ul" sx={listStyled}>
            <ListItem color="text.primary">
              <ListItemText primary="GotSkill:" />
              <ListItemText
                primary={panel?.gotSkill > 0 ? panel?.gotSkill : 0}
              />
            </ListItem>

            <ListItem sx={{ color: COLOR_CHART_ANNOTATIONS.PLAN }}>
              <ListItemText primary="Plan:" />
              <ListItemText primary={panel?.target > 0 ? panel?.target : 0} />
            </ListItem>
            <ListItem sx={{ color: COLOR_CHART_ANNOTATIONS.YTD }}>
              <ListItemText primary="Added (YTD):" />
              <ListItemText primary={panel?.YTD > 0 ? panel?.YTD : 0} />
            </ListItem>
            <ListItem
              sx={{
                color:
                  panel?.addedType === ADDED_TYPES.FINISHED
                    ? COLOR_CHART_ANNOTATIONS.FINISHED
                    : COLOR_CHART_ANNOTATIONS.ONGOING,
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
