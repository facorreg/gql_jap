import jwt from 'jsonwebtoken';
import getRSAKeys from './getRSAKeys';
import signOptions from './JWTSignOptions';

const verifyJWT = async (token) => {
  const privateKey = getRSAKeys('private');
  const verifyOptions = {
    ...signOptions,
    algorithms: ['HS256'],
  };

  return jwt.verify(token, privateKey, verifyOptions);
};

export default verifyJWT;
