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
  "&:hover": {
    zIndex: "10",
    "&:before": {
      transform: "translate(-50%, -50%) scale(1.2)",
      zIndex: "10",
    },
  },
};
export const nodeBeforeStyle = {
  content: "''",
  display: "block",
  paddingTop: "50%",
  position: "absolute",
  zIndex: "2",
  width: "50%",
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
};
export const arrowStyle = {
  position: "absolute",
  top: "0",
  left: "0",
  width: "100%",
  height: "3px",
};
