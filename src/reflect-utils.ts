import {
    ClassDeclaration,
    Decorator,
    Identifier,
    CallExpression
} from 'typescript';

export function getClassDecorators(classNode: ClassDeclaration): string[] {
    if (!classNode.decorators) {
        return [];
    }

    return classNode.decorators.map((decorator) => {
        const callExpression = decorator.expression as CallExpression;
        const identifier = callExpression.expression as Identifier;

        return identifier.text;
    });
}
