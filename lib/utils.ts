import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function saveAccessibilifySetting(
  name:
    | "colorBlind"
    | "lowVision"
    | "saturationStatus"
    | "saturation"
    | "boldText",
  value: string
) {
  try {
    const settings = localStorage.getItem("accessibilitySettings");

    // if settings is not set, set it to an empty object
    if (!settings) {
      localStorage.setItem("accessibilitySettings", JSON.stringify({}));
    }

    // if not object or empty object, set it to an empty object
    if (settings && JSON.parse(settings) === null) {
      localStorage.setItem("accessibilitySettings", JSON.stringify({}));
    }

    localStorage.setItem(
      "accessibilitySettings",
      JSON.stringify({ ...JSON.parse(settings || "{}"), [name]: value })
    );
  } catch (e) {
    localStorage.removeItem("accessibilitySettings");
  }
}

export function getAccessibilifySettings(name?: string) {
  try {
    if (name) {
      const settings = localStorage.getItem("accessibilitySettings");
      return settings ? JSON.parse(settings)[name] : {};
    }

    const settings = localStorage.getItem("accessibilitySettings");
    return settings ? JSON.parse(settings) : {};
  } catch (error) {
    localStorage.removeItem("accessibilitySettings");
    return {};
  }
}
