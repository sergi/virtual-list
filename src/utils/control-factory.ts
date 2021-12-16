export const createDocumentFragment = () => document.createDocumentFragment();
export const querySelectorAll = (selector:string) => document.querySelectorAll(selector);
export const createElement=<K extends keyof HTMLElementTagNameMap>(tagName: K, options?: ElementCreationOptions)=>document.createElement(tagName, options);
export const createTextNode = (text:string) => document.createTextNode(text);
