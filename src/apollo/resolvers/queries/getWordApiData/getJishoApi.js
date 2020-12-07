import { fetch, getEnv } from 'utils';
import { Word } from 'models';

const findWordQuery = (toFind) => ({
  $or: [{ 'japanese.word': toFind }, { 'japanese.reading': toFind }],
});

const senseParser = (word, japanese) => async ({
  english_definitions: ed, parts_of_speech: pos, tags = [],
}) => {
  const currentSense = await Word.findOne(findWordQuery(word));

  if (currentSense) return currentSense;

  const isWiki = tags.find((t) => (t.includes('Wikipedia')));

  if (isWiki) return null;

  const newWord = new Word({
    japanese,
    definitions: ed,
    partsOfSpeech: pos?.join(', '),
    tags: tags?.join(', '),
    examples: [],
  });

  // newWord.save();

  return newWord;
};

const jishoParser = (word, data) => (
  data.map(async ({ japanese, senses }) => (
    // senses?.tags?.find((t) => !t.includes('Wikipedia'))
    {
      japanese,
      senses: await Promise.all(
        senses
          ?.map(senseParser(word, japanese)),
      ),
    })));

const fetchJisho = async (word) => {
  const reject = () => Promise.reject(new Error('Failed to fetch Jisho Api'));
  try {
    // todo: normalizer input (kanji => hiragana) et utiliser Elastic
    // const currentSearch = await Word.findOne({ 'japanese.word': word });
    const currentSearch = await Word.find(findWordQuery(new RegExp(`.*${word}.*`))).limit(10);

    const hasExactMatch = currentSearch
      .find(({ japanese }) => japanese
        .find(({ word: jword, reading }) => jword || reading === word));

    if (hasExactMatch) {
      return currentSearch;
    }

    const { meta: { status }, data } = await fetch({
      url: getEnv('JISHO_URL', ''),
      args: { keyword: word },
    });

    if (status !== 200) return reject();

    return Promise.resolve(Promise.all(jishoParser(word, data)));
  } catch (err) {
    return reject();
  }
};

export default fetchJisho;
