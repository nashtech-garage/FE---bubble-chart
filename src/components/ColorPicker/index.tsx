import { Box } from "@mui/system";
import { useState } from "react";
import { CompactPicker } from "react-color";
import { popover, cover } from "./styles";

interface ColorPickerProps {
  onComplete: (color: any) => void;
  defaultColor: string;
}

export default function ColorPicker({
  onComplete,
  defaultColor,
}: ColorPickerProps) {
  const [displayColorPicker, setDisplayColorPicker] = useState<boolean>(false);
  const [selectedColor, setColor] = useState<string>(defaultColor);

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const handleChange = (color: any, e: any) => {
    setColor(color.hex);
  };

  return (
    <>
      <Box
        className="colorBox"
        sx={{
          minWidth: 30,
          minHeight: 30,
          backgroundColor: selectedColor,
        }}
        onClick={handleClick}
      ></Box>
      {displayColorPicker ? (
        <Box sx={popover}>
          <Box sx={cover} onClick={handleClose} />
          <CompactPicker
            onChangeComplete={onComplete}
            onChange={handleChange}
          />
        </Box>
      ) : null}
    </>
  );
}
