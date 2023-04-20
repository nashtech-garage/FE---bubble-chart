export const extraCircle = (fixedRadius: number) => ({
  id: "drawExtraCircle",
  afterDatasetsDraw: function (chart: any, easing: any) {
    const ctx = chart.ctx;
    const allData = chart.data.datasets.flatMap((dataset: any) => dataset.data);
    const maxTarget = Math.max(...allData.map((data: any) => data.target));
    const defaultTarget = Math.round(maxTarget / 2);
    const size = chart.width;

    chart.data.datasets.forEach((dataset: any, datasetIndex: any) => {
      const meta = chart.getDatasetMeta(datasetIndex);

      if (chart.isDatasetVisible(datasetIndex)) {
        ctx.save();
        meta.data.forEach((element: any, index: any) => {
          const data = dataset.data[index];
          const xPos = element.x;
          const yPos = element.y;
          const base = data.target / maxTarget;
          const radius = (size / 24) * base;
          const dfRadius = (defaultTarget / maxTarget) * (size / 24);
          const drawCircle =
            data.target <= defaultTarget
              ? dfRadius + fixedRadius
              : radius + fixedRadius;

          if (data.target > 0) {
            ctx.beginPath();
            ctx.arc(xPos, yPos, drawCircle, 0, 2 * Math.PI, false);
            ctx.strokeStyle = "#385994";
            ctx.lineWidth = 2;
            ctx.setLineDash([5, 5]); // Set the line dash style
            ctx.stroke();
          }
        });
        ctx.restore();
      }
    });
  },
});
