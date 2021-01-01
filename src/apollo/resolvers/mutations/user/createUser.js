import bcrypt from 'bcryptjs';
import { createJWT, getEnv } from 'utils';
import { User } from 'models';

const createUser = async ({ username, email, password }) => {
  try {
    const usernameTaken = Boolean(await User.findOne({ username }));
    const emailTaken = Boolean(await User.findOne({ email }));

    if (usernameTaken || emailTaken) {
      return Promise.resolve({ error: `${usernameTaken ? 'Username' : 'Email'} taken` });
    }

    const saltRounds = Number(getEnv('BCRYPT_SALT_ROUNDS', 4));
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      email,
      password: hash,
    });

    await newUser.save();

    return Promise.resolve({
      jwt: createJWT(newUser.id),
      user: newUser,
    });
  } catch (err) {
    return Promise.reject(err);
  }
};

export default createUser;
