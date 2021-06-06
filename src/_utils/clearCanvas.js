function clearCanvas(size, fillStyle) {
  if (!fillStyle) {
    this.clearRect(0, 0, size.width, size.height);
  } else {
    this.save();
    this.fillStyle = fillStyle;
    this.fillRect(0, 0, size.width, size.height);
    this.restore();
  }
}

export default clearCanvas;
