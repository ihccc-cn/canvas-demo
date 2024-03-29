import Content from "./Content";
import Group from "./Group";
import Input from "./Input";
import Color from "./Color";
import Radio from "./Radio";
import Silder from "./Silder";
import "./control.css";

function appendTo(target) {
  Control.target = target;
}

function forEach(arr, callback) {
  for (let i = 0; i < arr.length; i++) callback(arr[i], i, arr);
}

class Control {
  static target = null;
  static Content = Content;
  static Group = Group;
  static Input = Input;
  static Color = Color;
  static Radio = Radio;
  static Silder = Silder;
  static appendTo = appendTo;
  constructor(components) {
    const correctDom = components.filter(
      (item) => typeof item === "object" && typeof item.dom === "string"
    );

    this.signle = correctDom.filter((item) => !item.title);
    this.group = correctDom.filter((item) => !!item.title);

    this.container = null;
    this.fields = [];

    this.active = 0;

    this.changeCallback = null;
    this.render();
  }

  setValue(values) {
    if (this.fields.length === 0) return;

    forEach(this.fields, function (item) {
      if (item.name in values && values[item.name] !== null) {
        if (item.type === "radio") {
          item.checked = item.value === values[item.name];
        } else {
          item.value = values[item.name];
        }

        if (item.type === "range") {
          item.nextSibling.innerText = item.value;
        }
      }
    });

    return this;
  }

  onChange(func) {
    if (typeof func === "function") {
      this.changeCallback = func;
    }
  }

  renderGroupTitle = (item, index) =>
    `<div class='field-group-title ${index === 0 ? "active soft inset" : ""}'>${item.title}</div>`;

  render() {
    const controlsDom = [
      this.signle.map((item) => item.dom).join(""),
      '<div class="field-group-head">',
      this.group.map(this.renderGroupTitle).join(""),
      "</div>",
      this.group
        .map((item, index) => {
          if (index === 0) return item.dom;
          return item.dom.replace("style=''", "style='display: none;'");
        })
        .join(""),
    ].join("");

    this.container = document.createElement("div");
    this.container.setAttribute("class", "card soft");
    this.container.innerHTML = controlsDom;
    Control.target.appendChild(this.container);

    this.fields = this.container.getElementsByTagName("input");

    this.addEvent();
  }

  addEvent() {
    const _this = this;
    // 给 input 绑定事件
    forEach(this.fields, function (item) {
      item.onchange = function (e) {
        _this.changeCallback(e.target.name, e.target.value);
        if (e.target.type === "range") {
          e.target.nextSibling.innerText = e.target.value;
        }
      };
    });

    const groupTitle = this.container.getElementsByClassName("field-group-title");
    const groupBody = this.container.getElementsByClassName("field-group");

    forEach(groupTitle, function (item, index) {
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
