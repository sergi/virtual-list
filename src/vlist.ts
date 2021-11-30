import { VirtualList, VirtualListConfig } from "./types.js"
import { createContainer } from "./utils/container.js";
import { defaultDimension } from "./utils/default-dimension.js";
import { createDefaultItem } from "./utils/default-item.js";
import { hasInlineStyle, hasScrollTop } from "./utils/discriminators.js";
import { calculateFinalItemIndex } from "./utils/final-item.js";
import { numberPx } from "./utils/number-px.js";
import { createScroller } from "./utils/scroller.js";
/**
 * The MIT License (MIT)
 *
 * Copyright (C) 2013 Sergi Mansilla
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the 'Software'), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
/**
 * The MIT License (MIT)
 *
 * Copyright (C) 2021 Maxim Volkov
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the 'Software'), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

'use strict';

/**
 * Creates a virtually-rendered scrollable list.
 * @param {object} config
 * @constructor
 */
export function VirtualList<T extends string | HTMLElement = string>(this: VirtualList<T>, config: VirtualListConfig<T>) {
  var width = defaultDimension("w", config);
  var height = defaultDimension("h", config);
  var itemHeight = this.itemHeight = config.itemHeight;

  this.items = config.items;
  this.generatorFn = config.generatorFn;
  this.totalRows = config.totalRows || (config.items && config.items.length) || 0;

  var scroller = createScroller(numberPx(itemHeight * this.totalRows));
  this.container = createContainer(width, height);
  this.container.appendChild(scroller);

  var screenItemsLen = Math.ceil(config.h / itemHeight);
  // Cache 4 times the number of items that fit in the container viewport
  this.cachedItemsLen = screenItemsLen * 3;
  this._renderChunk(this.container, 0);

  var self = this;
  var lastRepaintY: number;
  var maxBuffer = screenItemsLen * itemHeight;
  var lastScrolled = 0;

  // As soon as scrolling has stopped, this interval asynchronously removes all
  // the nodes that are not used anymore
  this.rmNodeInterval = window.setInterval(function () {
    if (Date.now() - lastScrolled > 100) {
      var badNodes = document.querySelectorAll('[data-rm="1"]');
      for (var i = 0, l = badNodes.length; i < l; i++) {
        self.container.removeChild(badNodes[i]);
      }
    }
  }, 300);

  function onScroll(e: Event) {
    const { target } = e;
    if (!hasScrollTop(target)) {
      return;
    }
    var scrollTop = target.scrollTop; // Triggers reflow
    if (!lastRepaintY || Math.abs(scrollTop - lastRepaintY) > maxBuffer) {
      var first = scrollTop / itemHeight - screenItemsLen;
      self._renderChunk(self.container, first < 0 ? 0 : first);
      lastRepaintY = scrollTop;
    }

    lastScrolled = Date.now();
    e.preventDefault && e.preventDefault();
  }

  this.container.addEventListener('scroll', onScroll);
}

VirtualList.prototype.createRow = function <T extends string | HTMLElement>(this: VirtualList<T>, i: number) {
  var item: HTMLElement;
  if (this.generatorFn)
    item = this.generatorFn(i);
  else if (this.items) {
    const text = this.items[i];
    if (typeof text === 'string') {
      item = createDefaultItem(text, this.itemHeight);
    } else {
      item = text;
    }
  } else {
    return;
  }

  item.classList.add('vrow');
  item.style.position = 'absolute';
  item.style.top = numberPx(i * this.itemHeight);
  return item;
};

/**
 * Renders a particular, consecutive chunk of the total rows in the list. To
 * keep acceleration while scrolling, we mark the nodes that are candidate for
 * deletion instead of deleting them right away, which would suddenly stop the
 * acceleration. We delete them once scrolling has finished.
 *
 */
VirtualList.prototype._renderChunk = function <T extends string | HTMLElement = string>(this: VirtualList<T>, container: Element, from: number) {
  var finalItem = calculateFinalItemIndex(from + this.cachedItemsLen, this.totalRows);
debugger;
  // Append all the new rows in a document fragment that we will later append to
  // the parent node
  var fragment = document.createDocumentFragment();
  for (var i = from; i < finalItem; i++) {
    fragment.appendChild(this.createRow(i));
  }

  // Hide and mark obsolete nodes for deletion.
  for (var j = 1, l = container.children.length; j < l; j++) {
    const element = container.children[j];
    if (!hasInlineStyle(element)) {
      return;
    }
    element.style.display = 'none';
    element.setAttribute('data-rm', '1');
  }
  container.appendChild(fragment);
};
