import { Box, Typography } from "@mui/material";
import { title } from "../../assets/dummy/mockData";

export default function Heading() {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Typography variant="h1">{title}</Typography>
    </Box>
  );
}
