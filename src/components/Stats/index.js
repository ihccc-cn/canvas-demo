import Stats from "stats.js";

export let stats = null;

function initStats() {
  stats = new Stats();
  stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
  document.body.appendChild(stats.dom);
}

export default initStats;
