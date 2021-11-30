export const hasInlineStyle = (target: Element|null): target is Element & ElementCSSInlineStyle => (
  target !==null && "style" in target
);