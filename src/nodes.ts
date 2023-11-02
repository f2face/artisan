import { RawElement } from './RawElement';
import { ElementAttributes, ElementContent } from './types';

export function a(attributes?: ElementAttributes, content?: ElementContent) {
    return RawElement.create('a', true, attributes, content);
}

export function g(attributes?: ElementAttributes, content?: ElementContent) {
    return RawElement.create('g', true, attributes, content);
}

export function circle(
    attributes?: ElementAttributes,
    content?: ElementContent
) {
    return RawElement.create('circle', true, attributes, content);
}

export function text(attributes?: ElementAttributes, content?: ElementContent) {
    return RawElement.create('text', true, attributes, content);
}

export function foreignObject(
    attributes?: ElementAttributes,
    content?: ElementContent
) {
    return RawElement.create('foreignObject', true, attributes, content);
}

export function line(attributes?: ElementAttributes, content?: ElementContent) {
    return RawElement.create('line', true, attributes, content);
}

export function rect(attributes?: ElementAttributes, content?: ElementContent) {
    return RawElement.create('rect', true, attributes, content);
}

export function path(attributes?: ElementAttributes, content?: ElementContent) {
    return RawElement.create('path', true, attributes, content);
}
