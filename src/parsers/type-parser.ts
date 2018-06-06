import { SyntaxKind, Node } from "typescript";

const SIMPLE_TYPES: Map<SyntaxKind, string> = new Map([
    [SyntaxKind.StringKeyword, 'string'],
    [SyntaxKind.NumberKeyword, 'number'],
    [SyntaxKind.BooleanKeyword, 'boolean'],
    [SyntaxKind.ObjectKeyword, 'object'],
    [SyntaxKind.VoidKeyword, 'void'],
    [SyntaxKind.AnyKeyword, 'any'],
]);

export class TypeParser {

    parse(node: Node, defaultValue = '<unknown>'): string {
        if (!node) {
            return defaultValue;
        }
        const type = SIMPLE_TYPES.get(node.kind);

        if (type) {
            return type;
        }

        return '<unknown>';
    }

    // export function getDeclaringType(node: Node): string {
    //     switch (node.kind) {
    //         case SyntaxKind.StringKeyword:
    //             return 'string';
    //         case SyntaxKind.NumberKeyword:
    //             return 'number';
    //         case SyntaxKind.BooleanKeyword:
    //             return 'boolean';
    //         case SyntaxKind.ObjectKeyword:
    //             return 'object';
    //         case SyntaxKind.TypeLiteral:
    //             return '{}';
    //         case SyntaxKind.ArrayType:
    //             return parseArrayType(node as ArrayTypeNode);
    //         case SyntaxKind.TypeReference:
    //             return getTypeReference(node as TypeReferenceNode);
    //         case SyntaxKind.VoidKeyword:
    //             return 'void';
    //         default:
    //             return '<unknown>';
    //     }
    // }

    // export function getTypeReference(ref: TypeReferenceNode): string {
    //     const identifier = ref.typeName as Identifier;
    //     return parseName(identifier);
    // }

    // export function parseArrayType(node: ArrayTypeNode): string {
    //     const type = getDeclaringType(node.elementType);
    //     return `${type}[]`;
    // }
}