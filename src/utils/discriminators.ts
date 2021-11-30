export const hasScrollTop = (target: EventTarget | null): target is EventTarget & Pick<Element,"scrollTop"> =>(
  target !== null&& "scrollTop" in target
);

export const hasInlineStyle = (target: Element|null): target is Element & ElementCSSInlineStyle => (
  target !==null && "style" in target
);