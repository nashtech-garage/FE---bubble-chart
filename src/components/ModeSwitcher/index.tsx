import { useColorScheme } from "@mui/material/styles";
import { IconButton, Box } from "@mui/material";
import { useState } from "react";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { boxStyle } from "./style";

export const ModeSwitcher = () => {
  const { mode, setMode } = useColorScheme();
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const changeTheme = () => {
    const isLight = mode === "light";
    isLight ? setMode("dark") : setMode("light");
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <>
      <Box sx={boxStyle}>
        {mode} mode
        <IconButton sx={{ ml: 1 }} onClick={changeTheme} color="inherit">
          {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Box>
    </>
  );
};
