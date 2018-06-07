import { Node, JSDocContainer } from "typescript";

export class DocumentationMetadata {
    text: string;
    params: DocumentationParamTag[] = [];
    tags: DocumentationTag[] = [];
}

export class DocumentationTag {
    tag: string;
    text: string;
}

export class DocumentationParamTag extends DocumentationTag {

}

export class JSDocParser {
    parse(node: Node): any {
        const jsDoc = (node as JSDocContainer).jsDoc

        if (!jsDoc || !jsDoc.length) {
            return null;
        }

        const meta = new DocumentationMetadata();
        const doc = jsDoc[0];

        meta.text = doc.comment;

        if (doc.tags && doc.tags.length) {
            doc.tags.forEach((tag) => {
                meta.tags.push({ tag: tag.tagName.text, text: tag.comment });
            })
        }

        return meta;
    }
}