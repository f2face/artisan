export interface SvgElement {
    name: string;
    render(): string;
}

export interface ElementDefinition {
    [name: string]: {
        permittedAttributes: Array<string>;
        permittedContents: Array<string>;
    };
}

export interface AttributeDefinition {
    [name: string]: {
        valueHints?: Array<string | number | null>;
        validOnElements?: Array<string>;
    };
}
