import { RawElement } from './RawElement';
import { ElementAttributes, ElementContent } from './types';

export function a(attributes?: ElementAttributes, content?: ElementContent) {
    return RawElement.create('a', attributes, content);
}

export function g(attributes?: ElementAttributes, content?: ElementContent) {
    return RawElement.create('g', attributes, content);
}

export function circle(
    attributes?: ElementAttributes,
    content?: ElementContent
) {
    return RawElement.create('circle', attributes, content);
}

export function text(attributes?: ElementAttributes, content?: ElementContent) {
    return RawElement.create('text', attributes, content);
}

export function tspan(
    attributes?: ElementAttributes,
    content?: ElementContent
) {
    return RawElement.create('tspan', attributes, content);
}

export function foreignObject(
    attributes?: ElementAttributes,
    content?: ElementContent
) {
    return RawElement.create('foreignObject', attributes, content);
}

export function line(attributes?: ElementAttributes, content?: ElementContent) {
    return RawElement.create('line', attributes, content);
}

export function rect(attributes?: ElementAttributes, content?: ElementContent) {
    return RawElement.create('rect', attributes, content);
}

export function path(attributes?: ElementAttributes, content?: ElementContent) {
    return RawElement.create('path', attributes, content);
}
