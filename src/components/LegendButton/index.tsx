import { Box, Button, Typography } from "@mui/material";
import { colorIndicator } from "./styles";
import { useState } from "react";

const LegendButton = ({ dataSet, handleToggle, chartColor }: any) => {
  const nodeColor = chartColor.types.find((i: any) => i.type === dataSet.type);
  const [isHide, setHide] = useState<boolean>(false);
  const handleClick = () => {
    handleToggle(dataSet.type);
    setHide(!isHide);
  };
  return (
    <Box
      sx={{ padding: "0 0.5rem", backgroundColor: "rgba(255, 255, 255, 0.7)" }}
    >
      <Button
        sx={{
          color: "black",
          textTransform: "capitalize",
          width: "100%",
          justifyContent: "flex-start",
        }}
        type="button"
        onClick={handleClick}
      >
        <Typography
          sx={{
            display: "flex",
            alignItems: "center",
            textDecoration: isHide ? "line-through" : "unset",
            "&:before": {
              ...colorIndicator,
              backgroundColor: nodeColor.color,
            },
          }}
        >
          {dataSet.type}
        </Typography>
      </Button>
    </Box>
  );
};

export default LegendButton;
