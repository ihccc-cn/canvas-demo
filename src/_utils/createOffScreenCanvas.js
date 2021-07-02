import clearCanvas from "./clearCanvas";

function createOffScreenCanvas(size) {
  const canvas = document.createElement("canvas");
  canvas.width = size.width;
  canvas.height = size.height;

  const context = canvas.getContext("2d");

  canvas.render = function render(fn, ...args) {
    if (typeof fn === "function") {
      clearCanvas.call(context, size);
      fn.call(context, ...args);
      canvas._fn = {
        method: fn,
        args: args,
      };
    }
  };

  canvas.update = function update() {
    if (typeof canvas._fn === "object") {
      clearCanvas.call(context, size);
      canvas._fn.method.call(context, ...canvas._fn.args);
    }
  };

  return canvas;
}

export default createOffScreenCanvas;
