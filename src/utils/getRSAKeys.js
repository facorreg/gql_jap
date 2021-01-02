import fs from 'fs';
import appRoot from 'app-root-path';

// We go to .. after appRoot because appRoot is /dist
const getRSAKeys = (type) => fs.readFileSync(`${appRoot}/../${type}.key`, 'utf8');

export default getRSAKeys;
