import { stringToHash } from "../../../helpers/hash";
import { getRandomColorFromPalette } from "../../../core/index";

/**
 * Генерация пиксельного аватара в стиле GitHub icons (5x5)
 * @param name — строка для сидирования
 * @param size — размер аватара
 * @param colors — палитра цветов для использования
 * @returns SVG-строка
 */
export function pixels(
  name: string,
  size: number = 80,
  colors: string[],
): string {
  const hash = stringToHash(name);
  const gridSize = 5;
  const cellSize = size / gridSize;
  let svgContent = "";

  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < Math.ceil(gridSize / 2); x++) {
      const cellHash = Math.abs(
        Math.imul(hash, (x + 1) * 31) ^ Math.imul(hash, (y + 1) * 73),
      );

      const color = getRandomColorFromPalette(cellHash, colors);

      svgContent += `<rect x="${x * cellSize}" y="${y * cellSize}" width="${cellSize}" height="${cellSize}" fill="${color}" />`;
      svgContent += `<rect x="${(gridSize - 1 - x) * cellSize}" y="${y * cellSize}" width="${cellSize}" height="${cellSize}" fill="${color}" />`;
    }
  }

  return `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${size}" height="${size}" rx="${size / 5}" fill="#fff"/>
      ${svgContent}
    </svg>
  `;
}
