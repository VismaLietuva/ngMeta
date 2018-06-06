import { MethodDeclaration, Identifier, SyntaxKind } from "typescript";
import { parseName, hasModifier } from "./utils";
import { TypeParser } from "./type-parser";

export class MethodMetadata {
    name: string;
    isPrivate = false;
    isProtected = false;
    type: string;
}

export class MethodParser {

    private _typeParser = new TypeParser();

    parse(method: MethodDeclaration): MethodMetadata {
        const meta = new MethodMetadata;

        meta.name = parseName(method.name as Identifier);
        meta.isPrivate = hasModifier(SyntaxKind.PrivateKeyword, method.modifiers);
        meta.isProtected = hasModifier(SyntaxKind.ProtectedKeyword, method.modifiers);
        meta.type = this._typeParser.parse(method.type, 'void');

        return meta;
    }
}