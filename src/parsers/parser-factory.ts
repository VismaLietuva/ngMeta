import { SyntaxKind } from 'typescript';
import { ClassParser } from './class-parser';
import { BaseParser } from './base-parser';

export const parsers: Map<SyntaxKind, BaseParser> = new Map([
    [SyntaxKind.ClassDeclaration, new ClassParser()]
]);
1;
