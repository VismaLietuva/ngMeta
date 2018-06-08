import { Node } from 'typescript';

export class DecoratorInfo {
    name: string;
}

export class DecoratorParser {
    parse(node: Node): DecoratorInfo {
        return null;
    }
}