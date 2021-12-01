import { makeZeroIfNegative } from './final-item.js';

export const firstItem = (scrollTop: number, itemHeight: number, screenItemsLen: number)=>makeZeroIfNegative(Math.ceil(scrollTop / itemHeight) - screenItemsLen);
