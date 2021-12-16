## Virtual DOM List

This is a simple component that allows the developer to create very
long lists (by list I mean a single column of rows) that perform extremely
fast. It does so by loading just the part of the list showing up on the viewport, and by optimizing
the amount of DOM operations and reflows. It also spends very little memory.

The list could be done even faster by sacrificing the 'momentum' effect, but I
decided to keep it since it is too big of a sacrifice for the sake of speed.

## Installation

```cmd
    npm install virtual-list
```

Or if you prefer bower:

```cmd
    bower install virtual-list
```

Of course it can also just be added to any JavaScript project since it consists of a
single JavaScript file.

## Usage

Each of the following snippets of code creates a virtual list that holds 1 million
rows:

```typescript
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
```

## Caveats

Firefox has a nasty bug (<https://bugzilla.mozilla.org/show_bug.cgi?id=373875>)
that breaks any attempt of assigning big numerical values to css properties.
Since the virtual list does exactly that to give the illusion of a very big list
without actually loading the components, you might run into that bug for very big
lists. Unfortunately, I haven't found a way to work around it yet.

## License

The MIT License (MIT)

Copyright (C) 2013 Sergi Mansilla, 2021 Maxim Volkov

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
