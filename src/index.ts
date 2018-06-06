import { getOptions } from './cli';
import { COMPILER_OPTIONS } from './compiler-options';
import { Compiler } from './compiler';
import { FileParser, FileMetadata } from './parsers/file-parser';

const options = getOptions();


const compiler = new Compiler(COMPILER_OPTIONS);
const files = compiler.compile(options.entryPoint);

const data: FileMetadata[] = [];

const fileParser = new FileParser();

files.forEach((file) => {
    const fileMeta = fileParser.parse(file);
    data.push(fileMeta);
})


console.log('--- THE END');

