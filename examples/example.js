import {VirtualList} from "../dist/index.js";
var list = new VirtualList({
  h: window.innerHeight,
  height: window.innerHeight,
  itemHeight: 30,
  totalRows: 100000,
  generatorFn: function(row) {
    const el = document.createElement("div");
    const p = document.createElement("p");
    p.innerText = `row item: ${row}`;
    el.appendChild(p);
    el.classList.add('vrow');
    return el;
  }
});

list.container.classList.add("container");
document.body.appendChild(list.container)