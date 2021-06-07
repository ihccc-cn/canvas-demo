import Size from "./Size";
import Point from "./Point";
import changeTitle from "./changeTitle";

/**
 * 初始化 获取 dom 等
 */
function initCanvas(opts) {
  const { title, size = Size(512), type = "2d" } = opts || {};
  if (title) changeTitle(title);
  const CNAVAS_SIZE = size; // 画布尺寸
  const CANVAS_CENTER = Point(size.width / 2, size.height / 2); // 中心点

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
