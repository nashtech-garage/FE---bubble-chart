import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bubble } from "react-chartjs-2";
import { useMemo, useState } from "react";
import { useColorScheme } from "@mui/material/styles";
import { Box } from "@mui/system";
import { customTooltip } from "./customTooltip";
import { customLabel } from "./customLabel";
import { extraCircle } from "./extraCircle";

import annotationPlugin from "chartjs-plugin-annotation";
import { annotations } from "./annotation";
import { canvasBackground } from "./canvasBg";

const handleDataSet = (data: any) => {
  const mapped = data.map((item: any) => {
    const { type, color } = item;
    const data: any = item.data.map((i: any) => {
      const { x, y, gotSkill, YTD, LM, target, addedType }: any = i;
      return {
        x,
        y,
        gotSkill,
        YTD,
        LM,
        target,
        addedType,
        label: i.name,
      };
    });
    return data.length
      ? {
          label: type,
          data,
          backgroundColor: color,
          datalabels: {
            font: {
              size: 8,
            },
          },
        }
      : undefined;
  });
  return mapped.filter((i: any) => i !== undefined);
};

function BubbleChart({ propsData }: any) {
  const { mode } = useColorScheme();
  const [fixedRadius] = useState(40);
  const isDarkMode = mode === "dark";

  const scalesOption = {
    display: false,
    grid: {
      display: false,
    },
    beginAtZero: true,
  };

  const elements = {
    point: {
      radius: function () {
        return fixedRadius;
      },
      hoverRadius: function () {
        return 0;
      },
      borderWidth: 1,
    },
  };

  const plugins = {
    legend: {
      position: "bottom",
    },
    customCanvasBackgroundColor: {
      color: "grey",
    },
    annotation: annotations(isDarkMode),
    tooltip: {
      enabled: false,
    },
  };

  const scales = {
    y: scalesOption,
    x: scalesOption,
  };

  const datasets: any[] = useMemo(() => handleDataSet(propsData), [propsData]);

  ChartJS.register(
    canvasBackground,
    extraCircle(fixedRadius),
    customTooltip(fixedRadius),
    customLabel(fixedRadius),
    annotationPlugin,
    LinearScale,
    PointElement,
    Tooltip,
    Legend
  );

  const options: any = {
    elements,
    plugins,
    scales,
  };

  const data = {
    datasets,
  };

  return (
    <Box>
      <Bubble options={options} data={data} />
    </Box>
  );
}

export default BubbleChart;
