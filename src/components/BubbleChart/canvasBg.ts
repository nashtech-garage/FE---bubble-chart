export const canvasBackground = {
    id: "customCanvasBackgroundColor",
    beforeDraw: (chart: any, args: any, options: any) => {
      const { ctx } = chart;
      ctx.save();
      ctx.beginPath();
      ctx.strokeStyle = options.color || "black";
      ctx.lineWidth = 1;
      ctx.lineJoin = "round";
      ctx.moveTo(0, 0);
      ctx.lineTo(0, chart.height);
      ctx.lineTo(chart.width, chart.height);
      ctx.lineTo(chart.width, 0);
      ctx.closePath();
      ctx.stroke();
      ctx.restore();
    },
  }