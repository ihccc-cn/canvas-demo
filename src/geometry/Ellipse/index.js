import Point from "../Point";

class Ellipse {
  constructor(center = new Point(0, 0), xr = 0, yr = 0) {
    this.center = center;
    this.xr = xr;
    this.yr = yr;
  }

  /**
   * 修改中心点
   */
  to(center, y) {
    if (center instanceof Point) {
      this.center = center;
    }
    return this;
  }
}

export default Ellipse;
