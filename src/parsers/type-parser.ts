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

    parse(node: Node): string {
        if (SIMPLE_TYPES.has(node.kind)) {
            return SIMPLE_TYPES.get(node.kind);
        }

        return '<unknown>';
    }
}