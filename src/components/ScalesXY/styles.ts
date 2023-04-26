import { ANNOTATIONS } from "../../constants/chartColor";

export const line = {
  position: "absolute",
  width: "50%",
  left: "30%",
  borderTop: `5px solid ${ANNOTATIONS.MAIN_COLOR}`,
  bottom: "0",
  "&:before": {
    fontSize: "20px",
    fontWeight: "bold",
    position: "absolute",
    content: "'Innovation'",
    right: "10%",
    bottom: "0",
  },
};

export const lineVertical = {
  position: "absolute",
  width: "0",
  bottom: "25%",
  left: "0",
  top: "0",
  borderRight: `5px solid ${ANNOTATIONS.MAIN_COLOR}`,
  "&:before": {
    fontSize: "20px",
    fontWeight: "bold",
    position: "absolute",
    content: "'Opportunity'",
    right: "-41px",
    top: "35%",
    transform: "rotate(270deg)",
  },
};

export const arrowStyle = {
  position: "absolute",
  fontSize: "60px",
  color: ANNOTATIONS.MAIN_COLOR,
};
