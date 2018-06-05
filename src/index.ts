import { getOptions } from './cli';
import { COMPILER_OPTIONS } from './compiler-options';
import { Compiler } from './compiler';

const options = getOptions();


const compiler = new Compiler(COMPILER_OPTIONS);
const files = compiler.compile(options.entryPoint);





console.log('--- THE END');

