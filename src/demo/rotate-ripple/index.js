import { Circle } from "../../geometry";
import { initCanvas, clearCanvas, trig, loop } from "../../_utils";

const ONECYCLE = 2 * Math.PI;

function main() {
  const { CNAVAS_SIZE, CANVAS_CENTER, ctx } = initCanvas({
    title: "圆环粒子效果",
  });

  /**
   * 构想：
   * 将指定数量粒子根据三角函数曲线，进行移动，并且旋转
   * 1、在圆上做正、余弦运动，求 x 和 y 坐标
   *    a、获取圆上的点
   *    b、求以当前点为圆心的坐标系上的正、余弦曲线上的点
   * 2、将正、余弦的K值设置在圆的边界上
   * 3、限制粒子在圆外运动，如果运动到圆内，将 A 值调整为原来的 1/4，运动到圆外，恢复
   * 4、根据周期性调整 A 值，每过1/4个周期修改一次A值
   * 5、根据当前 x、y的值，修改粒子的颜色
   * 6、在限制的界限上绘制多个略有透明的白色阴影圆环，增加光效
   */

  const circle = new Circle(CANVAS_CENTER, 100); // 限制圆形边界
  const state = {
    number: 600, // 总计粒子数量
    times: 3, // 曲线在圆上的周期范围
    circle,
    count: ONECYCLE / 3600, // 增量
  };

  console.log(state);
  ctx.fillStyle = "#fff";

  function renderOneRipple() {
    // 先绘制一个圆环用于标记位置
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#fff";
    ctx.arc(circle.center.x, circle.center.y, circle.radius, 0, ONECYCLE);
    ctx.stroke();
    ctx.closePath();

    // ρ = sin(9 * θ) / 3 + A
    // ρ = a * sin(k * θ) + A

    for (let i = 0; i < ONECYCLE; i += state.count) {
      // const { x, y } = circle.getPointInBoundary(i);

      const x1 = circle.radius * Math.sin(9 * i) * Math.cos(i) * 1.2 + circle.center.x;
      const y1 = circle.radius * Math.sin(9 * i) * Math.sin(i) * 1.2 + circle.center.y;

      // console.log(x);
      ctx.fillRect(x1, y1, 2, 2);
    }
  }

  const render = function () {
    clearCanvas.call(ctx, CNAVAS_SIZE);

    renderOneRipple();
  };

  render();
  setInterval(render, 1000);

  // loop(render);
}

export default main;
