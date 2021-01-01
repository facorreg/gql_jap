import jwt from 'jsonwebtoken';
import fs from 'fs';
import appRoot from 'app-root-path';

const createJWT = (id) => {
  const payload = { id };

  const privateKey = fs.readFileSync(`${appRoot}/../private.key`, 'utf8');

  const signOptions = {
    issuer: 'JapApp backend',
    subject: id,
    audience: 'JapApp frontend',
    expiresIn: '12h',
  };

  const token = jwt.sign(payload, privateKey, signOptions);

  return token;
};

export default createJWT;
