import { Box, Typography } from "@mui/material";
import { title } from "../../assets/dummy/mockData";
import { LOCAL_STORAGE } from "../../constants";
import { useEffect, useState } from "react";

export default function Heading() {
  const [chartTitle, setTitle] = useState("");
  const [year, setYear] = useState("");
  useEffect(() => {
    const localStorageTitle = localStorage.getItem(LOCAL_STORAGE.TITLE);
    if (typeof localStorageTitle !== "string") {
      localStorage.setItem(LOCAL_STORAGE.TITLE, title);
    }
    localStorageTitle && setTitle(localStorageTitle);

    const localStorageYear = localStorage.getItem(LOCAL_STORAGE.YEAR);
    if (typeof localStorageYear !== "string") {
      localStorage.setItem(LOCAL_STORAGE.YEAR, year);
    }
    localStorageYear && setYear(localStorageYear);
    const handleStorageEvent = (event: any) => {
      // Check the changed key and react accordingly
      if (event.key === LOCAL_STORAGE.TITLE) {
        // Update the UI theme based on the new value
        setTitle(event.newValue);
      }
      if (event.key === LOCAL_STORAGE.YEAR) {
        setYear(event.newValue);
      }
    };

    // Add the event listener to the window object
    window.addEventListener("storage", handleStorageEvent);
  }, []);
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Typography variant="h1">{`${chartTitle} ${year}`}</Typography>
    </Box>
  );
}
