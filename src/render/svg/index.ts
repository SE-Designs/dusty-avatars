import { gradient } from "./styles/gradient";
import { pinxels } from "./styles/pinxels";
import { pixels } from "./styles/pixels";
import { smooth } from "./styles/smooth";

type AvatarGenerator = (name: string, size: number, colors: string[]) => string;

/**
 * Генерация аватара по стилю
 * @param name - строка для генерации сидов
 * @param size - размер аватара
 * @param style - стиль аватара
 * @param colors - опциональный массив цветов. Если не передан — выберется случайная палетка по name
 * @returns строка с SVG
 */
export const avatarStyles: Record<string, AvatarGenerator> = {
  gradient: gradient,
  pixels: pixels,
  smooth: smooth,
  pinxels: pinxels,
};
