import jwt from 'jsonwebtoken';
import getRSAKeys from './getRSAKeys';

const createJWT = (id) => {
  const payload = { id };
  const privateKey = getRSAKeys('private');

  const signOptions = {
    issuer: 'JapApp backend',
    subject: 'userAuth',
    audience: 'JapApp frontend',
    expiresIn: '12h',
  };

  const token = jwt.sign(payload, privateKey, signOptions);

  return token;
};

export default createJWT;