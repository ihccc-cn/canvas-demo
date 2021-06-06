function Radio(opts) {
  const { label, name, defaultValue, options } = opts;

  const dom = [
    "<div class='field-group'>",
    `<span>${label}</span>`,
    options
      .map(
        (item) =>
          `<label class='field-item'><input class='input' type='radio' name='${name}' value='${item.value}'/>${item.label}</label>`
      )
      .join(""),
    "</div>",
  ].join("");

  return { dom };
}

function Silder(opts) {
  const { label, name, defaultValue = 0 } = opts;

  let value = defaultValue;

  function change(node) {
    console.log(node);
  }

  const dom = [
    "<div class='field-group'>",
    `<span>${label}</span>`,
    "<label class='field-item'>",
    `<input class='input' type='range' name='${name}' value='${value}' /> ${value}`,
    "</label>",
    "</div>",
  ].join("");

  return { dom };
}

function Group(title, components) {}

function appendTo(target) {
  Control.target = target;
}

class Control {
  static target = null;
  static Group = Group;
  static Radio = Radio;
  static Silder = Silder;
  static appendTo = appendTo;
  constructor(components) {
    this.componentsDom = components.map((item) => item.dom).join("");

    this.changeCallback = null;
    this.render();
  }

  onChange(func) {
    if (typeof func === "function") {
      this.changeCallback = func;
    }
  }

  render() {
    console.log(this);

    const container = document.createElement("div");
    container.setAttribute("class", "card soft");
    container.innerHTML = this.componentsDom;
    Control.target.appendChild(container);
  }
}

export default Control;
