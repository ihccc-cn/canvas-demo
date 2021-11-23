import { stats } from "../../components/Stats";
import { Point, Ellipse } from "../../geometry";
import { initCanvas, clearCanvas, loop, m } from "../../_utils";

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

  function createOneEllipse({ offsetY = 0, scale = 1, dash = false, rotate = 0, ...rest }) {
    return {
      ellipse: new Ellipse(
        new Point(CANVAS_CENTER.x, CANVAS_CENTER.y + 160 + offsetY),
        200 * scale,
        40 * scale
      ),
      dash: dash ? dash.map((i) => i * scale) : dash,
      rotate: rotate ? rotate : dash ? (m.random(0, 2) ? -1 : 1) : 0,
      ...rest,
    };
  }

  const grd = ctx.createLinearGradient(0, 0, CNAVAS_SIZE.width, 0);
  grd.addColorStop(0, "#dc26e280");
  grd.addColorStop(0.5, "#00d8ffaa");
  grd.addColorStop(1, "#233cff80");
  ctx.strokeStyle = grd;
  ctx.globalCompositeOperation = "lighter";

  let offset = 0;
  let step = 1;

  function renderAnim({ ellipse, w = 2, dash = false, rotate = 0, blur = 0, sc = "#fff" }) {
    if (!ellipse) return;
    ctx.save();

    if (ctx.lineWidth !== w) ctx.lineWidth = w;
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
    createOneEllipse({ scale: 0.5 }),
    createOneEllipse({ scale: 0.55 }),
    createOneEllipse({ w: 20, scale: 0.6, dash: [4, 6] }),
    createOneEllipse({ w: 20, scale: 0.7, dash: [4, 6] }),
    createOneEllipse({ w: 20, scale: 0.9, dash: [4, 6], blur: 10 }),
    createOneEllipse({ w: 20, scale: 0.9, dash: [4, 6], blur: 10 }),
    createOneEllipse({ w: 2 }),
    // 二层
    createOneEllipse({ w: 2, offsetY: -12, scale: 0.5 }),
    createOneEllipse({ w: 2, offsetY: -12, scale: 0.51 }),
    createOneEllipse({ w: 2, offsetY: -12, scale: 0.52 }),
    createOneEllipse({ offsetY: -12, scale: 0.65, dash: [8, 8] }),
    createOneEllipse({ offsetY: -12, scale: 0.8, dash: [280, 140] }),
    createOneEllipse({ w: 8, offsetY: -12, scale: 1.2, dash: [280, 140], blur: 10, rotate: 1 }),
    createOneEllipse({ w: 8, offsetY: -12, scale: 1.2, dash: [280, 140], blur: 10, rotate: 1 }),
    createOneEllipse({ w: 8, offsetY: -12, scale: 1.2, dash: [280, 140], blur: 10, rotate: 1 }),
    // 三层
    createOneEllipse({ offsetY: -48, scale: 0.5, dash: [280, 140] }),
    createOneEllipse({ offsetY: -48, scale: 0.54, dash: [280, 140] }),
    createOneEllipse({ offsetY: -48, scale: 0.8, dash: [280, 140] }),
    // 四层
    createOneEllipse({ offsetY: -60, scale: 0.5 }),
    createOneEllipse({ w: 2, offsetY: -60, scale: 0.55 }),
    createOneEllipse({ w: 2, offsetY: -60, scale: 0.56 }),
    createOneEllipse({ w: 4, offsetY: -60, scale: 0.6, dash: [280, 140] }),
    createOneEllipse({ w: 2, offsetY: -60, scale: 0.61 }),
    createOneEllipse({ w: 4, offsetY: -60, scale: 0.65, dash: [280, 140] }),
    createOneEllipse({ w: 4, offsetY: -60, scale: 0.68, dash: [16, 8] }),
    createOneEllipse({ w: 2, offsetY: -60, scale: 0.8, blur: 10 }),
    createOneEllipse({ w: 8, offsetY: -60, scale: 0.8, blur: 10 }),
    createOneEllipse({ w: 8, offsetY: -60, scale: 0.8, blur: 10 }),
  ];

  function render() {
    offset += step;
    if (offset > 1024 || offset < 0) step *= -1;
    stats.begin();
    clearCanvas.call(ctx, CNAVAS_SIZE);
    state.props.forEach(renderAnim);
    stats.end();
  }

  return loop(render);
}

export default main;
