export interface VirtualListConfig<T extends string | HTMLElement = string> {
  w?: number | undefined;
  h: number;
  itemHeight: number;
  items: T[] | undefined;
  generatorFn?: ((index: number) => HTMLElement) | undefined;
  totalRows: number | undefined;
}
export interface VirtualList<T extends string | HTMLElement = string> {
  itemHeight: number;
  items: T[] | undefined;
  generatorFn?: ((index: number) => HTMLElement) | undefined;
  totalRows: number;
  container: HTMLDivElement;
  cachedItemsLen: number;
  _renderChunk: (this: VirtualList<T>, container: HTMLDivElement, count: number) => void;
  rmNodeInterval: number;
  createRow: (this: VirtualList<T>, index: number) => HTMLElement;
}