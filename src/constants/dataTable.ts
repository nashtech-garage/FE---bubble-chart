import { blue } from "@mui/material/colors";

export const HEADERNAME = {
  TYPE: "Type",
  NAME: "Name",
  GOTS_KILL: "Got Skill",
  NEW_ADDED: "Added (YTD)",
  NEW_ADDED_LM: "Added (LM)",
  PLAN: "Plan",
  POSITION_X: "Innovation",
  POSITION_Y: "Opportunity",
  ACTIONS: "Action",
  ADDED_TYPE: "Added Type",
  HIGHLIGHT: "Highlighted",
};

export const NEW_ITEM = {
  name: "",
  gotSkill: 0,
  YTD: 0,
  LM: 0,
  target: 0,
  x: 0,
  y: 0,
  type: "",
  addedType: "",
  priority: 0,
};

export const ROW_COLOR = {
  HIGHLIGHT: blue[300],
};

export const DEFAULT_TOOLTIP = {
  elmenentData: {
    name: "SKill name",
    gotSkill: 0,
    target: 0,
    YTD: 0,
    LM: 0,
  },
  bgColor: "pink",
};
