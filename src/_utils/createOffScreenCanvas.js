import clearCanvas from "./clearCanvas";

function createOffScreenCanvas(size) {
  const canvas = document.createElement("canvas");
  canvas.width = size.width;
  canvas.height = size.height;

  const context = canvas.getContext("2d");

  canvas.render = function render(fn, ...args) {
    clearCanvas.call(context, size);
    if (typeof fn === "function") {
      fn.call(context, ...args);
      canvas._fn = {
        method: fn,
        args: args,
      };
    }
  };

  canvas.update = function update() {
    if (typeof canvas._fn === "object") {
      canvas._fn.method.call(context, ...canvas._fn.args);
    }
  };

  return canvas;
}

export default createOffScreenCanvas;
