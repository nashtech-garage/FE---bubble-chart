import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import ColorPicker from "../ColorPicker";
import { FormStyle, RowStyle } from "./styles";

export default function MasterDataForm() {
  const [typeColor, setTypeColor] = useState("red");
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // const data = new FormData(event.currentTarget);
  };
  const handleChange = (color: any) => {
    setTypeColor(color.hex);
  };
  return (
    <Box sx={FormStyle}>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <Box sx={RowStyle}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="type"
            label="Type name"
            name="type"
            autoComplete="type"
            autoFocus
            sx={{ input: { color: typeColor } }}
          />
          <ColorPicker onComplete={handleChange} defaultColor={typeColor} />
        </Box>
        <Button type="submit" fullWidth variant="contained">
          Submit
        </Button>
      </Box>
    </Box>
  );
}
