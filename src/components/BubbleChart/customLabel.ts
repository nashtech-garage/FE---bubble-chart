import { wrapText } from "../../utilities";
import { COLOR_CHART_ANNOTATIONS } from "../../constants";

export const customLabel = (fixedRadius: number) => ({
  id: "customLabel",
  afterDatasetsDraw: function (chart: any) {
    const ctx = chart.ctx;

    chart.data.datasets.forEach((dataset: any, datasetIndex: any) => {
      const meta = chart.getDatasetMeta(datasetIndex);

      if (chart.isDatasetVisible(datasetIndex)) {
        ctx.save();
        meta.data.forEach((element: any, index: any) => {
          const data = dataset.data[index];
          const colorArray = [
            COLOR_CHART_ANNOTATIONS.GOTSKILL,
            COLOR_CHART_ANNOTATIONS.YTD,
            data.addedType === "Ongoing"
              ? COLOR_CHART_ANNOTATIONS.ONGOING
              : COLOR_CHART_ANNOTATIONS.FINISHED,
            COLOR_CHART_ANNOTATIONS.PLAN,
          ];
          const xPos = element.x;
          const yPos = element.y;
          const startPosition = {
            x: xPos - fixedRadius + 10,
            y: yPos - fixedRadius / 2 + 5,
          };
          ctx.font = "9px Arial";
          ctx.fillStyle = "black";
          ctx.textAlign = "center";
          wrapText(ctx, data.label, xPos, startPosition.y, fixedRadius * 2, 9);
          console.log("ctx", ctx);
          if (
            data.gotSkill !== 0 ||
            data.YTD !== 0 ||
            data.LM !== 0 ||
            data.target !== 0
          ) {
            const detailString = `${data.gotSkill} ${data.YTD} +${data.LM} /${data.target}`;
            const parts = detailString.split(" ");
            let x = startPosition.x;
            let y = startPosition.y + 20;

            for (let i = 0; i < parts.length; i++) {
              ctx.textAlign = "left";
              ctx.fillStyle = colorArray[i];
              ctx.fillText(parts[i], x, y);
              x += ctx.measureText(parts[i]).width + 2;
            }
          }
        });
        ctx.restore();
      }
    });
  },
});
