function Silder(opts) {
  const { label, name, value = 0, min = 0, max = 10, step = 1 } = opts;

  const dom = [
    "<div class='field-item'>",
    "<label class='field-wrapper full'>",
    label ? `<span>${label}</span>` : "",
    `
      <input 
        class='input'
        type='range'
        name='${name}'
        value='${value}'
        min='${min}'
        max='${max}'
        step='${step}'
      /><b>${value}</b>
    `,
    "</label>",
    "</div>",
  ].join("");

  return { dom };
}

export default Silder;
