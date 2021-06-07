function coorSystem({ point, xLength = 100, yLength = 100, zoom_x = 10, zoom_y = 10 }) {
  const ctx = this;

  ctx.lineWidth = 2;
  ctx.strokeStyle = "#c9c9c9";
  ctx.fillStyle = "#c9c9c9";

  ctx.beginPath();
  // x 轴左轴
  ctx.moveTo(point.x, point.y);
  ctx.lineTo(point.x - xLength / 2, point.y);
  // x 轴右轴
  ctx.moveTo(point.x, point.y);
  ctx.lineTo(point.x + xLength / 2, point.y);
  // y 轴上轴
  ctx.moveTo(point.x, point.y);
  ctx.lineTo(point.x, point.y - yLength / 2);
  // y 轴下轴
  ctx.moveTo(point.x, point.y);
  ctx.lineTo(point.x, point.y + yLength / 2);
  ctx.closePath();
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(point.x + xLength / 2, point.y);
  ctx.arc(point.x + xLength / 2, point.y, 4, 0, Math.PI * 2);
  ctx.moveTo(point.x, point.y - yLength / 2);
  ctx.arc(point.x, point.y - yLength / 2, 4, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fill();

  ctx.font = "18px Verdana";
  ctx.fillText("0", point.x - 16, point.y + 20);

  ctx.fillText("х", point.x + xLength / 2, point.y + 24);
  ctx.fillText("y", point.x + 16, point.y - yLength / 2);

  ctx.save();
  ctx.beginPath();
  for (let x = 0; x < xLength / 2; x += zoom_x) {
    if (x === 0) continue;
    ctx.moveTo(point.x + x, point.y);
    ctx.lineTo(point.x + x, point.y - 3);
    ctx.moveTo(point.x - x, point.y);
    ctx.lineTo(point.x - x, point.y - 3);
  }
  for (let y = 0; y < yLength / 2; y += zoom_y) {
    if (y === 0) continue;
    ctx.moveTo(point.x, point.y + y);
    ctx.lineTo(point.x + 3, point.y + y);
    ctx.moveTo(point.x, point.y - y);
    ctx.lineTo(point.x + 3, point.y - y);
  }
  ctx.closePath();
  ctx.stroke();
  ctx.restore();
}

export default coorSystem;
