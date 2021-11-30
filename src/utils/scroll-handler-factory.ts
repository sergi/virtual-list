import { removeHiddenDebounced } from "./hide-all-except.js";

export const scrollHandlerFactory = (
  container:HTMLElement,  
  maxBuffer: number,
  onOverscroll: (scrollTop:number)=>void,
)=>{
  let lastRepaintY = 0;
  return ()=>{
  var scrollTop = container.scrollTop; // Triggers reflow
    if (Math.abs(scrollTop - lastRepaintY) > maxBuffer) {
      onOverscroll(scrollTop);
      lastRepaintY = scrollTop;
      removeHiddenDebounced();
    }
};
}