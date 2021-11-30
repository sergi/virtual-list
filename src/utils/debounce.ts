export const debounce = (action: (...args: unknown[]) => void, coolDownDuration: number) => {
  let timerId = 0;
  return function (this:unknown, ...args1: unknown[]) {
    window.clearTimeout(timerId);
    const context = this;
    timerId = window.setTimeout(
      (...args2: unknown[]) => {
        action.call(context, args2)
      },
      coolDownDuration,
      ...args1
    );
  };
}