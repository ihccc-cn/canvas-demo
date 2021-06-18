function Input(opts) {
  const { label, name, value = "", max = 255 } = opts;

  const dom = [
    "<div class='field-item'>",
    "<label class='field-wrapper full'>",
    label ? `<span>${label}</span>` : "",
    `
      <input
        class='input'
        type='text'
        name='${name}'
        value='${value}'
        max='${max}'
      />
    `,
    "</label>",
    "</div>",
  ].join("");

  return { dom };
}

export default Input;
