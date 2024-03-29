import * as demo from "./demo";
import routes from "./routes";
import { initStats, Control } from "./components";

initStats();

const root = document.getElementById("root");

Control.appendTo(root);

const name = window.location.pathname.split("/")[1].replace("-", "_");

function renderRouteItem(item) {
  return `<div class="menu-item"><a href='${item.path}'>${item.title || "未知名称"}</a></div>`;
}

if (!!name && demo.hasOwnProperty(name)) {
  root.innerHTML = `
  <h4 class="soft">
    <span id="title">canvas - demo</span>
    <a class="bar-btn" href="/" title="退出">❌</a>
  </h4>
  <div id="panel" class="card soft">
    <canvas id="canvas"></canvas>
  </div>
  `;
} else if (!name) {
  root.innerHTML = [
    '<h4 class="soft">导航</h4>',
    '<div class="card soft">',
    routes
      .map((item) => {
        if (typeof item === "string") {
          const [title, path] = item.split(":");
          return renderRouteItem({ title, path });
        }
        return renderRouteItem(item);
      })
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
