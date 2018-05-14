import { Node } from 'typescript';
import { IMetadata } from '../model/metadata';

export abstract class BaseParser {
    abstract parse(node: Node): IMetadata;
}
