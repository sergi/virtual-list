import { removeHiddenDebounced } from "./hide-all-except.js";

export const scrollHandlerFactory = (
  container:HTMLElement,  
  maxBuffer: number,
  onOverscroll: (scrollTop:number)=>void,
)=>{
  const bufferHeight = Number.isFinite(maxBuffer)?maxBuffer: container.clientHeight;
  console.log(container.clientHeight, maxBuffer);
  let lastRepaintY = 0;
  return ()=>{
  var scrollTop = container.scrollTop; // Triggers reflow
    if (Math.abs(scrollTop - lastRepaintY) > bufferHeight) {
      onOverscroll(scrollTop);
      lastRepaintY = scrollTop;
      removeHiddenDebounced();
    }
};
}