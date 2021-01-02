import { User } from 'models';
import bycript from 'bcryptjs';
import { createJWT } from 'utils';

const connect = async ({ identifier, password }) => {
  try {
    const user = await User.findOne({ $or: [{ username: identifier }, { email: identifier }] });

    if (!user) return Promise.resolve({ error: 'Indentifiers not found' });

    const { password: hash } = user;
    const isValidPassword = await bycript.compare(password, hash);

    if (!isValidPassword) return Promise.resolve({ error: 'Invalid password' });

    const token = createJWT(user.id);

    return Promise.resolve({ jwt: token, user });
  } catch (err) {
    return Promise.reject(err);
  }
};

export default connect;
