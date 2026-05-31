import {
  BrickWall,
  Car,
  CarFront,
  Flame,
  Hammer,
  Palette,
  Snowflake,
  type LucideIcon,
  Wrench,
  Zap,
} from "lucide-react";

import type { CategoryIcon } from "@/types/category";

export const categoryIconMap: Record<CategoryIcon, LucideIcon> = {
  wrench: Wrench,
  zap: Zap,
  hammer: Hammer,
  snowflake: Snowflake,
  car: Car,
  "car-front": CarFront,
  palette: Palette,
  flame: Flame,
  "brick-wall": BrickWall,
};

export function getCategoryIcon(icon: any): LucideIcon {
  if (icon && icon in categoryIconMap) {
    return categoryIconMap[icon as CategoryIcon];
  }
  return Wrench;
}
