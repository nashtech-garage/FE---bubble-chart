import { AppBar, List, ListItemText } from "@mui/material";
import { Box } from "@mui/system";

const TooltipPanel = (elementData: any) => {
  const data = elementData.elementData;
  const panel = data.elementData;
  const bgColor = data.bgColor;

  return (
    <Box>
      <AppBar position="static" sx={{ backgroundColor: bgColor }}>
        <h3>{panel?.label}</h3>
      </AppBar>
      <List component="nav" aria-label="main mailbox folders">
        <ListItemText primary={`GotSkill: ${panel?.gotSkill}`} />
        <ListItemText primary={`Plan: ${panel?.target}`} />
        <ListItemText primary={`Added (YID) : ${panel?.YTD}`} />
        <ListItemText primary={`Added (LM) : ${panel?.LM}`} />
      </List>
    </Box>
  );
};

export default TooltipPanel;
