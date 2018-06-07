import { MethodDeclaration, Identifier, SyntaxKind } from "typescript";
import { parseName, hasModifier } from "./utils";
import { TypeParser } from "./type-parser";
import { JSDocParser } from "./jsdoc-parser";

export class MethodMetadata {
    name: string;
    isPrivate = false;
    isProtected = false;
    type: string;
}

export class MethodParser {

    private _typeParser = new TypeParser();
    private _jsdocParser = new JSDocParser();

    parse(method: MethodDeclaration): MethodMetadata {
        const meta = new MethodMetadata;

        meta.name = parseName(method.name as Identifier);
        meta.isPrivate = hasModifier(SyntaxKind.PrivateKeyword, method.modifiers);
        meta.isProtected = hasModifier(SyntaxKind.ProtectedKeyword, method.modifiers);
        meta.type = this._typeParser.parse(method.type, 'void');

        const p = this._jsdocParser.parse(method);
        return meta;
    }
}