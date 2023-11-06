import { AttributeValue, ElementAttributes, ElementContent } from '../types';
import { SvgElement } from '../interfaces';

export abstract class BaseElement implements SvgElement {
    public abstract readonly name: string;

    protected attributesMap?: Map<string, AttributeValue>;
    protected content: string;

    constructor(attributes?: ElementAttributes, content?: ElementContent) {
        if (attributes) {
            this.setAttribute(attributes);
        }
        this.content = this.normalizeContent(content);
    }

    private normalizeContent(content?: ElementContent) {
        if (typeof content === 'string') return content;
        else if (typeof content === 'number') return String(content);
        else if (content instanceof BaseElement) return content.render();
        else if (Array.isArray(content)) {
            const elements = content.map((el) => {
                if (el instanceof BaseElement) return el.render();
            });
            return elements.join('');
        }

        return '';
    }

    private addAttributeToMap(key: string, value: AttributeValue) {
        if (!this.attributesMap) {
            this.attributesMap = new Map();
        }

        this.attributesMap.set(key, this.escapeAttributeValue(value));
    }

    private escapeAttributeValue(value: AttributeValue) {
        if (typeof value === 'string') {
            return value.replace(/"/g, '&quot;');
        }
        return value;
    }

    protected replaceDoubleQuote(value: string | number) {
        if (typeof value === 'string') {
            return value.replace(/"/g, "'");
        }
        return value;
    }

    public getAttributes() {
        return this.attributesMap;
    }

    public getContent() {
        return this.content;
    }

    public setAttribute(attribute: string, value: AttributeValue): this;
    public setAttribute(attributes: ElementAttributes): this;
    public setAttribute(
        attr: string | ElementAttributes,
        value?: AttributeValue
    ) {
        if (typeof attr === 'string' && typeof value !== 'undefined') {
            this.addAttributeToMap(attr, value);
        } else {
            Object.entries(attr).forEach(([key, value]) =>
                this.addAttributeToMap(key, value)
            );
        }

        return this;
    }

    public appendChild(...childElement: Array<SvgElement | string>) {
        for (const element of childElement) {
            this.content += this.normalizeContent(element);
        }
        return this;
    }

    public style(style: { [property: string]: string | number }) {
        const value = Object.entries(style)
            .map(([prop, value]) => {
                const newProp = this.replaceDoubleQuote(prop);
                const newValue = this.replaceDoubleQuote(value);
                return `${newProp}:${newValue};`;
            })
            .join(' ');
        this.addAttributeToMap('style', value);
        return this;
    }

    public render(): string {
        let attrs = '';
        if (this.attributesMap) {
            attrs = ` `;
            attrs += Array.from(this.attributesMap.entries())
                .map(([key, value]) =>
                    value !== null ? `${key}="${value}"` : `${key}`
                )
                .join(' ');
        }

        let element = `<${this.name}${attrs}`;
        if (this.content.length) {
            element += '>';
            element += this.content;
            element += `</${this.name}>`;
        } else {
            element += ' />';
        }

        return element;
    }

    public buffer() {
        return Buffer.from(this.render());
    }
}
