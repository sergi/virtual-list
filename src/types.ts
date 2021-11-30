export interface VirtualListConfig {
  width?: number | undefined;
  height: number;
  itemHeight: number;
  generatorFn: ((index: number) => HTMLElement);
  totalRows: number;
  container: HTMLElement;
}
