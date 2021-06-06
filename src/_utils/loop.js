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

const loop = function (func, _t) {
  func(_t);
  requestAnimationFrame(function (tick) {
    loop(func, tick);
  });
};

loop.requestAnimationFrame = requestAnimationFrame;

export default loop;
