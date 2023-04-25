import { Box } from "@mui/material";
import { quadrant, line, lineVertical } from "./styles";

const Quadrant = () => {
  return (
    <Box sx={quadrant}>
      <Box sx={line}></Box>
      <Box sx={lineVertical}></Box>
    </Box>
  );
};

export default Quadrant;
