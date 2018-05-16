import { getOptions } from './cli';
import { Project } from './project';

const options = getOptions();

const project = new Project(options);
//console.log(project);

console.log('--- THE END');
