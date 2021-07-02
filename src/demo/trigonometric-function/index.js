import TWEEN from "@tweenjs/tween.js";
import coorSystem from "./coorSystem";
import getControlPanel from "./getControlPanel";
import { initCanvas, createOffScreenCanvas, clearCanvas, trig, loop } from "../../_utils";

function to(number, s) {
  return number * s;
}

function main() {
  const { CNAVAS_SIZE, CANVAS_CENTER, ctx } = initCanvas({ title: "三角函数曲线" });

  const ONECYCLE = Math.PI * 2;
  const count = ONECYCLE / 100; // x 增量

  let state = {
    method: "sin",
    a: 4,
    w: 1,
    d: 0,
    k: 0,
    zoom_x: 16,
    zoom_y: 16,
    x0: -2,
    x1: 2,
    line_width: 2,
    line_color: "#2196f3",
  };

  ctx.strokeStyle = state.line_color;
  ctx.lineWidth = state.line_width;
  ctx.lineJoin = "round";

  // 创建坐标系
  const CoorSystemCanvas = createOffScreenCanvas(CNAVAS_SIZE);

  function renderCoorSystem() {
    CoorSystemCanvas.render(coorSystem, {
      origin: CANVAS_CENTER,
      xLength: CNAVAS_SIZE.width - 100,
      yLength: CNAVAS_SIZE.height - 100,
      zoom_x: state.zoom_x,
      zoom_y: state.zoom_y,
    });
    ctx.drawImage(CoorSystemCanvas, 0, 0);
  }

  function renderFunc() {
    ctx.translate(CANVAS_CENTER.x, CANVAS_CENTER.y);
    ctx.save();
    ctx.beginPath();
    for (let i = state.x0 * Math.PI; i <= state.x1 * Math.PI; i += count) {
      let x = i;
      let y = trig[state.method](
        x,
        { A: state.a, W: state.w, D: state.d * Math.PI, K: state.k },
        2
      );
      ctx[i === state.x0 * Math.PI ? "moveTo" : "lineTo"](to(x, state.zoom_x), to(y, state.zoom_y));
    }
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
    ctx.translate(-CANVAS_CENTER.x, -CANVAS_CENTER.y);
  }

  function render(tick) {
    clearCanvas.call(ctx, CNAVAS_SIZE);
    renderCoorSystem();
    renderFunc();

    TWEEN.update(tick);
  }

  loop(render);

  getControlPanel()
    .setValue(state)
    .onChange((name, value) => {
      if (name === "line_color") {
        state.line_color = value;
        ctx.strokeStyle = state.line_color;
      } else if (name === "method") {
        state[name] = value;
        state.x1 = state.x0;
        new TWEEN.Tween(state).easing(TWEEN.Easing.Quadratic.InOut).to({ x1: 2 }, 1500).start();
      } else {
        let tween = new TWEEN.Tween(state)
          .easing(TWEEN.Easing.Quadratic.InOut)
          .to({ [name]: +value }, 1500)
          .start();
        if (name === "line_width") tween.onUpdate(() => (ctx.lineWidth = state.line_width));
      }
    });
}

export default main;
