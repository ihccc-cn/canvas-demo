function Color(opts) {
  const { label, name, value = "#000000" } = opts;

  const dom = [
    "<div class='field-item'>",
    "<label class='field-wrapper full'>",
    label ? `<span>${label}</span>` : "",
    `
      <input
        class='input'
        type='color'
        name='${name}'
        value='${value}'
      />
    `,
    "</label>",
    "</div>",
  ].join("");

  return { dom };
}

export default Color;
