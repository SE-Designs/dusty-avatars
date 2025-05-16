import { getRandomColorFromSchemes } from "../../core/index";
import { avatarStyles } from "./index";

export type AvatarStyle = keyof typeof avatarStyles;

/**
 * Генерирует SVG-аватар по заданному стилю
 * @param name - строка для генерации сидов
 * @param size - размер аватара
 * @param style - стиль аватара
 * @param colors - опциональный массив цветов. Если не передан — выберется случайная палетка по name
 * @returns строка с SVG
 */
export function avatar(
  name: string,
  size: number = 80,
  style: AvatarStyle = "gradient",
  colors?: string[],
): string {
  const palette = colors ?? getRandomColorFromSchemes(name);
  const generator = avatarStyles[style];

  if (!generator) {
    throw new Error(`Avatar style "${style}" not found`);
  }

  return generator(name, size, palette);
}
