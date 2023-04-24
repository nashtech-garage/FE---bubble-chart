export const extraCircle = (fixedRadius: number) => ({
  id: "drawExtraCircle",
  beforeDatasetsDraw: function (chart: any, easing: any) {
    const ctx = chart.ctx;
    const allData = chart.data.datasets.flatMap((dataset: any) => dataset.data);
    const maxTarget = Math.max(...allData.map((data: any) => data.target));
    const defaultTarget = Math.round(maxTarget / 2);
    const size = chart.width;

    chart.data.datasets.forEach((dataset: any, datasetIndex: any) => {
      const meta = chart.getDatasetMeta(datasetIndex);
      ctx.save();
      if (chart.isDatasetVisible(datasetIndex)) {
        meta.data.forEach((element: any, index: any) => {
          const data = dataset.data[index];
          const xPos = element.x;
          const yPos = element.y;
          const base = data.target / maxTarget;
          const radius = (size / 24) * base;
          const dfRadius = (defaultTarget / maxTarget) * (size / 24);
          const drawRadius =
            data.target <= defaultTarget
              ? dfRadius + fixedRadius
              : radius + fixedRadius;

          if (data.target > 0) {
            ctx.save();
            ctx.beginPath();
            ctx.arc(xPos, yPos, drawRadius, 0, 2 * Math.PI, false);
            ctx.strokeStyle = data.highlighted ? "#ff1744" : "#385994";
            ctx.lineWidth = 1;
            ctx.setLineDash([3, 3]);
            ctx.stroke();
            ctx.restore();
          }
        });
        ctx.restore();
      }
    });
  },
});
