const initializeColumnHead = (th:HTMLTableCellElement,index:number)=>{
  const text = document.createTextNode(`column ${index}`);
  th.appendChild(text);
  return th;
};
const initializeTableHeadRow = (tr:HTMLTableRowElement, columns:number)=>Array.from({length:columns},(_,index)=>initializeColumnHead(document.createElement('th'), index)).reduce((a,b)=>{tr.appendChild(b);return a;}, tr);
const initializeHead = (head:HTMLTableSectionElement, columns:number)=>{
  head.appendChild(initializeTableHeadRow(document.createElement('tr'), columns));
  return head;
};

const initializeDataCell = (td:HTMLTableCellElement, row:number, column:number):HTMLTableCellElement=>{

  const text = document.createTextNode(`row ${row}, col:${column}`);
  td.appendChild(text);
  return td;
};

const initializeBodyRow = (tr:HTMLTableRowElement, index:number, columns:number):HTMLTableRowElement=>Array.from({length:columns},(_,column)=>initializeDataCell(document.createElement('td'),index, column)).reduce((a,b)=>{a.appendChild(b);return a;}, tr);

const initializeTableBody = (body:HTMLTableSectionElement, rows:number, columns:number)=> Array.from({length:rows}, (_, index)=>initializeBodyRow(document.createElement('tr'),index, columns)).reduce((a,b)=>{ a.appendChild(b); return a;},body);

const initializeEmptyTable = (table:HTMLTableElement, rows:number, columns:number)=>{
  table.appendChild(initializeHead(document.createElement('thead'), columns));
  table.appendChild(initializeTableBody(document.createElement('tbody'), rows, columns));
  return table;
};

export const createEmptyTable = (rows: number, columns: number) => initializeEmptyTable(
  document.createElement('table'),
  rows,
  columns
);
