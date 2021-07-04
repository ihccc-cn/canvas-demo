import { Control } from "../../components";

const { Radio, Silder, Color, Group } = Control;

function getControlPanel() {
  return new Control([
    Group("线参数", [
      Radio({
        label: "索引：",
        name: "index",
        options: [
          { label: "圆1", value: "0" },
          { label: "圆2", value: "1" },
          { label: "圆3", value: "2" },
          { label: "圆4", value: "3" },
        ],
      }),
      Silder({
        label: "线宽：",
        name: "w",
        min: 1,
        max: 20,
      }),
      Color({
        label: "颜色：",
        name: "color",
      }),
      Silder({
        label: "阴影扩散：",
        name: "blur",
        min: 0,
        max: 128,
      }),
      Color({
        label: "阴影颜色：",
        name: "sc",
      }),
    ]),
  ]);
}

export default getControlPanel;
