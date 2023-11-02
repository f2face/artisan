import { ElementAttributes, ElementContent } from './types';
import { BaseElement } from './elements/BaseElement';

/**
 * The `svg` element is a container that defines a new coordinate system and viewport.
 * It is used as the outermost element of SVG documents, but it can also be used to embed an SVG fragment inside an SVG or HTML document.
 *
 * @class
 * @extends BaseElement
 * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/svg
 */
export class Svg extends BaseElement {
    public readonly name = 'svg';
    public readonly hasClosingTag = true;

    /**
     * Creates a new SVG root element.
     *
     * @param {ElementAttributes} [attributes] Optional attributes for the SVG element.
     * @param {ElementContent} [content] Optional content to be nested within the SVG element.
     */
    constructor(attributes?: ElementAttributes, content?: ElementContent) {
        super(attributes, content);
        this.setAttribute({
            xmlns: 'http://www.w3.org/2000/svg',
            'xmlns:xlink': 'http://www.w3.org/1999/xlink',
        });
    }

    /**
     * Static factory method to create a new instance of the `Svg` class.
     *
     * @param {ElementAttributes} [attributes] Optional attributes for the SVG root element.
     * @param {ElementContent} [content] Optional content to be nested within the SVG root element.
     * @returns {Svg} A new instance of the `Svg` class.
     */
    public static create(
        attributes?: ElementAttributes,
        content?: ElementContent
    ): Svg {
        return new Svg(attributes, content);
    }

    /**
     * Sets the width attribute for the SVG root element.
     *
     * @param {number | string} width The width value.
     * @returns {Svg} The current `Svg` instance.
     */
    public width(width: number | string): Svg {
        return this.setAttribute('width', width);
    }

    /**
     * Sets the height attribute for the SVG root element.
     *
     * @param {number | string} height The height value.
     * @returns {Svg} The current `Svg` instance.
     */
    public height(height: number | string): Svg {
        return this.setAttribute('height', height);
    }

    /**
     * Sets the `viewBox` attribute for the SVG element.
     *
     * @param {string} value The `viewBox` value as a string.
     * @returns {Svg} The current `Svg` instance.
     */
    public viewBox(value: string): this;

    /**
     * Sets the `viewBox` attribute for the SVG element.
     *
     * @param {number} minX The minimum x-coordinate of the `viewBox`.
     * @param {number} minY The minimum y-coordinate of the `viewBox`.
     * @param {number} width The width of the `viewBox`.
     * @param {number} height The height of the `viewBox`.
     * @returns {Svg} The current `Svg` instance.
     */
    public viewBox(
        minX: number,
        minY: number,
        width: number,
        height: number
    ): this;

    public viewBox(
        valueOrMinX: string | number,
        minY?: number,
        width?: number,
        height?: number
    ) {
        if (typeof valueOrMinX === 'string')
            return this.setAttribute('viewBox', valueOrMinX);
        else if (
            typeof valueOrMinX === 'number' &&
            typeof minY === 'number' &&
            typeof width === 'number' &&
            typeof height === 'number'
        )
            return this.setAttribute(
                'viewBox',
                [valueOrMinX, minY, width, height].join(' ')
            );
        else return this;
    }
}
