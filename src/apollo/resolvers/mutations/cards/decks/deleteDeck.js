import { Deck } from 'models';

const deleteDeck = async (id, { user }) => {
  const { id: userId } = user;

  try {
    const { deletedCount } = await Deck.deleteOne({ _id: id, userId });
    return Promise.resolve({ deleted: deletedCount ? id : null });
  } catch (err) {
    return Promise.reject(err);
  }
};

export default deleteDeck;
