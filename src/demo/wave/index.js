import {
  changeTitle,
  initCanvas,
  createOffScreenCanvas,
  clearCanvas,
  trig,
  Size,
  Point,
  loop,
  Control,
} from "../../_utils";

function to(number, s) {
  return number * s;
}

function coorSystem({ point, xLength = 100, yLength = 100 }) {
  const ctx = this;

  ctx.lineWidth = 2;
  ctx.strokeStyle = "#c9c9c9";
  ctx.fillStyle = "#c9c9c9";

  ctx.beginPath();
  // x 轴左轴
  ctx.moveTo(point.x, point.y);
  ctx.lineTo(point.x - xLength / 2, point.y);
  // x 轴右轴
  ctx.moveTo(point.x, point.y);
  ctx.lineTo(point.x + xLength / 2, point.y);
  // y 轴上轴
  ctx.moveTo(point.x, point.y);
  ctx.lineTo(point.x, point.y - yLength / 2);
  // y 轴下轴
  ctx.moveTo(point.x, point.y);
  ctx.lineTo(point.x, point.y + yLength / 2);
  ctx.closePath();
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(point.x + xLength / 2, point.y);
  ctx.arc(point.x + xLength / 2, point.y, 4, 0, Math.PI * 2);
  ctx.moveTo(point.x, point.y - yLength / 2);
  ctx.arc(point.x, point.y - yLength / 2, 4, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fill();

  ctx.font = "18px Verdana";
  ctx.fillText("0", point.x - 16, point.y + 20);

  ctx.fillText("x", point.x + xLength / 2, point.y + 24);
  ctx.fillText("y", point.x + 16, point.y - yLength / 2);
}

function wave() {
  changeTitle("三角函数曲线");
  const { CNAVAS_SIZE, CANVAS_CENTER, ctx } = initCanvas();

  const canvasSize = Size(CNAVAS_SIZE);

  const ONECYCLE = Math.PI * 2;
  const count = ONECYCLE / 100; // x 增量

  let data = {
    method: "sin",
    a: 2,
    w: 1,
    d: 0,
    k: 0,
    zoom_x: 100 / ONECYCLE,
    zoom_y: 10,
  };

  // 创建坐标系
  const CoorSystemCanvas = createOffScreenCanvas(canvasSize);
  const origin = Point(CANVAS_CENTER, CANVAS_CENTER);

  // x 起点
  const x0 = {
    val: -ONECYCLE,
    x: -200,
    y: 0,
  };
  // x 终点
  const x1 = {
    val: ONECYCLE,
    x: 200,
    y: 0,
  };

  function renderCoorSystem() {
    CoorSystemCanvas.render(coorSystem, {
      point: origin,
      xLength: CNAVAS_SIZE - 100,
      yLength: CNAVAS_SIZE - 100,
    });
    ctx.drawImage(CoorSystemCanvas, 0, 0);
  }

  function renderFunc() {
    ctx.translate(CANVAS_CENTER, CANVAS_CENTER);
    ctx.save();
    ctx.strokeStyle = "#f00";
    ctx.lineWidth = 4;
    ctx.beginPath();
    for (let i = x0.val; i <= x1.val; i += count) {
      let x = i;
      let y = trig[data.method]({ A: data.a, W: data.w, X: x, D: data.d, K: data.k }, 2);
      ctx[i === x0.x ? "moveTo" : "lineTo"](to(x, data.zoom_x), to(y, data.zoom_y));
    }
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
    ctx.translate(-CANVAS_CENTER, -CANVAS_CENTER);
  }

  function render() {
    clearCanvas.call(ctx, canvasSize);
    renderCoorSystem();
    renderFunc();
  }

  render();

  loop(render);

  new Control([
    Control.Radio({
      label: "函数：",
      name: "method",
      value: data.method,
      options: [
        { label: "y=Asin(ωx+φ)+k", value: "sin" },
        { label: "y=Acos(ωx+φ)+k", value: "cos" },
      ],
    }),
    Control.Group("调整参数", [
      Control.Silder({ label: "A：", name: "a", type: "silder", value: data.a }),
      Control.Silder({
        label: "ω：",
        name: "w",
        type: "silder",
        value: data.w,
        min: -6,
        max: 6,
        step: 0.5,
      }),
      Control.Silder({ label: "φ：", name: "d", type: "silder", value: data.d }),
      Control.Silder({ label: "k：", name: "k", type: "silder", value: data.k, min: -10 }),
    ]),
    Control.Group("坐标系", [
      Control.Silder({
        label: "X 轴比例：",
        name: "zoom_x",
        type: "silder",
        value: data.zoom_x,
        min: 1,
        max: 100,
      }),
      Control.Silder({
        label: "Y 轴比例：",
        name: "zoom_y",
        type: "silder",
        value: data.zoom_y,
        min: 1,
        max: 100,
      }),
    ]),
  ]).onChange((name, value) => {
    data[name] = value;
  });
}

export default wave;
