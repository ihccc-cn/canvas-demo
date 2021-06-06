function toShake(num, precision = -1) {
  if (precision > -1) {
    const pre = 10 ** precision;
    num = Math.round(num * pre) / pre;
  }
  return num;
}

/**
 * A * sin(ω * X + φ) + K
 * @param {number} A [1] 振幅，范围 [-A, A]
 * @param {number} W [1] 角速度
 * @param {number} X [0] 因变量
 * @param {number} D [0] 初始位置，当X 等于 0 时，y = A * sin(D) + K, 值取 [-π, π]
 * @param {number} K [0] 偏距，影响范围 [-A + K, A + K]
 * @param {number} precision [-1] 结果精度
 * @returns
 */
function sinFn({ A = 1, W = 1, X = 0, D = 0, K = 0 }, precision = -1) {
  D = +D;
  K = +K;
  return toShake(A * Math.sin(W * X + D) + K, precision);
}

/**
 * A * cos(ω * X + φ) + K
 * @param {number} A [1] 振幅，范围 [-A, A]
 * @param {number} W [1] 角速度
 * @param {number} X [0] 因变量
 * @param {number} D [0] 初始位置，当X 等于 0 时，y = A * sin(D) + K, 值取 [-π, π]
 * @param {number} K [0] 偏距，影响范围 [-A + K, A + K]
 * @param {number} precision [-1] 结果精度
 * @returns
 */
function cosFn({ A = 1, W = 1, X = 0, D = 0, K = 0 }, precision = -1) {
  D = +D;
  K = +K;
  return toShake(A * Math.cos(W * X + D) + K, precision);
}

const Trig = {
  sin: sinFn,
  cos: cosFn,
};

export default Trig;
