function float(num, precision = -1) {
  if (precision > -1) {
    const pre = 10 ** precision;
    num = Math.round(num * pre) / pre;
  }
  return num;
}

function random(min, max, precision = 0) {
  return float(Math.random() * (max - min) + min, precision);
}

export default {
  float,
  random,
};
