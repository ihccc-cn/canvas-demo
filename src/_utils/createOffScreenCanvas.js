function createOffScreenCanvas(size) {
  const canvas = document.createElement("canvas");
  canvas.width = size.width;
  canvas.height = size.height;

  const context = canvas.getContext("2d");

  canvas.render = function render(fn, ...args) {
    typeof fn === "function" && fn.call(context, ...args);
  };

  return canvas;
}

export default createOffScreenCanvas;
