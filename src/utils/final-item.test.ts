import { expect } from 'chai';
import {calculateChunkLength} from './final-item.js';
describe('calculateChunkLength function',()=>{
  it('returns zero when the from is greater than the total',()=>{
    expect(calculateChunkLength(100,1,1)).to.be.eq(0);
  });
  it('returns cacheSize when the from is too small compare to the total',()=>{
    const from = 0;
    const cacheSize = 10;
    const total = 1000;
    expect(calculateChunkLength(from,cacheSize,total)).eq(cacheSize);
  });
});
