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

          const arrowLength = 5;
          const arrowWidth = 3;
          const angle = Math.atan2(0, drawRadius - fixedRadius);

          //end arrow
          const endArrowUpperX =
            xPos +
            drawRadius -
            arrowLength * Math.cos(angle) -
            arrowWidth * Math.cos(angle - Math.PI / 2);
          const endArrowUpperY =
            yPos -
            arrowLength * Math.sin(angle) -
            arrowWidth * Math.sin(angle - Math.PI / 2);
          const endArrowBelowX =
            xPos +
            drawRadius -
            arrowLength * Math.cos(angle) +
            arrowWidth * Math.cos(angle - Math.PI / 2);
          const endArrowBelowY =
            yPos -
            arrowLength * Math.sin(angle) +
            arrowWidth * Math.sin(angle - Math.PI / 2);

          //start arrow
          const startArrowUpperX =
            xPos +
            fixedRadius +
            arrowLength * Math.cos(angle) -
            arrowWidth * Math.cos(angle - Math.PI / 2);
          const startArrowUpperY =
            yPos +
            arrowLength * Math.sin(angle) -
            arrowWidth * Math.sin(angle - Math.PI / 2);
          const startArrowBelowX =
            xPos +
            fixedRadius +
            arrowLength * Math.cos(angle) +
            arrowWidth * Math.cos(angle - Math.PI / 2);
          const startArrowBelowY =
            yPos +
            arrowLength * Math.sin(angle) +
            arrowWidth * Math.sin(angle - Math.PI / 2);

          if (data.target > 0) {
            ctx.save();
            ctx.beginPath();
            ctx.arc(xPos, yPos, drawRadius, 0, 2 * Math.PI, false);
            ctx.strokeStyle = "#385994";
            ctx.lineWidth = 2;
            ctx.setLineDash([5, 5]); // Set the line dash style
            ctx.stroke();
            ctx.restore();

            ctx.beginPath();
            ctx.strokeStyle = "#385994";
            ctx.lineWidth = 2;
            ctx.moveTo(xPos + fixedRadius, yPos);
            ctx.lineTo(xPos + drawRadius, yPos);

            ctx.moveTo(endArrowUpperX, endArrowUpperY);
            ctx.lineTo(xPos + drawRadius, yPos);
            ctx.lineTo(endArrowBelowX, endArrowBelowY);

            ctx.moveTo(startArrowUpperX, startArrowUpperY);
            ctx.lineTo(xPos + fixedRadius, yPos);
            ctx.lineTo(startArrowBelowX, startArrowBelowY);

            ctx.font = "10px Arial";
            ctx.fillStyle = "black";
            ctx.fillText(`+${data.target}`, xPos + fixedRadius, yPos + 10);
            ctx.stroke();
          }
        });
        ctx.restore();
      }
    });
  },
});
