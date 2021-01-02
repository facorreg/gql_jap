import mongoose from 'mongoose';

const deckSchema = mongoose.Schema({
  name: String,
  type: String,
  userId: mongoose.Types.ObjectId,
  cardIds: [mongoose.Types.ObjectId],
});

const Deck = mongoose.model('deck', deckSchema);

export default Deck;
