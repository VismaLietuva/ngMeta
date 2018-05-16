import {
    ClassDeclaration,
    Decorator,
    Identifier,
    CallExpression,
    Node,
    isIdentifier,
    PropertyAssignment,
    ShorthandPropertyAssignment,
    ObjectLiteralExpression,
    isPropertyAssignment,
    isShorthandPropertyAssignment
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

export function getDecoratorByName(
    node: Node,
    decoratorName: string
): Decorator {
    if (!node.decorators || node.decorators.length === 0) {
        return null;
    }

    const result = node.decorators.find((decorator) => {
        if (isIdentifier(decorator.expression)) {
            return (decorator.expression as Identifier).text === decoratorName;
        }
        const callExpression = decorator.expression as CallExpression;
        const identifier = callExpression.expression as Identifier;
        return identifier.text === decoratorName;
    });

    return result || null;
}

export function getPropertyAssignmentByName(
    expr: ObjectLiteralExpression,
    name: string
): PropertyAssignment {
    if (expr && expr.properties && expr.properties.length) {
        const prop = expr.properties.find((prop) => {
            return (
                (prop.name as Identifier).text === name &&
                isPropertyAssignment(prop)
            );
        });

        return prop as PropertyAssignment;
    }

    return null;
}
