import TWEEN from "@tweenjs/tween.js";
import coorSystem from "./coorSystem";
import getControlPanel from "./getControlPanel";
import {
  changeTitle,
  initCanvas,
  createOffScreenCanvas,
  clearCanvas,
  trig,
  Size,
  Point,
  loop,
} from "../../_utils";

function to(number, s) {
  return number * s;
}

function main() {
  changeTitle("三角函数曲线");
  const { CNAVAS_SIZE, CANVAS_CENTER, ctx } = initCanvas();

  const canvasSize = Size(CNAVAS_SIZE);

  const ONECYCLE = Math.PI * 2;
  const count = ONECYCLE / 100; // x 增量

  let data = {
    method: "sin",
    a: 4,
    w: 1,
    d: 0,
    k: 0,
    zoom_x: 16,
    zoom_y: 16,
    x0: -2,
    x1: 2,
  };

  // 创建坐标系
  const CoorSystemCanvas = createOffScreenCanvas(canvasSize);
  const origin = Point(CANVAS_CENTER, CANVAS_CENTER);

  function renderCoorSystem() {
    CoorSystemCanvas.render(coorSystem, {
      point: origin,
      xLength: CNAVAS_SIZE - 100,
      yLength: CNAVAS_SIZE - 100,
      zoom_x: data.zoom_x,
      zoom_y: data.zoom_y,
    });
    ctx.drawImage(CoorSystemCanvas, 0, 0);
  }

  function renderFunc() {
    ctx.translate(CANVAS_CENTER, CANVAS_CENTER);
    ctx.save();
    ctx.strokeStyle = "#f00";
    ctx.lineWidth = 4;
    ctx.beginPath();
    for (let i = data.x0 * Math.PI; i <= data.x1 * Math.PI; i += count) {
      let x = i;
      let y = trig[data.method]({ A: data.a, W: data.w, X: x, D: data.d * Math.PI, K: data.k }, 2);
      ctx[i === data.x0 * Math.PI ? "moveTo" : "lineTo"](to(x, data.zoom_x), to(y, data.zoom_y));
    }
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
    ctx.translate(-CANVAS_CENTER, -CANVAS_CENTER);
  }

  function render(tick) {
    clearCanvas.call(ctx, canvasSize);
    renderCoorSystem();
    renderFunc();

    TWEEN.update(tick);
  }

  loop(render);

  getControlPanel()
    .setValue(data)
    .onChange((name, value) => {
      if (name === "method") {
        data[name] = value;
        data.x1 = data.x0;
        new TWEEN.Tween(data).easing(TWEEN.Easing.Quadratic.InOut).to({ x1: 2 }, 1500).start();
      } else {
        new TWEEN.Tween(data)
          .easing(TWEEN.Easing.Quadratic.InOut)
          .to({ [name]: +value }, 1500)
          .start();
      }
    });
}

export default main;
