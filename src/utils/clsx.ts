import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * A utility function to merge Tailwind CSS classes with the clsx utility.
 */
export function cn(...args: ClassValue[]) {
  return twMerge(clsx(args));
}
