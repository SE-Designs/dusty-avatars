import { getRandomColorFromPalette } from "../../../core/index";
import { stringToHash } from "../../../helpers/hash";

/**
 * Генерация пиксельного аватара с зеркальной осью по центру.
 * @param name — строка для сидирования
 * @param size — размер аватара
 * @param colors — массив цветов для использования (передайте свою палитру)
 * @returns SVG-строка
 */
export function pinxels(
  name: string,
  size: number = 80,
  colors: string[],
): string {
  const hash = stringToHash(name);
  const gridSize = 8;
  const cellSize = size / gridSize;
  let svgContent = "";

  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize / 2; x++) {
      const cellHash = hash + x * y + x + y;
      const color = getRandomColorFromPalette(cellHash, colors);

      svgContent += `<rect x="${x * cellSize}" y="${y * cellSize}" width="${cellSize}" height="${cellSize}" fill="${color}" />`;
      // зеркальное отражение справа
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
