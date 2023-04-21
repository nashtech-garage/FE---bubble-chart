import { ANNOTATIONS } from "../../constants/chartColor";

export const annotations = (isDarkMode: boolean) => ({
  annotations: {
    line1: {
      type: "line",
      xMin: 1,
      xMax: 100,
      yMin: 50,
      yMax: 50,
      borderColor: ANNOTATIONS.MAIN_COLOR,
      borderWidth: 2,
      drawTime: "beforeDraw",
      label: {
        color: isDarkMode
          ? ANNOTATIONS.TEXT_COLOR_DARK
          : ANNOTATIONS.TEXT_COLOR_LIGHT,
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
      borderColor: ANNOTATIONS.MAIN_COLOR,
      borderWidth: 2,
      drawTime: "beforeDraw",
    },
    label1: {
      color: isDarkMode
        ? ANNOTATIONS.TEXT_COLOR_DARK
        : ANNOTATIONS.TEXT_COLOR_LIGHT,
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
      borderColor: ANNOTATIONS.MAIN_COLOR,
      borderWidth: 3,
      drawTime: "beforeDraw",
      arrowHeads: {
        end: {
          backgroundColor: ANNOTATIONS.MAIN_COLOR,
          display: true,
        },
      },
      label: {
        color: isDarkMode
          ? ANNOTATIONS.TEXT_COLOR_DARK
          : ANNOTATIONS.TEXT_COLOR_LIGHT,
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
      borderColor: ANNOTATIONS.MAIN_COLOR,
      borderWidth: 3,
      drawTime: "beforeDraw",
      arrowHeads: {
        end: {
          backgroundColor: ANNOTATIONS.MAIN_COLOR,
          display: true,
        },
      },
      label: {
        color: isDarkMode
          ? ANNOTATIONS.TEXT_COLOR_DARK
          : ANNOTATIONS.TEXT_COLOR_LIGHT,
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
});
