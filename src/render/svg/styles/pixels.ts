import { stringToHash } from "../../../helpers/index";
import { getRandomColor } from "../../../core/index";

/**
 * Генерирует пиксель-арт аватар в виде SVG
 * @param name - имя или строка для генерации сидов
 * @param size - размер аватара (по умолчанию 80)
 * @returns строка с SVG
 */
export function pixels(name: string, size: number = 80): string {
  const hash = stringToHash(name);
  const gridSize = 8;
  const cellSize = size / gridSize;
  let svgContent = "";

  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      const cellHash = (hash + x * y + x + y).toString();
      const color = getRandomColor(cellHash);
      svgContent += `<rect x="${x * cellSize}" y="${y * cellSize}" width="${cellSize}" height="${cellSize}" fill="${color}" />`;
    }
  }

  return `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${size}" height="${size}" rx="${size / 5}" fill="#fff"/>
      ${svgContent}
    </svg>
  `;
}
