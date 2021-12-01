export interface VirtualListConfig {
  itemHeight: number;
  createRow: ((index: number) => HTMLElement);
  totalRows: number;
  container: HTMLElement;
}

export interface Rectangle {
  height: number;
  width: number;
}

export type Value<T> = T | (() => T);

type OnScreen = number & { pixels: never; };
type InPiece = number & { item: never; };
type Ordinal = number & { ordinal: never };

export const makeOnScreenUnits = (value: number) => value as OnScreen;
export const makeInPieces = (value: number) => value as InPiece;

export interface ClassRequest {
  index: Ordinal;
  highlighted: boolean;
}

export interface GridItemContext {
  column: ClassRequest;
  row: ClassRequest
}

export interface Classes {
  head: string | ((context:Pick<GridItemContext,'column'>) => string);
  row: string | ((context:Pick<GridItemContext,'row'>) => string);
  cell: string | ((context:GridItemContext) => string);
}

export interface Config {
  height: OnScreen;
  width: OnScreen;
  rows: InPiece;
  columns: InPiece;
  classes: Classes;
  caption:(td:HTMLTableCellElement, context:Pick<GridItemContext,'column'>)=>HTMLTableCellElement;
  label:(td:HTMLTableCellElement, context:Pick<GridItemContext,'row'>)=>HTMLTableCellElement;
  content:(td:HTMLTableCellElement, context:GridItemContext)=>HTMLTableCellElement;
  widths:Map<Ordinal,OnScreen>;
  heights: Map<Ordinal,OnScreen>;
}

