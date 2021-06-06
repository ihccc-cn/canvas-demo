import * as demo from "./demo";
import routes from "./routes";
import { Control } from "./_utils";

const root = document.getElementById("root");

Control.appendTo(root);

const name = window.location.pathname.split("/")[1];

if (!!name && demo.hasOwnProperty(name)) {
  root.innerHTML = `
  <h4 class="soft">
    <span id="title">canvas - demo</span>
    <a class="close" href="/">❌</a>
  </h4>
  <div class="card soft">
    <canvas id="canvas"></canvas>
  </div>
  `;
} else if (!name) {
  root.innerHTML = [
    '<h4 class="soft">导航</h4>',
    '<div class="card soft">',
    routes
      .map(
        (item) =>
          `<div class="menu-item">
            <a href='${item.path}'>${item.name || "未知名称"}</a>
          </div>`
      )
      .join(""),
    "</div>",
  ].join("");
} else {
  root.innerHTML = `<div class="card soft" style="padding:180px;">
    <b>404</b><br/>找不到此目录文件
  </div>`;
}

window.onload = function () {
  !!name && demo.hasOwnProperty(name) && demo[name].call();
};
