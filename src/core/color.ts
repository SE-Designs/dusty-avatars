import { colorSchemes } from "../const/colors";
import { stringToHash } from "../helpers/hash";

export function getRandomColor(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }

  const color = (hash >>> 0) % 0xffffff;

  return `#${color.toString(16).padStart(6, "0")}`;
}

export function getRandomColorFromPalette(
  hash: number,
  palette: string[],
): string {
  return String(palette[hash % palette.length]);
}

export function getRandomColorFromSchemes(name: string): string[] {
  const hash = stringToHash(name);
  const paletteIndex = hash % colorSchemes.length;
  return colorSchemes[paletteIndex] as string[];
}
