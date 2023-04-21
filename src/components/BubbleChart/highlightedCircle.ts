import { lighten } from "@mui/material/styles";

export const highlightedCircle = (fixedRadius: number) => ({
  id: "highlightedCircle",
  afterDatasetsDraw: function (chart: any, easing: any) {
    const ctx = chart.ctx;

    chart.data.datasets.forEach((dataset: any, datasetIndex: any) => {
      const meta = chart.getDatasetMeta(datasetIndex);
      ctx.save();
      if (chart.isDatasetVisible(datasetIndex)) {
        meta.data.forEach((element: any, index: any) => {
          const data = dataset.data[index];
          const xPos = element.x;
          const yPos = element.y;

          if (data.highlighted) {
            ctx.save();
            ctx.beginPath();
            ctx.arc(xPos, yPos, fixedRadius, 0, 2 * Math.PI, false);
            ctx.lineWidth = 2;
            ctx.strokeStyle = lighten("#ff1744", 0.5);
            ctx.stroke();
            ctx.restore();
          }
        });
        ctx.restore();
      }
    });
  },
});
