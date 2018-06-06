import { PropertyDeclaration, Identifier, SyntaxKind } from "typescript";
import { parseName, hasModifier } from "./utils";
import { TypeParser } from "./type-parser";

export class PropertyMetadata {
    name: string;
    isPrivate: boolean;
    isReadonly: boolean;
    type: string;

    constructor() {
        this.isPrivate = false;
        this.isReadonly = false;
    }
}

export class PropertyParser {

    private _typeParser = new TypeParser();

    parse(prop: PropertyDeclaration): PropertyMetadata {
        const meta = new PropertyMetadata();

        meta.name = parseName(prop.name as Identifier);
        meta.isPrivate = hasModifier(SyntaxKind.PrivateKeyword, prop.modifiers);
        meta.isReadonly = hasModifier(SyntaxKind.ReadonlyKeyword, prop.modifiers);
        meta.type = this._typeParser.parse(prop.type);

        return meta;
    }
}