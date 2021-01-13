import { Card } from 'models';

const getCards = async () => {
  try {
    const cards = await Card.find();
    return Promise.resolve(cards);
  } catch (err) {
    return Promise.reject(err);
  }
};

export { getCards };
