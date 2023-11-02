import type { SvgElement } from './interfaces';

export type AttributeValue = string | number | null;
export type ElementAttributes = { [key: string]: AttributeValue };
export type ElementContent = string | SvgElement | Array<SvgElement>;
