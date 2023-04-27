import { Box, Button, TextField } from "@mui/material";
import { useRef, useState } from "react";
import ColorPicker from "../ColorPicker";
import { FormStyle, RowStyle } from "./styles";
import { randomId } from "@mui/x-data-grid-generator";
import { containsObject } from "../../utilities";

export default function MasterDataForm({ dataSets, updateData }: any) {
  const [typeColor, setTypeColor] = useState("");
  const [hasError, setHasError] = useState(false);
  const [helperText, setHelperText] = useState("");

  const inputRef = useRef<any>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!inputRef.current) return;
    const newType = {
      color: typeColor,
      data: [],
      id: randomId(),
      type: inputRef.current.value,
    };
    if (containsObject(newType, dataSets)) {
      setHasError(true);
      setHelperText("Type already exists.");
    } else {
      setHasError(false);
      setHelperText("Type added successfully.");
      updateData([...dataSets, newType]);
    }
  };
  const handleChange = (color: any) => {
    setTypeColor(color.hex);
  };
  return (
    <Box sx={FormStyle}>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <Box sx={RowStyle}>
          <TextField
            error={hasError}
            helperText={helperText}
            inputRef={inputRef}
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
