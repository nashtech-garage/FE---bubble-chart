import { ANNOTATIONS } from "../../constants/chartColor";

export const nodeStyle = {
  textAlign: "center",
  borderRadius: "50%",
  position: "absolute",
  // maxWidth: "30%",
  border: "1px dashed",
  zIndex: "1",
  left: "0",
  bottom: "0",
  transform: "translate(-50%, 50%)",
  "&:after": {
    content: "''",
    display: "block",
    paddingTop: "100%",
  },
};
export const nodeBeforeStyle = {
  content: "''",
  display: "block",
  position: "absolute",
  zIndex: "2",
  // width: "50%",
  background: " #bebebe",
  borderRadius: "50%",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
  transition: "all .3s ease-in",
};
export const nodeLabel = {
  position: "absolute",
  zIndex: "11",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
  fontSize: "0.7rem",
  lineHigh: "1",
  maxWidth: "30%",
  span: {},
  pointerEvents: "none",
};
export const arrowStyle = {
  position: "absolute",
  top: "50%",
  left: "auto",
  right: "0",
  borderTop: `1px solid ${ANNOTATIONS.MAIN_COLOR}`,
  "& svg": {
    color: ANNOTATIONS.MAIN_COLOR,
    position: "absolute",
    top: "-50%",
    marginLeft: "2px",
  },
};
