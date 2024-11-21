import * as glob from 'glob';
import * as fs from 'fs';
import * as packageJson from '../package.json';

const version = packageJson.version;
const readmeFile = glob.sync('./README.md')[0];
const fileContent = fs.readFileSync(readmeFile, 'utf-8');

const header = fileContent.split('\n')[0];
const allOtherContent = fileContent.split(header)[1];
// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
const newHeader = `# Giti-Chart `;
const updatedReadme = newHeader + allOtherContent;
fs.writeFileSync(readmeFile, updatedReadme);
