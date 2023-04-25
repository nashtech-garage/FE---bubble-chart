import { useEffect, useState } from "react";
import {
  IconButton,
  Modal,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import CloseIcon from "@mui/icons-material/Close";
import ColorPicker from "../ColorPicker";
import { NoteType } from "../../assets/dummy/mockData";
import { LOCAL_STORAGE } from "../../constants";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const lineStyle = {
  display: "flex",
  alignItems: "center",
  margin: "30px 0",
};

function Setting() {
  const getChartColor = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE.CHART_COLOR) || ""
  );
  const [open, setOpen] = useState<boolean>(false);
  const [chartColor, setChartColor] = useState<any>(getChartColor);
  const [types, setTypes] = useState<any[]>([]);
  const [type, setType] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [highlight, setHighlight] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  // const [title, setHighlight] = useState<string>("");
  // const [highlight, setHighlight] = useState<string>("");
  const handleOpen = () => {
    const defaultValue = NoteType[0];
    setOpen(true);
    setTitle(chartColor.label.title);
    setHighlight(chartColor.highlight);
    setType(defaultValue.type);
    setColor(defaultValue.color);
  };

  const handleClose = (event: any, reason: any) => {
    if (reason && reason === "backdropClick") return;
  };

  const updateData = () => {
    const isChanged =
      JSON.stringify(chartColor) !== JSON.stringify(getChartColor);
    if (isChanged) {
      window.location.reload();
    }
    localStorage.setItem(LOCAL_STORAGE.CHART_COLOR, JSON.stringify(chartColor));
    setOpen(false);
  };

  const onCompleteChangeColor = (e: any, property: string) => {
    let newColor: any = chartColor;
    switch (property) {
      case "title": {
        newColor = {
          ...chartColor,
          label: { ...chartColor.label, title: e.hex },
        };
        break;
      }
      case "highlight": {
        newColor = { ...chartColor, highlight: e.hex };
        break;
      }
    }
    return setChartColor(newColor);
  };

  useEffect(() => {
    const getTypes = NoteType.map((i) => i.type);
    setTypes(getTypes);
  }, []);

  const handleSelectedChange = (e: SelectChangeEvent) => {
    const type = e.target.value;
    const colorByType = NoteType.find((i) => i.type === type)?.color || "red";
    setType(type);
    setColor(colorByType);
  };

  return (
    <>
      <IconButton aria-label="export" onClick={handleOpen}>
        <SettingsIcon />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Setting modal
            <IconButton
              sx={{ position: "absolute", right: -5, top: -5 }}
              aria-label="export"
              onClick={updateData}
            >
              <CloseIcon />
            </IconButton>
          </Typography>
          <div style={{ margin: "10px 0" }}>
            <div style={lineStyle}>
              Default color: <ColorPicker defaultColor={color} />
              <FormControl
                style={{ width: "125px", marginLeft: "10px", height: "40px" }}
              >
                <InputLabel id="demo-simple-select-label">Type</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={type}
                  label="Type"
                  onChange={handleSelectedChange}
                >
                  {types &&
                    types.map((type, idx) => {
                      return (
                        <MenuItem key={idx} value={type}>
                          {type}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
            </div>
            <div style={lineStyle}>
              Dotted color: <ColorPicker defaultColor={color} />
            </div>
            <div style={lineStyle}>
              Title color:{" "}
              <ColorPicker
                onComplete={(e) => onCompleteChangeColor(e, "title")}
                defaultColor={title}
              />
            </div>
            <div style={lineStyle}>
              Got Skill color: <ColorPicker defaultColor={color} />
            </div>
            <div style={lineStyle}>
              Plan color: <ColorPicker defaultColor={color} />
            </div>
            <div style={lineStyle}>
              Number detail color: <ColorPicker defaultColor={color} />
            </div>
            <div style={lineStyle}>
              Highlight color:{" "}
              <ColorPicker
                onComplete={(e) => onCompleteChangeColor(e, "highlight")}
                defaultColor={highlight}
              />
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
}

export default Setting;
