import { m } from "../../_utils";

const commonProps = {};

const ripples = [
  {
    ...commonProps,
    a: 5,
    w: 3,
    k: 60,
  },
];

while (ripples.length < 10) {
  ripples.push({
    ...commonProps,
    a: ripples[ripples.length - 1].a + 10,
    w: 3,
    k: 60,
  });
}

export default ripples;
