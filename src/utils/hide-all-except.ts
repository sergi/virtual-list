import { DATA_RM_ATTRIBUTE, DATA_RM_SELECTOR, DATA_RM_VALUE, FIRST_IS_THE_SCROLLER } from "./known.js";
import { hasInlineStyle } from "./discriminators.js";
import { forEachInRange } from "./for-each-in-range.js";
import { debounce } from "./debounce.js";

const hideItem = (element: Element) => {
  if (!hasInlineStyle(element)) {
    return;
  }
  element.style.display = 'none';
  element.setAttribute(DATA_RM_ATTRIBUTE, DATA_RM_VALUE);
}

export const hideAllButFirst = (children: HTMLCollection) => forEachInRange(
  FIRST_IS_THE_SCROLLER,
  children.length - FIRST_IS_THE_SCROLLER,
  (index) => hideItem(children[index]),
);

const removeHiddenItems = ()=>{
  var badNodes = [...document.querySelectorAll(DATA_RM_SELECTOR)];
    badNodes.forEach((item)=>item.remove())
}

export const removeHiddenDebounced = debounce(removeHiddenItems,300);