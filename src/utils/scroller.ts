import { numberPx } from './number-px.js';

interface Rectangle {
  height: number;
  width: number;
}

const initializeInlineStyles = ({style}:ElementCSSInlineStyle, {height,width}:Rectangle)=>{
  style.opacity = '0';
  style.position = 'absolute';
  style.top = '0';
  style.left = '0';
  style.width = numberPx(width);
  style.height = numberPx(height);
  return style;
};
export const createScroller = (rectangle:Rectangle) => {
  const scroller = document.createElement('div');
  initializeInlineStyles(scroller,rectangle);
  return scroller;
};
