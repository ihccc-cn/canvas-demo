import { Rect } from "../geometry";
import changeTitle from "./changeTitle";

/**
 * 初始化 获取 dom 等
 */
function initCanvas(opts) {
  const { title, size = new Rect(0, 0, 512, 512), type = "2d" } = opts || {};
  if (title) changeTitle(title);
  const CNAVAS_SIZE = size; // 画布尺寸
  const CANVAS_CENTER = CNAVAS_SIZE.getCenter(); // 中心点

  const canvas = document.getElementById("canvas");
  canvas.width = CNAVAS_SIZE.width;
  canvas.height = CNAVAS_SIZE.height;
  const ctx = canvas.getContext(type);

  return {
    CNAVAS_SIZE,
    CANVAS_CENTER,
    canvas,
    ctx,
  };
}

export default initCanvas;
