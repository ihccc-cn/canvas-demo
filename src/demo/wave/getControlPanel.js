import { Control } from "../../_utils";

const { Radio, Silder, Group } = Control;

function getControlPanel() {
  return new Control([
    Radio({
      label: "函数：",
      name: "method",
      options: [
        { label: "y=Asin(ωx+φ)+k", value: "sin" },
        { label: "y=Acos(ωx+φ)+k", value: "cos" },
      ],
    }),
    Group("调整参数", [
      Silder({
        label: "A：",
        name: "a",
      }),
      Silder({
        label: "ω：",
        name: "w",
        min: -4,
        max: 4,
        step: 0.1,
      }),
      Silder({
        label: "φ（π）：",
        name: "d",
        min: -4,
        max: 4,
        step: 0.5,
      }),
      Silder({
        label: "k：",
        name: "k",
        min: -10,
      }),
    ]),
    Group("x 取值范围", [
      Silder({
        label: "左值(π)：",
        name: "x0",
        min: -10,
        max: 0,
        step: 0.5,
      }),
      Silder({
        label: "右值(π)：",
        name: "x1",
        min: 0,
        max: 10,
        step: 0.5,
      }),
    ]),
    Group("坐标系", [
      Silder({
        label: "X 轴比例：",
        name: "zoom_x",
        min: 1,
        max: 100,
      }),
      Silder({
        label: "Y 轴比例：",
        name: "zoom_y",
        min: 1,
        max: 100,
      }),
    ]),
  ]);
}

export default getControlPanel;
