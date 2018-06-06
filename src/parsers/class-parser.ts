import { ClassDeclaration, SyntaxKind, PropertyDeclaration } from "typescript";
import { PropertyMetadata, PropertyParser } from "./property-parser";
import { parseName, hasModifier } from "./utils";

export class ClassMetadata {
    name: string;
    isExported: boolean;
    properties: PropertyMetadata[];

    constructor() {
        this.isExported = false;
        this.properties = [];
    }
}

export class ClassParser {
    private _propertyParser: PropertyParser;

    constructor() {
        this._propertyParser = new PropertyParser();
    }


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

                    default:
                        break;
                }
            })
        }

        return meta;
    }
}