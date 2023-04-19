export const annotations = (isDarkMode: boolean) => ({
  annotations: {
    line1: {
      type: "line",
      xMin: 1,
      xMax: 100,
      yMin: 50,
      yMax: 50,
      borderColor: "#4f7ac7",
      borderWidth: 2,
      drawTime: "beforeDraw",
      label: {
        color: isDarkMode ? "white" : "black",
        backgroundColor: "transparent",
        content: "Core Skills",
        display: true,
        position: "start",
        padding: {
          left: 10,
          top: 25,
        },
        font: {
          size: 18,
          weight: "normal",
        },
      },
    },
    line2: {
      type: "line",
      yMin: 1,
      yMax: 100,
      xMin: 50,
      xMax: 50,
      borderColor: "#4f7ac7",
      borderWidth: 2,
      drawTime: "beforeDraw",
    },
    label1: {
      color: isDarkMode ? "white" : "black",
      type: "label",
      xMin: 95,
      xMax: 95,
      backgroundColor: "transparent",
      drawTime: "beforeDraw",
      content: "Specialist",
      font: {
        size: 18,
        weight: "normal",
      },
      padding: {
        top: 25,
      },
    },
    line3: {
      type: "line",
      xMin: 1,
      xMax: 1,
      yMin: 1,
      yMax: 100,
      borderColor: "#4f7ac7",
      borderWidth: 3,
      drawTime: "beforeDraw",
      arrowHeads: {
        end: {
          backgroundColor: "#4f7ac7",
          display: true,
        },
      },
      label: {
        color: isDarkMode ? "white" : "black",
        backgroundColor: "transparent",
        rotation: 270,
        content: "Opportunity",
        display: true,
        position: "end",
        padding: {
          top: 20,
        },
        font: {
          size: 18,
          weight: "normal",
        },
      },
    },
    line4: {
      type: "line",
      xMin: 1,
      xMax: 85,
      yMin: 1,
      yMax: 1,
      borderColor: "#4f7ac7",
      borderWidth: 3,
      drawTime: "beforeDraw",
      arrowHeads: {
        end: {
          backgroundColor: "#4f7ac7",
          display: true,
        },
      },
      label: {
        color: isDarkMode ? "white" : "black",
        backgroundColor: "transparent",
        content: "Innovation",
        display: true,
        position: "end",
        padding: {
          top: 20,
          right: 80,
        },
        font: {
          size: 18,
          weight: "normal",
        },
      },
    },
  },
})