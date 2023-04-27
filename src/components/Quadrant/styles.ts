import { ANNOTATIONS } from "../../constants/chartColor";

export const quadrant = {
  position: "absolute",
  width: "100%",
  height: "100%",
  "&:before": {
    content: "''",
    position: "absolute",
    borderTop: "5px solid",
    top: "50%",
    transform: "translateY(-50%)",
    borderColor: ANNOTATIONS.MAIN_COLOR,
    left: "2%",
    right: "2%"
  },
  "&:after": {
    content: "''",
    position: "absolute",
    left: "50%",
    top: "2%",
    bottom: "2%",
    borderRight: "5px solid",
    transform: "translateX(-50%)",
    borderColor: ANNOTATIONS.MAIN_COLOR,
  }
};
