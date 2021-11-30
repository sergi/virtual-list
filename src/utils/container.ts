import { VirtualListConfig } from "../types.js";
import { numberPx } from "./number-px.js";
import { createScroller } from "./scroller.js";

const styleContainer = (style:ElementCSSInlineStyle["style"])=>{
  style.overflow = 'auto';
  style.position = 'relative'; 
  style.padding = '0';
}
const createContainer =(container:HTMLElement)=>{
 styleContainer(container.style);
 container.innerHTML='';
}

export const initContainer = (config: Pick<VirtualListConfig,"container"| "itemHeight" | "totalRows">)=>{
  const { container } = config;
  createContainer(container);
  container.appendChild(
    createScroller(numberPx(config.itemHeight * config.totalRows)),
  );
  return container;
}