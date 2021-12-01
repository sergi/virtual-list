import { expect } from 'chai';
import { firstItem } from './first-item.js';

describe('firstItem function', () => {
  it('returns zero on scrollTop zero', () => {
    expect(firstItem(0, 100, 100)).to.be.eq(0);
  });
  it('returns one page less number of items', () => {
    const scrollTop = 1100;
    const itemHeight = 100;
    const itemsPerPage = 5;
    const firstItemToRender = 6;
    expect(firstItem(scrollTop, itemHeight, itemsPerPage)).to.be.eq(firstItemToRender);
  });
});
