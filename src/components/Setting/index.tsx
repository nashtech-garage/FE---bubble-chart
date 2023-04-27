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
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CloseIcon from "@mui/icons-material/Close";
import ColorPicker from "../ColorPicker";
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

function Setting({ dataSets, captureChart, updateColor, chartColor }: any) {
  // const getChartColor = JSON.parse(
  //   localStorage.getItem(LOCAL_STORAGE.CHART_COLOR) || ""
  // );
  const [open, setOpen] = useState<boolean>(false);
  // const [chartColor, setChartColor] = useState<any>(getChartColor);
  //Varible of chart color
  const [type, setType] = useState<string>("");
  const [types, setTypes] = useState<any[]>([]);
  const [color, setColor] = useState<string>("");
  const [dotted, setDotted] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [gotSkill, setGotSkill] = useState<string>("");
  const [plan, setPlan] = useState<string>("");
  const [ytd, setYTD] = useState<string>("");
  const [lmOG, setLMOG] = useState<string>("");
  const [lmFN, setLMFN] = useState<string>("");
  const [highlight, setHighlight] = useState<string>("");

  const handleOpen = () => {
    setOpen(true);
    // setTypes(chartColor.types);
    // setType(chartColor.types[0].type);
    setColor(chartColor.types[0].color);
    setDotted(chartColor.dotted);
    setTitle(chartColor.label.title);
    setGotSkill(chartColor.label.gotSkill);
    setPlan(chartColor.label.plan);
    setYTD(chartColor.label.ytd);
    setLMOG(chartColor.label.onGoing);
    setLMFN(chartColor.label.finished);
    setHighlight(chartColor.highlight);
  };

  const handleClose = (event: any, reason: any) => {
    if (reason && reason === "backdropClick") return;
  };

  const updateData = () => {
    localStorage.setItem(LOCAL_STORAGE.CHART_COLOR, JSON.stringify(chartColor));
    updateColor(chartColor);
    setOpen(false);
  };

  const onCompleteChangeColor = (e: any, property: string) => {
    let newColor = {};
    switch (property) {
      case "type": {
        const changeColorTypes = types.map((i) => {
          return {
            type: i.type,
            color: i.type === type ? e.hex : i.color,
          };
        });
        setTypes(changeColorTypes);
        newColor = {
          ...chartColor,
          types: changeColorTypes,
        };
        break;
      }
      case "dotted": {
        newColor = {
          ...chartColor,
          dotted: e.hex,
        };
        break;
      }
      case "title": {
        newColor = {
          ...chartColor,
          label: { ...chartColor.label, title: e.hex },
        };
        break;
      }
      case "gotSkill": {
        newColor = {
          ...chartColor,
          label: { ...chartColor.label, gotSkill: e.hex },
        };
        break;
      }
      case "plan": {
        newColor = {
          ...chartColor,
          label: { ...chartColor.label, plan: e.hex },
        };
        break;
      }
      case "YTD": {
        newColor = {
          ...chartColor,
          label: { ...chartColor.label, ytd: e.hex },
        };
        break;
      }
      case "LMOG": {
        newColor = {
          ...chartColor,
          label: { ...chartColor.label, onGoing: e.hex },
        };
        break;
      }
      case "LMFN": {
        newColor = {
          ...chartColor,
          label: { ...chartColor.label, finished: e.hex },
        };
        break;
      }
      case "highlight": {
        newColor = { ...chartColor, highlight: e.hex };
        break;
      }
    }
    return updateColor(newColor);
  };

  const handleSelectedChange = (e: SelectChangeEvent) => {
    const type = e.target.value;
    const colorByType = types.find((i) => i.type === type)?.color || "red";
    setType(type);
    setColor(colorByType);
  };

  useEffect(() => {
    const filtered = dataSets.sort(
      (a: any, b: any) => b.data.length - a.data.length
    );
    const types = filtered.map((i: any) => ({ type: i.type, color: i.color }));
    setTypes(types);
    setType(types[0].type);
  }, [dataSets]);

  return (
    <>
      <IconButton aria-label="export" onClick={handleOpen}>
        <SettingsIcon />
      </IconButton>
      <IconButton aria-label="capture" onClick={captureChart}>
        <CameraAltIcon />
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
              Default color:{" "}
              <ColorPicker
                onComplete={(e) => onCompleteChangeColor(e, "type")}
                defaultColor={color}
              />
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
                    types.map((item, idx) => {
                      return (
                        <MenuItem key={idx} value={item.type}>
                          {item.type}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
            </div>
            <div style={lineStyle}>
              Dotted color:{" "}
              <ColorPicker
                onComplete={(e) => onCompleteChangeColor(e, "dotted")}
                defaultColor={dotted}
              />
            </div>
            <div style={lineStyle}>
              Title color:{" "}
              <ColorPicker
                onComplete={(e) => onCompleteChangeColor(e, "title")}
                defaultColor={title}
              />
            </div>
            <div style={lineStyle}>
              Got skill color:{" "}
              <ColorPicker
                onComplete={(e) => onCompleteChangeColor(e, "gotSkill")}
                defaultColor={gotSkill}
              />
            </div>
            <div style={lineStyle}>
              Plan color:{" "}
              <ColorPicker
                onComplete={(e) => onCompleteChangeColor(e, "plan")}
                defaultColor={plan}
              />
            </div>
            <div style={lineStyle}>
              Added (YTD) color:{" "}
              <ColorPicker
                onComplete={(e) => onCompleteChangeColor(e, "YTD")}
                defaultColor={ytd}
              />
            </div>
            <div style={lineStyle}>
              Added (LM) On Going color:{" "}
              <ColorPicker
                onComplete={(e) => onCompleteChangeColor(e, "LMOG")}
                defaultColor={lmOG}
              />
            </div>
            <div style={lineStyle}>
              Added (LM) Finished color:{" "}
              <ColorPicker
                onComplete={(e) => onCompleteChangeColor(e, "LMFN")}
                defaultColor={lmFN}
              />
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
