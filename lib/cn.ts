import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Takes multiple inputs and returns the merged class names using the clsx and twMerge functions.
 *
 * @param {...*} inputs - The inputs to merge into class names.
 * @return {string} - The merged class names.
 */
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));