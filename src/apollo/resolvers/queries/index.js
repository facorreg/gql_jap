import { getSingleKanji, getMultipleKanji } from './getKanjiApiData';
import getWord from './getWordApiData';
import getWords from './getWords';
import getExamples from './getExamples';

const resolvers = {
  Query: {
    getKanji: (_, args) => getSingleKanji(args.word),
    getKanjiList: (_, args) => getMultipleKanji(args.ids),
    getWord: (_, args) => getWord(args.word),
    getWords: (_, args) => getWords(args.from, args.limit),
    getExamples: (_, args) => getExamples(args.ids),
  },
};

export default resolvers;
