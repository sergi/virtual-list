export interface VirtualListConfig<T extends string | HTMLElement = string>{
  w:number;
  h:number;
  itemHeight: number;
  items: T[];
  generatorFn: (index:number)=>HTMLElement;
  totalRows: number|undefined;
}
export interface VirtualList<T extends string | HTMLElement = string>{
  itemHeight:number;
  items: T[];
  generatorFn: (index:number)=>HTMLElement;
  totalRows: number;
  container: HTMLDivElement;
  cachedItemsLen: number;
  _renderChunk: (this: VirtualList<T>, container: HTMLDivElement, count: number)=>void;
  rmNodeInterval: number;
  createRow: (this: VirtualList<T>, index: number)=> HTMLElement;
}