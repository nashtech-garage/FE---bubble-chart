import { ANNOTATIONS } from "../../constants/chartColor";

export const quadrant = {
  position: "absolute",
  width: "100%",
  height: "100%",
};

export const line = {
  position: "absolute",
  width: "100%",
  borderTop: "5px solid",
  top: "50%",
  transform: "translateY(-50%)",
  borderColor: ANNOTATIONS.MAIN_COLOR,
};

export const lineVertical = {
  position: "absolute",
  height: "100%",
  width: "1px",
  left: "50%",
  top: "0",
  borderRight: "5px solid",
  transform: "translateX(-50%)",
  borderColor: ANNOTATIONS.MAIN_COLOR,
};
