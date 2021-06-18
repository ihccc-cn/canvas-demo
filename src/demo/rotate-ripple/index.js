import { initCanvas, clearCanvas, trig, loop, Point, m } from "../../_utils";

const ONECYCLE = 2 * Math.PI;

function main() {
  const { CNAVAS_SIZE, CANVAS_CENTER, ctx } = initCanvas({
    title: "圆环粒子效果",
  });

  const state = {
    radius: 100,
  };

  const gy = () => {
    // ctx.strokeStyle = "#fdfbfe";
    ctx.shadowBlur = 20;
    ctx.shadowColor = "#fdfbfe";
    ctx.beginPath();
    ctx.arc(CANVAS_CENTER.x, CANVAS_CENTER.y, state.radius, 0, ONECYCLE);
    ctx.closePath();
    ctx.stroke();
  };

  const renderCircle = function (color, lineWidth = 2) {
    ctx.save();
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    ctx.globalCompositeOperation = "lighter";
    ctx.strokeStyle = color;
    ctx.arc(CANVAS_CENTER.x, CANVAS_CENTER.y, state.radius, 0, ONECYCLE);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  };

  const renderRipple = function () {
    for (let i = 0; i < 10; i++) {}
  };

  const render = function () {
    clearCanvas.call(ctx, CNAVAS_SIZE);
    gy();
    renderCircle("#c150d2");
    renderCircle("#73f9fd");
    renderCircle("rgba(255, 255, 255, 0.5)", 3);
    renderCircle("rgba(255, 255, 255, 0.5)", 3);
  };
  render();
  setInterval(render, 1000);

  // loop(render);
}

export default main;
