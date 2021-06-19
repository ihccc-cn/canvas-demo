import Point from "../Point";

class Rect {
  constructor(x = 0, y = 0, width = 0, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height || width;
  }
  /**
   * 获取矩形的中心点
   */
  getCenter() {
    return new Point(this.width / 2 + this.x, this.height / 2 + this.y);
  }
}

export default Rect;
