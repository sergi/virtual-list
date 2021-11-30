export const forEachInRange = (first:number, count: number, action:(index:number)=>void)=>{
  const beforeLast = first + count;
  for(let index = first; index<beforeLast;++index){
    action(index);
  }
}