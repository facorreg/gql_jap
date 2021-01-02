import jwt from 'jsonwebtoken';

const decodeJWT = (token) => jwt.decode(token);

export default decodeJWT;
