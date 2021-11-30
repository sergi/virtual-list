const initializeInlineStyles = (style:ElementCSSInlineStyle["style"])=>{
  style.opacity = '0';
  style.position = 'absolute';
  style.top = '0';
  style.left = '0';
  style.width = '1px';
  return style;
}
export const createScroller = (h:string) => {
  var scroller = document.createElement('div');
  initializeInlineStyles(scroller.style).height = h;
  return scroller;
}