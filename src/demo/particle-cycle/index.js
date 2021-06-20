import { Circle } from "../../geometry";
import { initCanvas, clearCanvas, trig, loop } from "../../_utils";

function main() {
  const { CNAVAS_SIZE, CANVAS_CENTER, ctx } = initCanvas({
    title: "粒子圆环效果",
  });

  const ONECYCLE = Math.PI * 2; // 一个周期 360 度 即 2π

  const radius = 100; // 最内圆环半径
  const cycleSize = 100; // 单个圆环粒子数量
  const particleSize = cycleSize * 10; // 总计粒子数量
  const sr = 6; // 粒子半径
  const circleDistance = 8; // 圆环半径间隔
  const rotateSpeed = ONECYCLE / 360; // 粒子旋转速度

  // ctx.globalCompositeOperation = "lighter";
  // ctx.strokeStyle = "#ff0000";
  ctx.fillStyle = "#ffffff";

  // 根据角度求圆上坐标
  // x = x₀ + r * cos(Θ);
  // y = y₀ + r * sin(Θ);

  let θ = ONECYCLE / cycleSize; // 每个粒子间隔角度
  let offsetAngel = 1; // 粒子旋转偏移量

  let circle = new Circle(CANVAS_CENTER, radius);

  function renderCircle() {
    θ = θ % ONECYCLE;
    for (let i = 0; i < particleSize; i++) {
      const cdx = Math.floor(i / cycleSize); // 当前圆环的索引
      const pdx = i % cycleSize; // 当前圆环内粒子的索引

      circle.setRadius(radius + circleDistance * cdx); // 当前圆环半径

      let r = sr; // 当前粒子半径

      r = Math.abs(
        trig.sin(
          offsetAngel * 6 + pdx,
          { A: sr, W: Math.PI * 0.06 + cdx / 2000 },
          0
        )
      );

      let { x, y } = circle.getPointInBoundary(θ * pdx + offsetAngel);

      // x = trig.sin(offsetAngel, { A: x, W: ONECYCLE / pdx / 6, D: 0 }, 0);
      // y = trig.cos(offsetAngel, { A: y, W: ONECYCLE / pdx / 6, D: 0 }, 0);

      if (r > 0) {
        ctx.fillStyle = `rgb(${x}, ${100}, ${y})`;
        ctx.fillRect(x, y, r, r);
      }
    }
  }

  function render() {
    offsetAngel += rotateSpeed;

    clearCanvas.call(ctx, CNAVAS_SIZE);
    renderCircle();
  }

  loop(render);
}

export default main;
