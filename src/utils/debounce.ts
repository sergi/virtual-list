export const debounce = (action: (...args: unknown[]) => void, coolDownDuration: number) => {
  let timerId = 0;
  return function (this:unknown, ...args1: unknown[]) {
    window.clearTimeout(timerId);
    timerId = window.setTimeout(
      (...args2: unknown[]) => {
        action.call(this, args2);
      },
      coolDownDuration,
      ...args1
    );
  };
};
