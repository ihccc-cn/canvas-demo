import TWEEN from "@tweenjs/tween.js";
import { Circle, Point } from "../../geometry";
import { initCanvas, createOffScreenCanvas, clearCanvas, trig, m, loop } from "../../_utils";
import ripples from "./ripples";

const ONECYCLE = 2 * Math.PI;

class ParticleCycle {
  constructor({ center = new Point(0, 0), radius = 100, delay = 0 }) {
    this.circle = new Circle(center, radius);
    this.delay = delay;
    this.startIndex = -1;
    this.range = 2;
    this.offset = 0;
    this.count = ONECYCLE / 180;
  }
  render(ctx) {
    for (let index = 0; index < 180; index += 1) {
      const angle = this.count * index;
      let { x, y } = this.circle.getPointInBoundary(angle);
      const i = index - this.startIndex;

      if (
        this.offset > 0 &&
        this.startIndex > 0 &&
        index > this.startIndex &&
        index < this.startIndex + ONECYCLE / this.range / 2 / this.count
      ) {
        const offsetY = trig.sin(this.count * i, {
          A: this.offset,
          W: this.range,
          D: 0,
          // K: this.offset,
        });
        // console.log(offsetY);
        x += offsetY * Math.cos(angle);
        y += offsetY * Math.sin(angle);
      }

      ctx.fillRect(x, y, 2, 2);
    }
  }
}

function main() {
  const { CNAVAS_SIZE, CANVAS_CENTER, ctx } = initCanvas({
    title: "圆环粒子效果",
  });

  const state = {
    number: 10, // 圆环数量
  };

  ctx.fillStyle = "#fff";
  ctx.lineWidth = 1;
  ctx.strokeStyle = "#fff";

  let one = new Array(9).fill("").map(() => new ParticleCycle({ center: CANVAS_CENTER }));

  function create() {
    const oneState = { offset: 0 };
    const startIndex = m.random(0, 180);
    one.map((item, index) => {
      item.startIndex = startIndex;
      // one.offset = m.random(20, 50);
      new TWEEN.Tween(oneState)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .to({ offset: m.random(100, 200) }, 1000)
        .repeat(1)
        .yoyo(true)
        .delay(50 * index)
        .onUpdate(() => {
          item.offset = oneState.offset;
        })
        .start();
    });
  }

  const render = function (tick) {
    TWEEN.update(tick);
    clearCanvas.call(ctx, CNAVAS_SIZE);
    one.map((item) => item.render(ctx));
  };

  // render();
  // setInterval(render, 1000);

  create();
  setInterval(create, 4000);

  loop(render);
}

export default main;
