import { stringToHash } from "../../../helpers/index";
import { getRandomColor } from "../../../core/index";

/**
 * Генерирует аватар с концентрическими градиентными кольцами и бликами
 * @param name - строка для сидирования
 * @param size - размер аватара в пикселях
 * @param colors - массив из 3-5 цветов (если не переданы — сгенерируем)
 * @returns SVG-строка
 */
export function smooth(
  name: string,
  size: number = 120,
  colors?: string[],
): string {
  const hash = Math.abs(stringToHash(name));
  const ringCount = 4;

  const finalColors: string[] =
    colors && colors.length >= ringCount
      ? colors.slice(0, ringCount)
      : Array.from({ length: ringCount }).map((_, i) =>
          getRandomColor((hash * (i + 9)).toString()),
        );

  // Кольца с разными радиусами и цветами
  const ringsSvg = finalColors
    .map((color, i) => {
      const r = (30 + ((hash * (i + 5)) % 30)) * (size / 100); // радиус в пикселях
      const opacity = 0.3 + ((hash * (i + 11)) % 50) / 100; // от 0.3 до 0.8
      return `<circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="${color}" fill-opacity="${opacity}" />`;
    })
    .join("\n");

  return `
  <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="blur-${hash}" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="${size / 6}" result="blur" />
      </filter>
    </defs>
    <rect width="${size}" height="${size}" rx="${size / 2}" fill="#111" />
    <g filter="url(#blur-${hash})">
      ${ringsSvg}
    </g>
  </svg>
  `.trim();
}
