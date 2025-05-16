import { stringToHash } from "../../../helpers/index";
import { getRandomColor } from "../../../core/index";

/**
 * Генерирует аватар с мягкими пятнами-градиентами без фонового цвета
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
  const blobCount = 5;

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
      const cx = 10 + ((hash * (i + 5)) % 80); // от 10 до 90%
      const cy = 10 + ((hash * (i + 7)) % 80);
      const r = 25 + ((hash * (i + 11)) % 35); // радиус от 25 до 60
      const opacity = 0.6 + ((hash * (i + 13)) % 30) / 100; // от 0.6 до 0.9
      return `
        <circle cx="${cx}%" cy="${cy}%" r="${r}%" fill="${color}" fill-opacity="${opacity}" />
      `;
    })
    .join("");

  // Финальный SVG без фонового прямоугольника
  return `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="blur-${hash}" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="${size / 5}" result="blur" />
        </filter>
      </defs>
      <g filter="url(#blur-${hash})">
        ${blobs}
      </g>
    </svg>
  `;
}
