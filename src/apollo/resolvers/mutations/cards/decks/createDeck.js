import { Deck } from 'models';

const createDeck = async ({ name, type }, { user }) => {
  const { id } = user;

  const deck = new Deck({
    name, type, userId: id, cardIds: [],
  });

  await deck.save();

  return deck;
};

export default createDeck;
