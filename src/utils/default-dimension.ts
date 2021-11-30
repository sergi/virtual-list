import { numberPx } from "./number-px.js";

export const defaultDimension = <T extends string | number | symbol>(property: T, config: Partial<Record<T, number>> | undefined, defValue = '100%') => {
  if (typeof config === "undefined") {
    return defValue;
  }
  const value = config[property];
  if (typeof value === "undefined") {
    return defValue;
  }
  return numberPx(value)
}