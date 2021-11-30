import { FIRST_IS_THE_SCROLLER } from "./known.js";
import { hasInlineStyle } from "./discriminators.js";
import { forEachInRange } from "./for-each-in-range.js";

const hideItem = (element: Element) => {
  if (!hasInlineStyle(element)) {
    return;
  }
  element.style.display = 'none';
  element.setAttribute('data-rm', '1');
}

export const hideAllButFirst = (children: HTMLCollection) => forEachInRange(
  FIRST_IS_THE_SCROLLER,
  children.length - FIRST_IS_THE_SCROLLER,
  (index) => hideItem(children[index]),
);
