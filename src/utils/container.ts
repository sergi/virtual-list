import { VirtualListConfig } from '../types.js';
import { SCROLLER_OTHER_SIZE } from './known.js';
import { createScroller } from './scroller.js';

const styleContainer = ({style}:ElementCSSInlineStyle)=>{
  style.overflow = 'auto';
  style.position = 'relative';
  style.padding = '0';
};
const createContainer =(container:HTMLElement)=>{
  styleContainer(container);
  container.innerHTML='';
};

export const initContainer = (config: Pick<VirtualListConfig,'container'| 'itemHeight' | 'totalRows'>)=>{
  const { container } = config;
  createContainer(container);
  container.appendChild(
    createScroller({height: config.itemHeight * config.totalRows, width:SCROLLER_OTHER_SIZE}),
  );
  return container;
};
