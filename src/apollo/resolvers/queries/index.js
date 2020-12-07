import getKanji from './getKanjiApiData';
import getWord from './getWordApiData';

const resolvers = {
  Query: {
    getKanji: (_, args) => getKanji(args.word),
    getWord: (_, args) => getWord(args.word),
  },
};

export default resolvers;
