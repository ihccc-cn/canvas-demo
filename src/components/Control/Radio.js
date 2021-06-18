function Radio(opts) {
  const { label, name, value, options } = opts;

  const dom = [
    "<div class='field-item'>",
    label ? `<label for='${name}'>${label}</label>` : "",
    options
      .map(
        (item) =>
          `<label class='field-wrapper'>
            <input
              class='input'
              type='radio' 
              name='${name}'
              value='${item.value}' 
              ${value === item.value ? "checked" : ""}
            />${item.label}</label>`
      )
      .join(""),
    "</div>",
  ].join("");

  return { dom };
}

export default Radio;
