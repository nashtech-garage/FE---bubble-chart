import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { ComponentType, useCallback, useRef, useState } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import CloseIcon from "@mui/icons-material/Close";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { style } from "./styles";

export default function withFields<T>(Component: ComponentType<T>) {
  return (hocProps: T | any): any => {
    const [open, setOpen] = useState<boolean>(false);
    const [year, setYear] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [jsonData, setJsonData] = useState<any[] | null>(null);

    const handleChange = (event: SelectChangeEvent) => {
      setYear(event.target.value as string);
    };
    const inputRef = useRef<any>(null);

    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = (event: any, reason: any) => {
      if (reason && reason === "backdropClick") return;
    };
    const handleSubmit = useCallback(
      (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        hocProps.fileImport({
          ...jsonData,
          title: data.get("title"),
          year: year,
        });
        setOpen(false);
        setFile(null);
      },
      [hocProps, jsonData, year]
    );

    const renderYearItem = () => {
      const year = new Date().getFullYear();
      const numOfItem = 7;
      const years = Array.from(
        new Array(numOfItem),
        (val, index) => year - Math.round(numOfItem / 2) + index
      );

      return years.map((year, index) => {
        return (
          <MenuItem key={`year${index}`} value={year}>
            {year}
          </MenuItem>
        );
      });
    };
    const handleFileChange = (file: any, data: any) => {
      setFile(file);
      setJsonData(data);
    };
    return (
      <>
        <IconButton component="span" aria-label="import" onClick={handleOpen}>
          <FileUploadIcon />
        </IconButton>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} component="form" onSubmit={handleSubmit}>
            <Typography id="modal-modal-title" variant="h5" component="h2">
              Import Data modal
              <IconButton
                sx={{ position: "absolute", right: -5, top: -5 }}
                aria-label="export"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <CloseIcon />
              </IconButton>
            </Typography>
            <Grid pt={2}>
              {file ? (
                `Selected file: ${file?.name}`
              ) : (
                <Component {...hocProps} onChange={handleFileChange} />
              )}
              <Grid py={1}>
                <TextField
                  inputRef={inputRef}
                  margin="normal"
                  fullWidth
                  id="type"
                  label="Title"
                  name="title"
                  autoComplete="title"
                  autoFocus
                />
              </Grid>
              <Grid py={1}>
                <FormControl style={{ width: "100%" }}>
                  <InputLabel id="select-year-label">Year</InputLabel>
                  <Select
                    labelId="select-year-label"
                    id="select-year"
                    value={year}
                    label="Year"
                    onChange={handleChange}
                  >
                    {renderYearItem()}
                  </Select>
                </FormControl>
              </Grid>
              <Grid py={1} container justifyContent={"center"}>
                <Button type="submit" variant="contained">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Modal>
      </>
    );
  };
}
