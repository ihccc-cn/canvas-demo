function coorSystem({ origin, xLength = 100, yLength = 100, zoom_x = 10, zoom_y = 10 }) {
  const ctx = this;

  ctx.lineWidth = 2;
  ctx.strokeStyle = "#c9c9c9";
  ctx.fillStyle = "#c9c9c9";

  ctx.beginPath();
  // x 轴左轴
  ctx.moveTo(origin.x, origin.y);
  ctx.lineTo(origin.x - xLength / 2, origin.y);
  // x 轴右轴
  ctx.moveTo(origin.x, origin.y);
  ctx.lineTo(origin.x + xLength / 2, origin.y);
  // y 轴上轴
  ctx.moveTo(origin.x, origin.y);
  ctx.lineTo(origin.x, origin.y - yLength / 2);
  // y 轴下轴
  ctx.moveTo(origin.x, origin.y);
  ctx.lineTo(origin.x, origin.y + yLength / 2);
  ctx.closePath();
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(origin.x + xLength / 2, origin.y);
  ctx.arc(origin.x + xLength / 2, origin.y, 4, 0, Math.PI * 2);
  ctx.moveTo(origin.x, origin.y - yLength / 2);
  ctx.arc(origin.x, origin.y - yLength / 2, 4, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fill();

  ctx.font = "18px Verdana";
  ctx.fillText("0", origin.x - 16, origin.y + 20);

  ctx.fillText("х", origin.x + xLength / 2, origin.y + 24);
  ctx.fillText("y", origin.x + 16, origin.y - yLength / 2);

  ctx.save();
  ctx.beginPath();
  for (let x = 0; x < xLength / 2; x += zoom_x) {
    if (x === 0) continue;
    ctx.moveTo(origin.x + x, origin.y);
    ctx.lineTo(origin.x + x, origin.y - 3);
    ctx.moveTo(origin.x - x, origin.y);
    ctx.lineTo(origin.x - x, origin.y - 3);
  }
  for (let y = 0; y < yLength / 2; y += zoom_y) {
    if (y === 0) continue;
    ctx.moveTo(origin.x, origin.y + y);
    ctx.lineTo(origin.x + 3, origin.y + y);
    ctx.moveTo(origin.x, origin.y - y);
    ctx.lineTo(origin.x + 3, origin.y - y);
  }
  ctx.closePath();
  ctx.stroke();
  ctx.restore();
}

export default coorSystem;
