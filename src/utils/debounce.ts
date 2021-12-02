export const debounce = <O, P extends unknown[]>(action: (this:O, ...args: P) => void, coolDownDuration: number):typeof action => {
  let timerId = 0;
  return function (this:O, ...args1:P) {
    window.clearTimeout(timerId);
    timerId = window.setTimeout(
      (...args2: P) => {
        action.call(this, ...args2);
      },
      coolDownDuration,
      ...args1
    );
  };
};
