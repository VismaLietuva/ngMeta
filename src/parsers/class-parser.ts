import { ClassDeclaration, SyntaxKind, PropertyDeclaration, MethodDeclaration } from "typescript";
import { PropertyMetadata, PropertyParser } from "./property-parser";
import { parseName, hasModifier } from "./utils";
import { MethodParser, MethodMetadata } from "./method-parser";
import { JSDocParser, DocumentationMetadata } from "./jsdoc/jsdoc-parser";

export class ClassMetadata {
    name: string;
    isExported: boolean;
    properties: PropertyMetadata[];
    methods: MethodMetadata[];
    docs: DocumentationMetadata;

    constructor() {
        this.isExported = false;
        this.properties = [];
        this.methods = [];
    }
}

export class ClassParser {
    private _propertyParser = new PropertyParser();
    private _methodParser = new MethodParser();
    private _jsDocParser = new JSDocParser();

    parse(klass: ClassDeclaration): ClassMetadata {
        const meta = new ClassMetadata();

        meta.name = parseName(klass.name);
        meta.isExported = hasModifier(SyntaxKind.ExportKeyword, klass.modifiers);

        if (klass.members) {
            klass.members.forEach((m) => {
                switch (m.kind) {
                    case SyntaxKind.PropertyDeclaration:
                        meta.properties.push(this._propertyParser.parse(m as PropertyDeclaration))
                        break;

                    case SyntaxKind.MethodDeclaration:
                        meta.methods.push(this._methodParser.parse(m as MethodDeclaration));
                        break;
                    default:
                        break;
                }
            })
        }

        meta.docs = this._jsDocParser.parse(klass);

        return meta;
    }
}