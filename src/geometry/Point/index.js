class Point {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  /**
   * 移动
   * @param {number} x 坐标
   * @param {number} y 坐标
   */
  to(x, y) {
    this.x = x;
    this.y = y;
  }
}

export default Point;
