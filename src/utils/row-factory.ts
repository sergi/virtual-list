import { numberPx } from "./number-px.js";

export const createRowFactory = (
  generatorFn:(index:number)=>HTMLElement,
  itemHeight: number,
)=> (i: number) =>{
  var item = generatorFn(i);

  item.style.position = 'absolute';
  item.style.top = numberPx(i * itemHeight);
  return item;
};