import { ElementAttributes, ElementContent } from './types';
import { BaseElement } from './elements/BaseElement';

export class RawElement extends BaseElement {
    constructor(
        public readonly name: string,
        public readonly hasClosingTag = true,
        attributes?: ElementAttributes,
        content?: ElementContent
    ) {
        super(attributes, content);
    }

    public static create(
        name: string,
        hasClosingTag: boolean,
        attributes?: ElementAttributes,
        content?: ElementContent
    ) {
        return new RawElement(name, hasClosingTag, attributes, content);
    }
}
