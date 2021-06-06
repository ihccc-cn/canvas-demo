import { changeTitle, initCanvas } from "../../_utils";

function _UNUSE() {
  changeTitle("未使用标题");
  const { CNAVAS_SIZE, CANVAS_CENTER, canvas, ctx } = initCanvas();
  console.log(CNAVAS_SIZE, CANVAS_CENTER, canvas, ctx);
}

export default _UNUSE;
