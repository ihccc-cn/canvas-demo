import {
  changeTitle,
  initCanvas,
  clearCanvas,
  Size,
  trig,
  loop,
} from "../../_utils";

const sin = Math.sin;
const cos = Math.cos;

function p1() {
  changeTitle("粒子圆环效果");
  const { CNAVAS_SIZE, CANVAS_CENTER, ctx } = initCanvas();

  const canvasSize = Size(CNAVAS_SIZE);

  const ONECYCLE = Math.PI * 2; // 一个周期 360 度 即 2π

  const radius = 120; // 最内圆环半径
  const cycleSize = 100; // 单个圆环粒子数量
  const particleSize = cycleSize * 10; // 总计粒子数量
  const sr = 4; // 粒子半径
  const circleDistance = 6; // 圆环半径间隔
  const rotateSpeed = ONECYCLE / 360 / 6; // 粒子旋转速度

  let count = 0;

  // ctx.globalCompositeOperation = "lighter";
  // ctx.strokeStyle = "#ff0000";
  ctx.fillStyle = "#ffffff";

  // 根据角度求圆上坐标
  // x = x₀ + r * cos(Θ);
  // y = y₀ + r * sin(Θ);

  let θ = ONECYCLE / cycleSize; // 每个粒子间隔角度
  let offsetAngel = 1; // 粒子旋转偏移量

  function renderCircle() {
    θ = θ % ONECYCLE;
    for (let i = 0; i < particleSize; i++) {
      const cdx = Math.floor(i / cycleSize); // 当前圆环的索引
      const pdx = i % cycleSize; // 当前圆环内粒子的索引

      let circleRadius = radius + circleDistance * cdx; // 当前圆环半径

      let r = sr; // 当前粒子半径

      r = trig.sin({ A: sr, W: cdx, X: offsetAngel }, 0);

      let x = CANVAS_CENTER + circleRadius * cos(θ * pdx + offsetAngel);
      let y = CANVAS_CENTER + circleRadius * sin(θ * pdx + offsetAngel);

      // x = trig.sin({ A: x, W: ONECYCLE / pdx / 6, X: offsetAngel, D: 0 }, 0);
      // y = trig.cos({ A: y, W: ONECYCLE / pdx / 6, X: offsetAngel, D: 0 }, 0);

      if (r > 0) {
        ctx.fillStyle = `rgb(${x}, ${100}, ${y})`;
        ctx.fillRect(x, y, r, r);
      }
    }
  }

  function render() {
    count++;
    offsetAngel += rotateSpeed;

    clearCanvas.call(ctx, canvasSize);
    renderCircle();
  }

  render();

  loop(render);
}

export default p1;
