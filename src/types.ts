export interface VirtualListConfig {
  itemHeight: number;
  generatorFn: ((index: number) => HTMLElement);
  totalRows: number;
  container: HTMLElement;
}
