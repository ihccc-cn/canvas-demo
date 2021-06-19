import Point from "../Point";

class Circle {
  constructor(center = new Point(0, 0), radius = 20) {
    this.center = center;
    this.radius = radius;
  }

  /**
   * 修改中心点
   */
  to(center) {
    if (center instanceof Point) {
      this.center = center;
    }
    return this;
  }

  /**
   * 修改半径
   */
  setRadius(radius) {
    if (radius > 0) {
      this.radius = radius;
    }
    return this;
  }

  /**
   * 根据角度，获得在圆上的坐标
   * @param {numer} angle
   */
  getPointInBoundary(angle) {
    return new Point(
      this.center.x + this.radius * Math.cos(angle),
      this.center.y + this.radius * Math.sin(angle)
    );
  }
}

export default Circle;
