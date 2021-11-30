import { numberPx } from "./number-px.js";

export const createDefaultItem = (text: string, itemHeight: number) => {
  const itemText = document.createTextNode(text);
  const item = document.createElement('div');
  item.style.height = numberPx(itemHeight);
  item.appendChild(itemText);
  return item;
}