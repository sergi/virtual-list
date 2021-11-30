import { calculateChunkLength } from "./final-item.js";
import { forEachInRange } from "./for-each-in-range.js";
import { hideAllButFirst } from "./hide-all-except.js";

export const renderChunkFactory = (
  container: HTMLElement,
  cachedItemsLen: number,
  totalRows: number,
  createRow: (index:number)=> HTMLElement,
)=> (from: number) =>{
  hideAllButFirst(container.children);

  const fragment = document.createDocumentFragment();
  forEachInRange(
    from,
    calculateChunkLength(from, cachedItemsLen, totalRows),
    (index) => fragment.appendChild(createRow(index)),
  );
  container.appendChild(fragment);
};