import { VirtualList, VirtualListConfig } from "./types.js"
import { createContainer } from "./utils/container.js";
import { defaultDimension } from "./utils/default-dimension.js";
import { createDefaultItem } from "./utils/default-item.js";
import { hasInlineStyle, hasScrollTop } from "./utils/discriminators.js";
import { calculateChunkLength, calculateFinalItemIndex } from "./utils/final-item.js";
import { firstItem } from "./utils/first-item.js";
import { forEachInRange } from "./utils/for-each-in-range.js";
import { hideAllButFirst, removeHiddenDebounced, removeHiddenItems } from "./utils/hide-all-except.js";
import { DATA_RM_SELECTOR } from "./utils/known.js";
import { numberPx } from "./utils/number-px.js";
import { scrollHandlerFactory } from "./utils/scroll-handler-factory.js";
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
export function VirtualList(this: VirtualList, config: VirtualListConfig) {
  var width = defaultDimension("w", config);
  var height = defaultDimension("h", config);
  var itemHeight = this.itemHeight = config.itemHeight;

  this.generatorFn = config.generatorFn;
  this.totalRows = config.totalRows || 0;

  var scroller = createScroller(numberPx(itemHeight * this.totalRows));
  this.container = createContainer(width, height);
  this.container.appendChild(scroller);

  var screenItemsLen = Math.ceil(config.h / itemHeight);
  // Cache 4 times the number of items that fit in the container viewport
  this.cachedItemsLen = screenItemsLen * 3;
  this._renderChunk(0);

  var self = this;
  var maxBuffer = screenItemsLen * itemHeight;

  // As soon as scrolling has stopped, this interval asynchronously removes all
  // the nodes that are not used anymore
  const scrollHandler = scrollHandlerFactory(
    this.container,
    maxBuffer,
    (scrollTop) => {
      self._renderChunk(firstItem(scrollTop, itemHeight, screenItemsLen));
      removeHiddenDebounced();
     }
  );


  this.container.addEventListener('scroll', scrollHandler);
}

VirtualList.prototype.createRow = function (this: VirtualList, i: number) {
  var item = this.generatorFn(i);

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
VirtualList.prototype._renderChunk = function (this: VirtualList, from: number) {
  hideAllButFirst(this.container.children);

  const fragment = document.createDocumentFragment();
  forEachInRange(
    from,
    calculateChunkLength(from, this.cachedItemsLen, this.totalRows),
    (index) => fragment.appendChild(this.createRow(index)),
  );
  this.container.appendChild(fragment);
};
