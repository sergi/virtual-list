import { VirtualListConfig } from "./types.js"
import { renderChunkFactory } from "./utils/chunk-factory.js";
import { initContainer } from "./utils/container.js";
import { firstItem } from "./utils/first-item.js";
import { removeHiddenDebounced } from "./utils/hide-all-except.js";
import { itemsPerScript } from "./utils/items-per-screen.js";
import { CACHE_RESERVE } from "./utils/known.js";
import { createRowFactory } from "./utils/row-factory.js";
import { scrollHandlerFactory } from "./utils/scroll-handler-factory.js";
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


export function virtualList(config: VirtualListConfig) {
  
  const container = initContainer(config)

  var screenItemsLen = itemsPerScript(config);

  const renderChunk = renderChunkFactory(
    container,
    screenItemsLen * CACHE_RESERVE,
    config.totalRows,
    createRowFactory(config.createRow, config.itemHeight)
  )

  renderChunk(0);

  const scrollHandler = scrollHandlerFactory(
    container,
    (scrollTop) => {
      renderChunk(firstItem(scrollTop, config.itemHeight, screenItemsLen));
      removeHiddenDebounced();
    }
  );

  container.addEventListener('scroll', scrollHandler);
  return ()=>{container.removeEventListener('scroll', scrollHandler)};
}
