import { getRandomColor } from "./color";
import { stringToHash } from "../helpers/index";

export function generateGradient(seed: string, colorCount: number = 2): string {
  const hash = stringToHash(seed);
  const colors: string[] = [];

  for (let i = 0; i < colorCount; i++) {
    const colorSeed = (hash * (i + 1)).toString();
    colors.push(getRandomColor(colorSeed));
  }

  const colorStops = colors.map((color, index) => {
    const offset = Math.floor((index / (colorCount - 1)) * 100);
    return `${color} ${offset}%`;
  });

  return `linear-gradient(45deg, ${colorStops.join(", ")})`;
}
