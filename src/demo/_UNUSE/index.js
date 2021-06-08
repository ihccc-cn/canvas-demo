import { initCanvas } from "../../_utils";

function main() {
  const { CNAVAS_SIZE, CANVAS_CENTER, canvas, ctx } = initCanvas({
    title: "圆环粒子效果",
  });
  console.log(CNAVAS_SIZE, CANVAS_CENTER, canvas, ctx);
}

export default main;
