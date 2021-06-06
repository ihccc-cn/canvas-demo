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
}

function wave() {
  changeTitle("正弦函数曲线");
  const { CNAVAS_SIZE, CANVAS_CENTER, ctx } = initCanvas();

  const canvasSize = Size(CNAVAS_SIZE);

  // 创建坐标系
  const CoorSystemCanvas = createOffScreenCanvas(canvasSize);
  const yuandian = Point(CANVAS_CENTER, CANVAS_CENTER);
  CoorSystemCanvas.render(coorSystem, {
    point: yuandian,
    xLength: CNAVAS_SIZE - 100,
    yLength: CNAVAS_SIZE - 100,
  });

  const ONECYCLE = Math.PI * 2;
  const count = ONECYCLE / 100; // x 增量

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
      let y = trig.sin({ A: 2, W: ONECYCLE / 4, X: x, D: 0, K: 0 }, 2);
      ctx[i === x0.x ? "moveTo" : "lineTo"](to(x, 100 / ONECYCLE), to(y, 10));
      // console.log(x, y, to(x, 100 / ONECYCLE), to(y, 10));
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

  // loop(render);

  new Control([
    Control.Radio({
      label: "函数名称：",
      value: "sin",
      options: [
        { label: "sin", value: "sin" },
        { label: "cos", value: "cos" },
      ],
    }),
    Control.Silder({ label: "A：", type: "silder", value: 1 }),
    // Control.Silder({ label: 'W：', type: 'silder', value: 1 }),
    // Control.Silder({ label: 'D：', type: 'silder', value: 1 }),
    // Control.Silder({ label: 'K：', type: 'silder', value: 1 }),
    // Control.Group('调整参数', [
    //   Control.Silder({ label: 'A：', type: 'silder', value: 1 }),
    //   Control.Silder({ label: 'W：', type: 'silder', value: 1 }),
    //   Control.Silder({ label: 'D：', type: 'silder', value: 1 }),
    //   Control.Silder({ label: 'K：', type: 'silder', value: 1 }),
    // ]),
  ]).onChange((name, value) => {
    console.log(name, value);
  });
}

export default wave;
