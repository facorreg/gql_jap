import getKanji from './getKanjiApiData';
import getWord from './getWordApiData';
import getWords from './getWords';

const resolvers = {
  Query: {
    getKanji: (_, args) => getKanji(args.word),
    getWord: (_, args) => getWord(args.word),
    getWords: (_, args) => getWords(args.from, args.limit),
  },
};

export default resolvers;
