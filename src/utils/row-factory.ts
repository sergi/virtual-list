import { VirtualListConfig } from '../types.js';
import { numberPx } from './number-px.js';

export const wrapCreateRow = (
  { createRow, itemHeight }: Pick<VirtualListConfig, 'itemHeight' | 'createRow'>
) => (i: number) => {
  const item = createRow(i);

  item.style.position = 'absolute';
  item.style.top = numberPx(i * itemHeight);
  return item;
};
