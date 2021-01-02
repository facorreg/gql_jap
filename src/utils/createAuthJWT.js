import jwt from 'jsonwebtoken';
import getRSAKeys from './getRSAKeys';
import signOptions from './JWTSignOptions';

const createJWT = (id) => {
  const payload = { id };
  const privateKey = getRSAKeys('private');

  const token = jwt.sign(payload, privateKey, signOptions);

  return token;
};

export default createJWT;
