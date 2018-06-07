import { Node, JSDocContainer, JSDocTag, SyntaxKind, JSDocParameterTag } from "typescript";
import { JSDocParamtagParser } from './jsdoc-param-tag-parser';

export class DocumentationMetadata {
    text: string;
    params?: ParamTag[];
    returns?: string;
    tags?: DocumentationTag[];
}

export class DocumentationTag {
    tag: string;
    text: string;
}

export class ParamTag {
    paramName: string;
    text: string;
}

export class JSDocParser {

    private _paramTagParser = new JSDocParamtagParser();


    parse(node: Node): DocumentationMetadata {
        if (!node) {
            return null;
        }
        const docs = (node as JSDocContainer).jsDoc

        if (!docs || !docs.length) {
            return null;
        }

        const meta = new DocumentationMetadata();
        const doc = docs[0];

        meta.text = doc.comment;

        if (!doc.tags || !doc.tags.length) {
            return meta;
        }

        doc.tags.forEach((tag) => {
            switch (tag.kind) {
                case SyntaxKind.JSDocReturnTag:
                    meta.returns = tag.comment;
                    break;
                case SyntaxKind.JSDocParameterTag:
                    const param = this._paramTagParser.parse(tag as JSDocParameterTag);
                    if (param) {
                        if (!meta.params) {
                            meta.params = [];
                        }
                        meta.params.push(param);
                    }
                    break;
                default:
                    const info = this.parseTag(tag);
                    if (info) {
                        if (!meta.tags) {
                            meta.tags = [];
                        }
                        meta.tags.push(info);
                    }
                    break;
            }
        })

        return meta;
    }

    private parseTag(tag: JSDocTag): DocumentationTag {
        const info = new DocumentationTag();

        info.tag = tag.tagName.text;
        info.text = tag.comment;

        return info;
    }
}