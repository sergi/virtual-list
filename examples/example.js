import {VirtualList} from "../dist/index.js";
var list = new VirtualList({
  h: window.innerHeight,
  itemHeight: 30,
  totalRows: 100000,
  generatorFn: function(row) {
    var el = document.createElement("div");
    el.innerHTML = "<p>ITEM " + row + "</p>";
    el.classList.add('vrow');
    return el;
  }
});

list.container.classList.add("container");
document.body.appendChild(list.container)