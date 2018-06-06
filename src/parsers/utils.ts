import { Identifier, SyntaxKind, ModifiersArray, Node, TypeReference, TypeReferenceNode, ArrayTypeNode } from "typescript";


export function parseName(node: Identifier): string {
    if (!node) {
        return null;
    }
    return node.text;
}

export function hasModifier(kind: SyntaxKind, array: ModifiersArray): boolean {
    if (!array || !array.length) {
        return false;
    }

    return array.some((e) => e.kind === kind);
}
