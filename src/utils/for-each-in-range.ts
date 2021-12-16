export const forEachInRange = (first:number, count: number, action:(index:number)=>void)=>{
  if(count <0){
    throw new Error('invalid argument count');
  }
  if(first <0){
    throw new Error('invalid argument first');
  }
  const beforeLast = first + count;
  for(let index = first; index<beforeLast;++index){
    action(index);
  }
};
