export interface VirtualListConfig {
  itemHeight: number;
  createRow: ((index: number) => HTMLElement);
  totalRows: number;
  container: HTMLElement;
}
