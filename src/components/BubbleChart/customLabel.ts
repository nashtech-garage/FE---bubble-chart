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
          const xPos = element.x;
          const yPos = element.y;
          const startPosition = {
            x: xPos - fixedRadius + 10,
            y: yPos - fixedRadius / 2 + 5,
          };
          ctx.font = "10px Arial";
          ctx.fillStyle = "black";
          ctx.fillText(`${data.label}`, startPosition.x, startPosition.y);
          ctx.fillText(
            `${data.gotSkill}`,
            startPosition.x,
            startPosition.y + 20
          );
          ctx.fillStyle = "#80aaff";
          ctx.fillText(
            `${data.YTD}`,
            startPosition.x + 15,
            startPosition.y + 20
          );
          if (data.addedType === "Ongoing") {
            ctx.fillStyle = "orange";
          } else {
            ctx.fillStyle = "#3333ff";
          }
          ctx.fillText(
            `+${data.LM}`,
            startPosition.x + 30,
            startPosition.y + 20
          );
          ctx.fillStyle = "#00cc00";
          ctx.fillText(
            `/${data.target}`,
            startPosition.x + 50,
            startPosition.y + 20
          );
        });
        ctx.restore();
      }
    });
  },
});
