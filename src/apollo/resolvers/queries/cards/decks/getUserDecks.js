import { Deck } from 'models';

const getUserDecks = async (userId) => {
  if (!userId) return Promise.resolve([]);

  try {
    const decks = await Deck.find({ userId });
    return Promise.resolve(decks);
  } catch (err) {
    return Promise.reject(err);
  }
};

export default getUserDecks;
