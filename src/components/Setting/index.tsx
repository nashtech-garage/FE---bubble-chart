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
  Divider,
  Grid,
  Paper,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CloseIcon from "@mui/icons-material/Close";
import ColorPicker from "../ColorPicker";
import { LOCAL_STORAGE } from "../../constants";
import { colorPickerStyled, lineStyle, style } from "./styles";

function Setting({ dataSets, captureChart, updateColor, chartColor }: any) {
  const [open, setOpen] = useState<boolean>(false);
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

  const updateDataSetColor = (type: string) =>
    chartColor.types.find((i: any) => i.type === type);

  useEffect(() => {
    const filtered = dataSets.filter((i: any) => i.data.length);
    const types = filtered.map((i: any) => ({
      type: i.type,
      color: updateDataSetColor(i.type).color,
    }));
    setTypes(types);
    setType(types[0].type);
    setColor(types[0].color);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          <Typography id="modal-modal-title" variant="h5" component="h2">
            Setting modal
            <IconButton
              sx={{ position: "absolute", right: -5, top: -5 }}
              aria-label="export"
              onClick={updateData}
            >
              <CloseIcon />
            </IconButton>
          </Typography>
          <Box my={2}>
            <Box sx={lineStyle}>
              <FormControl style={{ width: "100%" }}>
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
              <ColorPicker
                onComplete={(e) => onCompleteChangeColor(e, "type")}
                defaultColor={color}
              />
            </Box>
            <Divider />
            <Grid
              container
              spacing={1}
              direction="row"
              justifyContent="space-between"
            >
              <Grid item xs={9}>
                <Grid
                  container
                  direction="row"
                  rowSpacing={0}
                  columnSpacing={{ xs: 1 }}
                >
                  <Grid item xs={12}>
                    <Typography variant="h6" component="h3" my={2}>
                      Label Color
                    </Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Paper variant="outlined" sx={{ padding: "8px" }}>
                      <Box sx={lineStyle}>
                        Title:{" "}
                        <ColorPicker
                          style={colorPickerStyled}
                          onComplete={(e) => onCompleteChangeColor(e, "title")}
                          defaultColor={title}
                        />
                      </Box>
                      <Box style={lineStyle}>
                        Got skill:{" "}
                        <ColorPicker
                          style={colorPickerStyled}
                          onComplete={(e) =>
                            onCompleteChangeColor(e, "gotSkill")
                          }
                          defaultColor={gotSkill}
                        />
                      </Box>
                      <Box style={lineStyle}>
                        Plan:{" "}
                        <ColorPicker
                          style={colorPickerStyled}
                          onComplete={(e) => onCompleteChangeColor(e, "plan")}
                          defaultColor={plan}
                        />
                      </Box>
                    </Paper>
                  </Grid>
                  <Grid item xs={7}>
                    <Paper variant="outlined" sx={{ padding: "8px" }}>
                      <Box style={lineStyle}>
                        Added (YTD):{" "}
                        <ColorPicker
                          style={colorPickerStyled}
                          onComplete={(e) => onCompleteChangeColor(e, "YTD")}
                          defaultColor={ytd}
                        />
                      </Box>
                      <Box style={lineStyle}>
                        Added (LM) On Going:{" "}
                        <ColorPicker
                          style={colorPickerStyled}
                          onComplete={(e) => onCompleteChangeColor(e, "LMOG")}
                          defaultColor={lmOG}
                        />
                      </Box>
                      <Box style={lineStyle}>
                        Added (LM) Finished:{" "}
                        <ColorPicker
                          style={colorPickerStyled}
                          onComplete={(e) => onCompleteChangeColor(e, "LMFN")}
                          defaultColor={lmFN}
                        />
                      </Box>
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={3}>
                <Typography variant="h6" component="h3" my={2}>
                  Dotted Color
                </Typography>
                <Paper variant="outlined" sx={{ padding: "8px" }}>
                  <Box style={lineStyle}>
                    Default:{" "}
                    <ColorPicker
                      style={colorPickerStyled}
                      onComplete={(e) => onCompleteChangeColor(e, "dotted")}
                      defaultColor={dotted}
                    />
                  </Box>
                  <Box style={lineStyle}>
                    Highlight:{" "}
                    <ColorPicker
                      style={colorPickerStyled}
                      onComplete={(e) => onCompleteChangeColor(e, "highlight")}
                      defaultColor={highlight}
                    />
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default Setting;
