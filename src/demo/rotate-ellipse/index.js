import { Rect, Point, Ellipse } from "../../geometry";
import { initCanvas, clearCanvas, loop, m } from "../../_utils";
// import getControlPanel from "./getControlPanel";

const ONECYCLE = Math.PI * 2; // 一个周期 360 度 即 2π

function renderEllipse(e) {
  let r = e.xr > e.yr ? e.xr : e.yr;
  let ratioX = e.xr / r;
  let ratioY = e.yr / r;
  this.save();
  this.scale(ratioX, ratioY);
  this.beginPath();
  this.moveTo((e.center.x + e.xr) / ratioX, e.center.y / ratioY);
  this.arc(e.center.x / ratioX, e.center.y / ratioY, r, 0, ONECYCLE);
  this.closePath();
  this.stroke();
  this.restore();
}

function main() {
  const { CNAVAS_SIZE, CANVAS_CENTER, ctx } = initCanvas({
    title: "旋转椭圆曲线",
  });

  const state = {
    // gco: "lighter",
    props: [],
  };

  function createOneEllipse({ offsetY = 0, scale = 1, dash = false, ...rest }) {
    return {
      ellipse: new Ellipse(
        new Point(CANVAS_CENTER.x, CANVAS_CENTER.y + 160 + offsetY),
        200 * scale,
        40 * scale
      ),
      dash: dash ? dash.map((i) => i * scale) : dash,
      rotate: dash ? (m.random(0, 2) ? -1 : 1) : 0,
      ...rest,
    };
  }

  ctx.globalCompositeOperation = "lighter";

  let offset = 0;
  let step = 1;

  function renderAnim({
    ellipse,
    c = "#ff3fff",
    w = 8,
    dash = false,
    rotate = 0,
    blur = 0,
    sc = "#fff",
  }) {
    if (!ellipse) return;
    ctx.save();
    ctx.strokeStyle = c;
    ctx.lineWidth = w;
    if (dash) ctx.setLineDash(dash);
    if (rotate === 1) {
      ctx.lineDashOffset = offset;
    } else if (rotate === -1) {
      ctx.lineDashOffset = -offset;
    }
    if (blur) {
      ctx.shadowBlur = blur;
      ctx.shadowColor = sc;
    }
    renderEllipse.call(ctx, ellipse);
    ctx.restore();
  }

  state.props = [
    // 一层
    createOneEllipse({ scale: 0.5, c: "#0b27ff73" }),
    createOneEllipse({ scale: 0.55, c: "#0b27ff73" }),
    createOneEllipse({ w: 20, scale: 0.6, dash: [4, 6], c: "#0b27ff99" }),
    createOneEllipse({ w: 20, scale: 0.7, dash: [4, 6], c: "#0b27ff99" }),
    createOneEllipse({ w: 20, scale: 0.9, dash: [4, 6], c: "#0b27ffd6", blur: 10 }),
    createOneEllipse({ w: 20, scale: 0.9, dash: [4, 6], c: "#0b27ffd6", blur: 10 }),
    createOneEllipse({ w: 2, c: "#0b27ffd6" }),
    // 二层
    createOneEllipse({ w: 2, offsetY: -12, scale: 0.5, c: "#0b27ff73" }),
    createOneEllipse({ w: 2, offsetY: -12, scale: 0.51, c: "#0b27ff73" }),
    createOneEllipse({ w: 2, offsetY: -12, scale: 0.52, c: "#0b27ff73" }),
    createOneEllipse({ offsetY: -12, scale: 0.65, dash: [8, 8], c: "#0b27ff99" }),
    createOneEllipse({ offsetY: -12, scale: 0.8, dash: [280, 180], c: "#0b27ff99" }),
    createOneEllipse({ offsetY: -12, scale: 1.2, dash: [280, 180], c: "#444", blur: 10 }),
    createOneEllipse({ offsetY: -12, scale: 1.2, dash: [280, 180], c: "#0b27ffd6", blur: 10 }),
    createOneEllipse({ offsetY: -12, scale: 1.2, dash: [280, 180], c: "#0b27ffd6", blur: 10 }),
    // 三层
    createOneEllipse({ offsetY: -48, scale: 0.5, dash: [280, 180], c: "#0b27ff73" }),
    createOneEllipse({ offsetY: -48, scale: 0.54, dash: [280, 180], c: "#0b27ff73" }),
    createOneEllipse({ offsetY: -48, scale: 0.8, dash: [280, 180], c: "#0b27ff99" }),
    // 四层
    createOneEllipse({ offsetY: -60, scale: 0.5, c: "#0b27ff73" }),
    createOneEllipse({ w: 2, offsetY: -60, scale: 0.55, c: "#0b27ff73" }),
    createOneEllipse({ w: 2, offsetY: -60, scale: 0.56, c: "#0b27ff99" }),
    createOneEllipse({ w: 4, offsetY: -60, scale: 0.6, dash: [280, 180], c: "#0b27ff99" }),
    createOneEllipse({ w: 2, offsetY: -60, scale: 0.61, c: "#0b27ff99" }),
    createOneEllipse({ w: 4, offsetY: -60, scale: 0.65, dash: [280, 180], c: "#0b27ff99" }),
    createOneEllipse({ w: 4, offsetY: -60, scale: 0.68, dash: [16, 8], c: "#0b27ff99" }),
    createOneEllipse({ w: 2, offsetY: -60, scale: 0.8, c: "#444", blur: 10 }),
    createOneEllipse({ w: 2, offsetY: -60, scale: 0.8, c: "#0b27ffd6", blur: 10 }),
    createOneEllipse({ w: 2, offsetY: -60, scale: 0.8, c: "#0b27ffd6", blur: 10 }),
  ];

  function render() {
    offset += step;
    if (offset > 1024) step *= -1;
    clearCanvas.call(ctx, CNAVAS_SIZE);
    state.props.forEach(renderAnim);
  }

  loop(render);
  // render();
}

export default main;
