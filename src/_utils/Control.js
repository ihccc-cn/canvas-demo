function Radio(opts) {
  const { label, name, value, options } = opts;

  const dom = [
    "<div class='field-item'>",
    label ? `<span>${label}</span>` : "",
    options
      .map(
        (item) =>
          `<label class='field-wrapper'><input class='input' type='radio' name='${name}' value='${
            item.value
          }' ${value === item.value ? "checked" : ""}/>${item.label}</label>`
      )
      .join(""),
    "</div>",
  ].join("");

  return { dom };
}

function Silder(opts) {
  const { label, name, value = 0, min = 0, max = 10, step = 1 } = opts;

  let val = value;

  function setValue(v) {
    val = v;
  }

  const dom = [
    "<div class='field-item'>",
    label ? `<span>${label}</span>` : "",
    "<label class='field-wrapper full'>",
    `<input class='input' type='range' name='${name}' value='${val}' min='${min}' max='${max}' step='${step}'/><b>${val}</b>`,
    "</label>",
    "</div>",
  ].join("");

  return { dom, setValue };
}

function Group(title, components) {
  const dom = [
    "<div class='field-group soft inset' style=''>",
    components.map((item) => item.dom).join(""),
    "</div>",
  ].join("");
  return { title, dom };
}

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

function appendTo(target) {
  Control.target = target;
}

class Control {
  static target = null;
  static Content = Content;
  static Group = Group;
  static Radio = Radio;
  static Silder = Silder;
  static appendTo = appendTo;
  constructor(components) {
    this.components = components.filter(
      (item) => typeof item === "object" && typeof item.dom === "string"
    );
    this.active = 0;

    this.changeCallback = null;
    this.render();
  }

  onChange(func) {
    if (typeof func === "function") {
      this.changeCallback = func;
    }
  }

  forEach(arr, callback) {
    for (let i = 0; i < arr.length; i++) callback(arr[i], i, arr);
  }

  renderGroupTitle = (item, index) =>
    `<div class='field-group-title ${index === 0 ? "active soft inset" : ""}'>${item.title}</div>`;

  render() {
    const _this = this;

    const signle = this.components.filter((item) => !item.title);
    const group = this.components.filter((item) => !!item.title);

    const controlsDom = [
      signle.map((item) => item.dom).join(""),
      '<div class="field-group-head">',
      group.map(_this.renderGroupTitle).join(""),
      "</div>",
      group
        .map((item, index) => {
          if (index === 0) return item.dom;
          return item.dom.replace("style=''", "style='display: none;'");
        })
        .join(""),
    ].join("");

    const container = document.createElement("div");
    container.setAttribute("class", "card soft");
    container.innerHTML = controlsDom;
    Control.target.appendChild(container);

    // 给 input 绑定事件
    const fields = container.getElementsByTagName("input");

    _this.forEach(fields, function (item) {
      item.onchange = function (e) {
        _this.changeCallback(e.target.name, e.target.value);
        e.target.nextSibling.innerText = e.target.value;
      };
    });

    const groupTitle = container.getElementsByClassName("field-group-title");
    const groupBody = container.getElementsByClassName("field-group");

    _this.forEach(groupTitle, function (item, index) {
      item.onclick = function () {
        if (_this.active === index) return;
        groupTitle[_this.active].className = "field-group-title";
        groupTitle[index].className = "field-group-title active soft inset";
        groupBody[_this.active].style.setProperty("display", "none");
        groupBody[index].style.setProperty("display", "block");
        _this.active = index;
      };
    });
  }
}

export default Control;
