import { Box } from "@mui/material";
import { line, lineVertical, arrowStyle } from "./styles";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

const ScalesXY = () => {
  return (
    <Box>
      <Box sx={line}>
        <ArrowRightIcon
          sx={{
            ...arrowStyle,
            top: "-32px",
            right: "calc(0% + -35px)",
          }}
        />
      </Box>
      <Box sx={lineVertical}>
        <ArrowDropUpIcon sx={{ ...arrowStyle, top: "-24px", left: "-28px" }} />
      </Box>
    </Box>
  );
};

export default ScalesXY;
