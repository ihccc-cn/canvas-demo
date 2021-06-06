/**
 * 初始化 获取 dom
 * @param {number} [512] size 尺寸
 * @returns {object} { CNAVAS_SIZE, CANVAS_CENTER, canvas, ctx }
 */
function initCanvas(size = 512) {
  const CNAVAS_SIZE = size; // 画布尺寸
  const CANVAS_CENTER = size / 2; // 中心点

  const canvas = document.getElementById("canvas");
  canvas.width = CNAVAS_SIZE;
  canvas.height = CNAVAS_SIZE;
  const ctx = canvas.getContext("2d");

  return {
    CNAVAS_SIZE,
    CANVAS_CENTER,
    canvas,
    ctx,
  };
}

export default initCanvas;
