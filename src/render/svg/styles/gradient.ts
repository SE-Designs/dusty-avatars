import { stringToHash } from "../../../helpers/index";
import { getRandomColor } from "../../../core/index";

/**
 * Генерирует аватар с мягкими градиентными пятнами как на Dribbble
 * @param name - строка для сидирования
 * @param size - размер аватара в пикселях
 * @param colors - массив из 3-5 цветов (если не переданы — сгенерируем)
 * @returns SVG-строка
 */
export function gradient(
  name: string,
  size: number = 80,
  colors?: string[],
): string {
  const hash = Math.abs(stringToHash(name));
  const blobCount = 4;

  // Если colors не переданы — генерируем нужное количество цветов
  const finalColors: string[] =
    colors && colors.length >= blobCount
      ? colors.slice(0, blobCount)
      : Array.from({ length: blobCount }).map((_, i) =>
          getRandomColor((hash * (i + 3)).toString()),
        );

  // Генерация кругов
  const blobs = finalColors
    .map((color, i) => {
      const cx = 30 + ((hash * (i + 5)) % 40); // от 30 до 70%
      const cy = 30 + ((hash * (i + 7)) % 40);
      const r = 30 + ((hash * (i + 11)) % 20); // радиус от 30 до 50
      return `
        <circle cx="${cx}%" cy="${cy}%" r="${r}%" fill="${color}" fill-opacity="0.9" />
      `;
    })
    .join("");

  // Финальный SVG
  return `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="blur-${hash}" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="${size / 8}" result="blur" />
        </filter>
      </defs>
      <rect width="${size}" height="${size}" rx="${size / 2}" fill="#fff"/>
      <g filter="url(#blur-${hash})">
        ${blobs}
      </g>
      <rect width="${size}" height="${size}" rx="${size / 2}" fill="transparent" stroke="none"/>
    </svg>
  `;
}
