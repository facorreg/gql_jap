import mongoose from 'mongoose';

const cardSchema = mongoose.Schema({
  userId: mongoose.Types.ObjectId,
  type: String,
  value: String,
  new: Boolean,
  repeat: Date,
});

const Card = mongoose.model('cards', cardSchema);

export default Card;
