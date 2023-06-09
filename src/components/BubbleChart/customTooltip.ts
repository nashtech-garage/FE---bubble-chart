import eventBus from "../../utilities/event-bus";
import { lighten } from "@mui/material/styles";

export const customTooltip = (fixedRadius: number) => ({
  id: "customTooltip",

  afterDatasetsDraw: function (chart: any) {
    const ctx = chart.ctx;
    const tooltip = chart.tooltip;
    const size = chart.width;
    const allData = chart.data.datasets.flatMap((dataset: any) => dataset.data);
    const maxTarget = Math.max(...allData.map((data: any) => data.target));
    const defaultTarget = Math.round(maxTarget / 2);

    if (tooltip) {
      if (tooltip._active[0]) {
        const element = tooltip._active[0];
        const xPos = element.element.x;
        const yPos = element.element.y;
        const elementDataset = chart.data.datasets[element.datasetIndex];
        const elementData = elementDataset.data[element.index];
        eventBus.dispatch("chart-tooltip", {
          elementData: elementData,
          bgColor: elementDataset.backgroundColor,
        });
        const base = elementData.target / maxTarget;
        const radius = (size / 24) * base;
        const dfRadius = (defaultTarget / maxTarget) * (size / 24);
        const drawRadius =
          elementData.target <= defaultTarget
            ? dfRadius + fixedRadius
            : radius + fixedRadius;

        if (elementData.target > 0) {
          ctx.save();
          ctx.beginPath();
          ctx.arc(xPos, yPos, drawRadius, 0, 2 * Math.PI, false);
          ctx.arc(xPos, yPos, fixedRadius, 0, 2 * Math.PI, true);
          ctx.fillStyle = lighten(elementDataset.backgroundColor, 0.7);
          ctx.fill();
          ctx.strokeStyle = elementDataset.backgroundColor;
          ctx.lineWidth = 3;
          ctx.setLineDash([5, 5]);
          ctx.stroke();
          ctx.closePath();
          ctx.restore();
        }
      }
    }
  },
});
