import { initCanvas, createOffScreenCanvas, clearCanvas, trig, loop, Point, m } from "../../_utils";

const ONECYCLE = 2 * Math.PI;

// 绘制波纹
function renderRipple(opts) {
  const {
    origin,
    repeat = 10,
    A_distance = 16,
    radius = 2,
    rotate = 0,
    w = 0.02,
    step = 4,
    offset = 0,
  } = opts;
  const ctx = this;

  ctx.translate(origin.x, origin.y);
  ctx.rotate(rotate);
  for (let i = 1; i <= repeat; i++) {
    ctx.fillStyle = "#fff";
    for (let x = -ONECYCLE / w / 4; x <= ONECYCLE / w / 4; x += step) {
      let y = trig.sin({ A: A_distance * i, W: w, X: x + offset, D: -ONECYCLE / 4 }, 0);
      ctx.fillRect(x, y, radius, radius);
    }
  }
  ctx.translate(-origin.x, -origin.y);

  // console.log(opts);
}

function main() {
  const { CNAVAS_SIZE, CANVAS_CENTER, ctx } = initCanvas({
    title: "圆环粒子效果",
  });

  // ctx.globalCompositeOperation = "source-in";
  // ctx.globalCompositeOperation = "lighter";

  function renderBackground() {
    ctx.save();
    ctx.fillStyle = "#f00";
    ctx.fillRect(0, 0, CNAVAS_SIZE.width, CNAVAS_SIZE.height);
    ctx.restore();
  }

  const state = {
    num: 10,
    circleRadius: 80,
    ripples: [],
    offset: 0,
  };

  for (let angle = 0; angle < state.num; angle++) {
    let x = CANVAS_CENTER.x + state.circleRadius * Math.cos(angle);
    let y = CANVAS_CENTER.y + state.circleRadius * Math.sin(angle);
    state.ripples.push({
      canvas: createOffScreenCanvas(CNAVAS_SIZE),
      origin: Point(x, y),
      rotate: angle + Math.PI / 2,
      repeat: m.random(5, 10),
      A_distance: m.random(10, 20),
      w: m.random(0.02, 0.03, 4),
      // rotateSpeed: m.random(ONECYCLE / 2400, ONECYCLE / 1800, 4),
    });
  }

  function render() {
    // state.offset += 0.8;
    // clearCanvas.call(ctx, CNAVAS_SIZE);
    // // renderBackground();
    // state.ripples.forEach((ripple) => {
    //   ripple.canvas.render(renderRipple, { ...ripple, offset: state.offset });
    // });
    // state.ripples.forEach((ripple, index) => {
    //   // ctx.translate(CANVAS_CENTER.x, CANVAS_CENTER.y);
    //   // ctx.rotate(state.ripples[index].rotateSpeed);
    //   // ctx.translate(-CANVAS_CENTER.x, -CANVAS_CENTER.y);
    //   ctx.drawImage(ripple.canvas, 0, 0);
    //   // renderRipple.call(ctx, ripple);
    // });

    clearCanvas.call(ctx, CNAVAS_SIZE);
    // renderBackground();
    // state.ripples.forEach((ripple, index) => {
    //   // ctx.translate(CANVAS_CENTER.x, CANVAS_CENTER.y);
    //   // ctx.rotate(state.ripples[index].rotateSpeed);
    //   // ctx.translate(-CANVAS_CENTER.x, -CANVAS_CENTER.y);
    //   renderRipple.call(ctx, ripple);
    // });
  }

  // setInterval(render, 2000);

  loop(render);

  // console.log(CNAVAS_SIZE, CANVAS_CENTER, state);
}

export default main;
