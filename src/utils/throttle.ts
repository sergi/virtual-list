
export const throttle = <O,P extends unknown[]>(action:(this:O, ...args:P)=>void, interval:number):typeof action => {
  let last = 0;
  let timerId = 0;

  return function(this, ...args) {
    clearTimeout(timerId);
    timerId = 0;
    const now = new Date().valueOf();
    const actor = ()=>{
      last = new Date().valueOf();
      return action.call(this, ...args);
    };
    if (now > last + interval) {
      return actor();
    }
    timerId = window.setTimeout(actor, interval);
    return undefined;

  };
};
