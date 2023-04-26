import { Box, Button, Typography } from "@mui/material";
import { colorIndicator } from "./styles";

const LegendButton = ({ dataSet, handleToggle, chartColor }: any) => {
  const nodeColor = chartColor.types.find((i: any) => i.type === dataSet.type);
  return (
    <Box sx={{ padding: "0 0.5rem" }}>
      <Button
        sx={{
          color: "black",
          textTransform: "capitalize",
          width: "100%",
          justifyContent: "flex-start",
        }}
        type="button"
        onClick={() => handleToggle(dataSet.type)}
      >
        <Box sx={{ ...colorIndicator, backgroundColor: nodeColor.color }}></Box>
        <Typography>{dataSet.type}</Typography>
      </Button>
    </Box>
  );
};

export default LegendButton;
