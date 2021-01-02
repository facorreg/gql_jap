import { User } from 'models';

const getUser = async (id) => {
  try {
    const user = await User.findOne({ _id: id });
    const result = user ? { user } : { error: 'no user found' };

    return Promise.resolve(result);
  } catch (err) {
    return Promise.reject(err);
  }
};

export default getUser;
