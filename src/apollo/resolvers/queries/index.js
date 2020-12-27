import { getSingleKanji, getMultipleKanji } from './getKanjiApiData';
import getWord from './getWordApiData';
import getWords from './getWords';

const resolvers = {
  Query: {
    getKanji: (_, args) => getSingleKanji(args.word),
    getKanjiList: (_, args) => getMultipleKanji(args.ids),
    getWord: (_, args) => getWord(args.word),
    getWords: (_, args) => getWords(args.from, args.limit),
  },
};

export default resolvers;
