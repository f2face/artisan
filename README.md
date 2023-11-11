[![npm version](https://img.shields.io/npm/v/svg-artisan.svg?style=flat)](https://www.npmjs.com/package/svg-artisan)

# SVG-Artisan

Simple SVG builder/generator for NodeJS.

Inspired by [svg-builder](https://github.com/JoeChapman/svg-builder) by Joseph Chapman.

## Installation

#### pnpm

```shell
pnpm i svg-artisan
```

#### npm

```shell
npm i svg-artisan
```

## Example

```javascript
import { RawElement, node, Style, Svg } from 'svg-artisan';

// SVG Root element
const svg = new Svg().width(300).height(300);

// Add child element
const text = node.text({ 'font-weight': 'bold', x: 10, y: 10 }, 'Lorem ipsum');
svg.appendChild(text);

// Add multiple elements
const element1 = node.rect(/* ... */);
const element2 = node.line(/* ... */);
const element3 = node.text(/* ... */);
svg.appendChild(element1, element2, element3);

// Add other/custom element (advanced)
const gradient = RawElement.create(
    'gradient', // Element or tag name
    { id: 'myGradient' }, // Attributes
    [
        /* Content or child element(s) inside this `gradient` element */
    ]
);
const defs = RawElement.create('defs').appendChild(gradient);
svg.appendChild(defs);

// Add style
const style = Style.create({}, '#myText { font-weight: bold; }');
svg.appendChild(style);

// Render SVG
const data = svg.render();

// Render as Buffer
const svgBuffer = svg.buffer();
```

## Validate SVG

Currently, this library does not validate the elements and attributes.

If you want to validate the generated SVG, use [is-svg](https://www.npmjs.com/package/is-svg) npm package.

## Rasterize SVG

To convert SVG into raster format (PNG, JPG, etc) programmatically, you can use npm package such as `sharp`, `gm`, or other image processor.

## References

-   https://developer.mozilla.org/en-US/docs/Web/SVG
-   https://developer.mozilla.org/en-US/docs/Web/SVG/Element
-   https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute
