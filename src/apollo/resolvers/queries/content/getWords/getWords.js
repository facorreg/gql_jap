import { Word } from 'models';

const getWords = async (from = 0, limit = 10) => {
  try {
    const count = await Word.countDocuments({});
    if (from < count) {
      const wordList = await Word.find({})
        .skip(from)
        .limit(limit);

      return {
        wordList: {
          words: wordList,
          total: wordList.length,
        },
        countDb: count,
      };
    }

    return {
      countDb: count,
      wordList: {
        total: 0,
        words: [],
      },
    };
  } catch (e) {
    return Promise.reject(new Error('Failed to get words'));
  }
};

export default getWords;
