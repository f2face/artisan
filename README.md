# SVG-Artisan

Simple SVG builder/generator for NodeJS.

Inspired by [svg-builder](https://github.com/JoeChapman/svg-builder) by Joseph Chapman.

## Installation

```bash
pnpm i svg-artisan
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

// Add other element (advanced)
const gradient = RawElement.create(
    'gradient', // Element/tag name
    true, // Closing tag
    { id: 'myGradient' } /* ... */
);
const defs = RawElement.create('defs', true).appendChild(gradient);
svg.appendChild(defs);

// Add styling
const style = Style.create({}, '#myGradient { /* ... */ }');

// Render SVG
const data = svg.render();

// Render as Buffer
const svgBuffer = svg.buffer();
```
