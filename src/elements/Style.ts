import { ElementAttributes } from '../types';
import { BaseElement } from './BaseElement';

export class Style extends BaseElement {
    public name = 'style';
    public hasClosingTag = true;

    constructor(attributes?: ElementAttributes, content?: string) {
        super(attributes, content);
        this.content = `<![CDATA[\n` + this.content;
    }

    public static create(attributes?: ElementAttributes, content?: string) {
        return new Style(attributes, content);
    }

    public override render(): string {
        this.content += `\n]]>`;
        return super.render();
    }
}
