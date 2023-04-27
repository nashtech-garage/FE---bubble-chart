import { Box } from "@mui/system";
import { useState, useEffect } from "react";
import { SwatchesPicker } from "react-color";
import { popover, cover } from "./styles";

interface ColorPickerProps {
  onComplete?: (color: any) => void;
  defaultColor: string;
  style?: {};
}

export default function ColorPicker({
  onComplete,
  defaultColor,
  style,
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

  useEffect(() => {
    setColor(defaultColor);
  }, [defaultColor]);

  return (
    <>
      <Box
        className="colorBox"
        sx={{
          marginLeft: "10px",
          width: "80px",
          height: "30px",
          border: "5px solid white",
          borderRadius: "5px",
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          backgroundColor: selectedColor,
          ...style,
        }}
        onClick={handleClick}
      ></Box>
      {displayColorPicker ? (
        <Box sx={popover}>
          <Box sx={cover} onClick={handleClose} />
          <SwatchesPicker
            onChangeComplete={onComplete}
            onChange={handleChange}
          />
        </Box>
      ) : null}
    </>
  );
}
