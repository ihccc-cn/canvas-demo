export const requestAnimationFrame = (function () {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 6000 / 60);
    }
  );
})();

export const loop = function (func) {
  if (typeof func !== "function") return;
  let raf = null;

  function animate(tick) {
    func(tick);
    raf = requestAnimationFrame(animate);
  }

  function cancel() {
    cancelAnimationFrame(raf);
  }

  animate();

  return cancel;
};

loop.requestAnimationFrame = requestAnimationFrame;

export default loop;
