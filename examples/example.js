import {virtualList} from "../dist/index.js";
const container = document.querySelector(".container");
const unmount = virtualList({
  container,
  itemHeight: 30,
  totalRows: 100000,
  createRow: function(row) {
    const el = document.createElement("div");
    const p = document.createElement("p");
    p.innerText = `row item: ${row}`;
    el.appendChild(p);
    el.classList.add('vrow');
    return el;
  }
});

