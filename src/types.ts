import type { SvgElement } from './interfaces';

export type AttributeValue = string | number | null;
export type ElementAttributes = Record<string, AttributeValue>;
export type ElementContent =
    | string
    | number
    | SvgElement
    | Array<string | number | SvgElement>;
