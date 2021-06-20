import { Circle } from "../../geometry";
import { initCanvas, clearCanvas, trig, m, loop } from "../../_utils";

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
   *    b、以正、余弦曲线作为偏移量来偏移圆上的点
   * 2、限制粒子在圆外运动，如果运动到圆内，将 A 值调整为原来的 1/4，运动到圆外，恢复
   * 3、根据周期性调整 A 值，每过1/4个周期修改一次A值
   * 4、根据当前 x、y的值，修改粒子的颜色
   * 5、在限制的界限上绘制多个略有透明的白色阴影圆环，增加光效
   */

  const circle = new Circle(CANVAS_CENTER, 100); // 限制圆形边界
  const state = {
    number: 600, // 总计粒子数量
    times: 3, // 曲线在圆上的周期范围
    circle,
    count: ONECYCLE / 360, // 增量
  };

  console.log(state);
  ctx.fillStyle = "#fff";
  ctx.lineWidth = 1;
  ctx.strokeStyle = "#fff";
  let k = 0;

  function renderOneRipple({ a = 54, w = 8, r = 255, b = 255 }) {
    let offset = 0;

    // ρ = sin(9 * θ) / 3 + A
    // ρ = a * sin(k * θ) + A

    for (let i = 0; i < ONECYCLE; i += state.count) {
      let { x, y } = circle.getPointInBoundary(i);

      ctx.fillStyle = `rgba(${y - k}, 0, ${x + k}, ${1 - k / 100})`;

      offset = trig.sin(((i / state.count) * ONECYCLE) / 360, {
        A: offset < 0 ? a / 2 : a,
        W: w,
        D: 0,
        K: k,
      });

      x += offset * Math.cos(i);
      y += offset * Math.sin(i);

      ctx.fillRect(x, y, 2, 2);
    }
  }

  const ripples = [
    {
      a: m.random(32, 64),
      w: m.random(6, 8),
      r: m.random(150, 255),
      b: m.random(150, 255),
    },
    {
      a: m.random(32, 64),
      w: m.random(6, 8),
      r: m.random(150, 255),
      b: m.random(150, 255),
    },
    {
      a: m.random(32, 64),
      w: m.random(6, 8),
      r: m.random(150, 255),
      b: m.random(150, 255),
    },
    {
      a: m.random(32, 64),
      w: m.random(6, 8),
      r: m.random(150, 255),
      b: m.random(150, 255),
    },
    {
      a: m.random(32, 64),
      w: m.random(6, 8),
      r: m.random(150, 255),
      b: m.random(150, 255),
    },
    {
      a: m.random(32, 64),
      w: m.random(6, 8),
      r: m.random(150, 255),
      b: m.random(150, 255),
    },
    {
      a: m.random(32, 64),
      w: m.random(6, 8),
      r: m.random(150, 255),
      b: m.random(150, 255),
    },
  ];

  const render = function () {
    if (k++ > circle.radius) k = 0;
    clearCanvas.call(ctx, CNAVAS_SIZE);
    // 先绘制一个圆环用于标记位置
    // ctx.beginPath();
    // ctx.arc(circle.center.x, circle.center.y, circle.radius, 0, ONECYCLE);
    // ctx.closePath();
    // ctx.stroke();
    ctx.translate(circle.center.x, circle.center.y);
    ctx.rotate(ONECYCLE / 360);
    ctx.translate(-circle.center.x, -circle.center.y);
    ripples.forEach(renderOneRipple);
    // renderOneRipple({});
  };

  // render();
  // setInterval(render, 1000);

  loop(render);
}

export default main;
