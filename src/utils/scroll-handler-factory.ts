import { removeHiddenDebounced } from "./hide-all-except.js";

export const scrollHandlerFactory = (
  container: HTMLElement,
  onOverscroll: (scrollTop: number) => void,
) => {
  const bufferHeight = container.clientHeight;
  let lastRepaintY = 0;
  return () => {
    var scrollTop = container.scrollTop; // Triggers reflow
    if (Math.abs(scrollTop - lastRepaintY) > bufferHeight) {
      onOverscroll(scrollTop);
      lastRepaintY = scrollTop;
      removeHiddenDebounced();
    }
  };
}