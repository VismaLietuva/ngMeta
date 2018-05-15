import { getOptions } from './cli';
import { Project } from './project';
import { ClassParser } from './parsers/class-parser';

const options = getOptions();

const project = new Project(options);
//console.log(project);

console.log('--- THE END');
