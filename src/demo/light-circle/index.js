import { Circle } from "../../geometry";
import { initCanvas, clearCanvas, loop } from "../../_utils";
import getControlPanel from "./getControlPanel";

const ONECYCLE = Math.PI * 2; // 一个周期 360 度 即 2π

function main() {
  const { CNAVAS_SIZE, CANVAS_CENTER, ctx } = initCanvas({
    title: "发光圆环效果",
  });

  const circle = new Circle(CANVAS_CENTER, 100);

  const state = {
    index: 0,
    gco: "lighter",
    props: [
      {
        color: "#ffffff",
        w: 16,
        blur: 12,
        sc: "#00ffd5",
      },
      {
        color: "#ffffff",
        w: 16,
        blur: 12,
        sc: "#00d9ff",
      },
      {
        color: "#ffffff",
        w: 8,
        blur: 40,
        sc: "#0011ff",
      },
      {
        color: "#ffffff",
        w: 8,
        blur: 40,
        sc: "#ff00e1",
      },
    ],
  };

  ctx.strokeStyle = state.props[0].color;
  ctx.lineWidth = state.props[0].w;
  ctx.globalCompositeOperation = state.gco;

  function renderCircle({
    c = state.props[0].color,
    w = state.props[0].w,
    g = state.gco,
    blur = 0,
    sc = "#b1b1b1",
  }) {
    ctx.save();
    ctx.strokeStyle = c;
    ctx.fillStyle = c;
    ctx.lineWidth = w;
    if (g !== state.gco) ctx.globalCompositeOperation = g;
    if (blur > 0) {
      ctx.shadowBlur = blur;
      ctx.shadowColor = sc;
    }
    ctx.beginPath();
    ctx.arc(circle.center.x, circle.center.y, circle.radius, 0, ONECYCLE);
    ctx.fillRect(circle.center.x - w / 2, circle.center.y - w / 2, w, w);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }

  function render() {
    clearCanvas.call(ctx, CNAVAS_SIZE);
    state.props.forEach(renderCircle);
  }

  loop(render);
  // render();

  const ctrlPanel = getControlPanel().setValue({
    ...state.props[state.index],
    index: `${state.index}`,
  });

  ctrlPanel.onChange((name, value) => {
    if (name === "index") {
      state.index = value;
      ctrlPanel.setValue({
        ...state.props[Number(value)],
        index: value,
      });
    } else {
      state.props[state.index][name] = value;
    }
  });
}

export default main;
