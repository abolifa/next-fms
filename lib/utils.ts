import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatToLiters(value: number) {
  const liters = value / 1000;
  return liters.toLocaleString("ar-LY", { minimumFractionDigits: 2 }) + " لتر";
}
