import { expect, use } from 'chai';
import spies from 'chai-spies';
const st = use(spies);

import { forEachInRange } from './for-each-in-range.js';

describe('forEachInRange function',()=>{
  it('accepts the count to be zero',()=>{
    const spy = st.spy();
    forEachInRange(0,0,spy);
    expect(spy).not.called();
  });
  it('does not accept the negative count',()=>{
    const spy = st.spy();
    expect(()=>forEachInRange(0,-1,spy)).to.throw();
  });
  it('does not accept the negative first',()=>{
    const spy = st.spy();
    expect(()=>forEachInRange(-1,0,spy)).to.throw();
  });
  it('calls callback count times',()=>{
    const spy = st.spy();
    const count = 3;
    forEachInRange(0,count,spy);
    expect(spy).to.be.nth(count).called();
  });
  it('calls callback with correct index',()=>{
    const spy:(i:number)=>void =st.spy();
    const count = 3;
    const first = 42;
    forEachInRange(first,count,spy);
    expect(spy).to.be.nth(count).called.with(first+count-1);
  });
});
