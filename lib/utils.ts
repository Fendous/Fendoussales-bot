import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function delay(
  delay: number,
  log_message?: string
): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(log_message);
      resolve();
    }, delay);
  });
}
