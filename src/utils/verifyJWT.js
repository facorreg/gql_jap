import jwt from 'jsonwebtoken';
import getRSAKeys from './getRSAKeys';

const verifyJWT = async (token) => {
  const privateKey = getRSAKeys('private');
  const signOptions = {
    issuer: 'JapApp backend',
    subject: 'userAuth',
    audience: 'JapApp frontend',
    expiresIn: '12h',
    algorithms: ['HS256'],
  };

  return jwt.verify(token, privateKey, signOptions);
};

export default verifyJWT;
