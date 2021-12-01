import { calculateChunkLength } from './final-item.js';
import { forEachInRange } from './for-each-in-range.js';
import { hideAllButFirst } from './hide-all-except.js';
import {VirtualListConfig} from '../types.js';
import { wrapCreateRow } from './row-factory.js';
import { CACHE_RESERVE } from './known.js';

export const renderChunkFactory = (
  config:Pick<VirtualListConfig,'container'|'totalRows'|'itemHeight'|'createRow'>,
  screenItemsLen: number
)=> {
  const adapterCreateRow = wrapCreateRow(config);
  const cachedItemsLen = screenItemsLen * CACHE_RESERVE;
  const {container, totalRows} = config;
  return (from: number) =>{
    hideAllButFirst(container.children);

    const fragment = document.createDocumentFragment();
    forEachInRange(
      from,
      calculateChunkLength(from, cachedItemsLen, totalRows),
      (index) => fragment.appendChild(adapterCreateRow(index)),
    );
    container.appendChild(fragment);
  };
};
