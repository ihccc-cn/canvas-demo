function Content(opts) {
  const { label, children } = opts;
  const dom = [
    "<div class='field-item'>",
    label ? `<span>${label}</span>` : "",
    children,
    "</div>",
  ].join("");
  return { dom };
}

export default Content;
