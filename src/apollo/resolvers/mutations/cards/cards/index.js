import { Card, Deck } from 'models';

const createCard = async ({
  deckId,
  value,
  type,
  repeat,
}, { user }) => {
  try {
    const { id } = user;
    // console.log(id, deckId, value);

    const card = new Card({
      userId: id,
      deckId,
      type,
      value,
      new: Boolean(repeat),
      repeat,
    });

    const deck = await Deck.findOne({ _id: deckId });
    const { cardIds = [] } = deck;
    deck.cardIds = [...cardIds, card.id];

    await deck.save();
    await card.save();

    return Promise.resolve(card);
  } catch (err) {
    return Promise.reject(err);
  }
};

export { createCard };
