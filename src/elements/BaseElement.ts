import { AttributeValue, ElementAttributes, ElementContent } from '../types';
import { SvgElement } from '../interfaces';

export abstract class BaseElement implements SvgElement {
    public abstract readonly name: string;

    protected attributesMap?: Map<string, AttributeValue>;
    protected content: string;

    constructor(attributes?: ElementAttributes, content?: ElementContent) {
        if (attributes) this.setAttribute(attributes);
        this.content = this.normalizeContent(content);
    }

    /**
     * Normalizes content to a `string` for SVG element rendering.
     * @param content The content to normalize.
     */
    private normalizeContent(content?: ElementContent): string {
        if (typeof content === 'string') return content;
        if (typeof content === 'number') return String(content);
        if (content instanceof BaseElement) return content.render();
        if (Array.isArray(content)) {
            const elements = content.map((el) => this.normalizeContent(el));
            return elements.join('');
        }
        return '';
    }

    /**
     * Adds an attribute and its value to the attributes map.
     * @param attribute The name of the attribute.
     * @param value The value of the attribute.
     */
    private addAttributeToMap(attribute: string, value: AttributeValue) {
        if (!this.attributesMap) this.attributesMap = new Map();
        this.attributesMap.set(attribute, this.escapeAttributeValue(value));
    }

    /**
     * Escapes an attribute value to ensure proper rendering.
     * @param value The attribute value to escape.
     */
    private escapeAttributeValue(value: AttributeValue): AttributeValue {
        if (typeof value === 'string') {
            return value.replace(/"/g, '&quot;');
        }
        return value;
    }

    /**
     * Replaces double quotes with single quotes
     * @param value The value that may contain double quotes.
     */
    protected replaceDoubleQuote(value: string | number) {
        if (typeof value === 'string') {
            return value.replace(/"/g, "'");
        }
        return value;
    }

    /**
     * Returns the attributes of this SVG element as a `Map`.
     */
    public getAttributes(): Map<string, AttributeValue> | undefined {
        return this.attributesMap;
    }

    /**
     * Returns the content of this SVG element as a `string`.
     */
    public getContent(): string {
        return this.content;
    }

    /**
     * Sets an attribute on this element.
     * @param attribute The name of the attribute.
     * @param value The value of the attribute.
     */
    public setAttribute(attribute: string, value: AttributeValue): this;

    /**
     * Sets attributes on this element.
     * @param attributes An object containing multiple attribute-value pairs.
     */
    public setAttribute(attributes: ElementAttributes): this;

    public setAttribute(
        attr: string | ElementAttributes,
        value?: AttributeValue
    ): this {
        if (typeof attr === 'string' && typeof value !== 'undefined') {
            this.addAttributeToMap(attr, value);
        } else {
            Object.entries(attr).forEach(([attr, value]) =>
                this.addAttributeToMap(attr, value)
            );
        }

        return this;
    }

    /**
     * Appends child element(s) inside this element.
     * @param childElement Child element(s) to append inside this element.
     */
    public appendChild(
        ...childElement: Array<SvgElement | Array<SvgElement> | string>
    ): this {
        for (const element of childElement) {
            this.content += this.normalizeContent(element);
        }
        return this;
    }

    /**
     * Sets inline style for the element.
     * @param style An object representing the inline style properties and their values.
     */
    public style(style: { [property: string]: string | number }): this {
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

    /**
     * Renders this element as a `string` representation of an SVG element.
     * @returns A `string` representing the SVG element.
     */
    public render(): string {
        let attrs = '';
        if (this.attributesMap) {
            attrs = ` `;
            attrs += Array.from(this.attributesMap.entries())
                .map(([attr, value]) =>
                    value !== null ? `${attr}="${value}"` : `${attr}`
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

    /**
     * Renders this element then converts it to a `Buffer`.
     * @returns A `Buffer` containing the SVG element as binary data.
     */
    public buffer(): Buffer {
        return Buffer.from(this.render());
    }
}
