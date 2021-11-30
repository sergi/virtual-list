export interface VirtualListConfig {
  width?: number | undefined;
  height: number;
  itemHeight: number;
  generatorFn: ((index: number) => HTMLElement);
  totalRows: number | undefined;
}
export interface VirtualList {
  itemHeight: number;
  generatorFn: ((index: number) => HTMLElement);
  totalRows: number;
  container: HTMLDivElement;
  cachedItemsLen: number;
  _renderChunk: (this: VirtualList, count: number) => void;
  rmNodeInterval: number;
  createRow: (this: VirtualList, index: number) => HTMLElement;
}