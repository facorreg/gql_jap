import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
  username: String,
  password: String,
  email: String,
  // decks
});

const User = mongoose.model('user', UserSchema);

// eslint-disable-next-line import/prefer-default-export
export { User };
