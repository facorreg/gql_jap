import first from 'lodash/first';
import flattenDeep from 'lodash/flattenDeep';
import uniq from 'lodash/uniq';
import { toKatakana, isKanji } from 'wanakana';
import { fetch, getEnv } from 'utils';
import { Word } from 'models';
import getKanji from 'apollo/resolvers/queries/content/getKanjiApiData';

const findWordQuery = (toFind, complementary = {}) => ({
  $or: [{ 'japanese.word': toFind }, { 'japanese.reading': toFind }],
  ...complementary,
});

const senseParser = ({
  english_definitions: ed, parts_of_speech: pos, tags = [],
}) => {
  const isWiki = tags.find((t) => (t.includes('Wikipedia')));

  if (isWiki) return null;

  const newSense = {
    definitions: ed?.join(', '),
    partsOfSpeech: pos?.join(', '),
    tags: tags?.join(', '),
    examples: [],
  };

  return newSense;
};

const jishoParser = (data) => data.map(async ({ japanese, senses: rawSenses }) => {
  /*
    find the matching word in the db
    based on its reading / spelling, and
    avoids false matches due to homonyms (and their ideogram equivalent)
    by also checking the definitions
  */

  /*
    todo: handle search with ES
  */

  const currentData = await Word.findOne(
    findWordQuery(
      first(japanese)?.word || first(japanese)?.reading,
      { 'senses.definitions': first(rawSenses)?.english_definitions?.join(', ') },
    ),
  );

  if (currentData) return currentData;

  const kanjiWithin = uniq(flattenDeep(
    japanese.map(({ word }) => (
      word
        ? word.split('').map((r) => (isKanji(r) ? r : null))
        : null)),
  )).filter((e) => e);

  const kanjiList = await Promise.all(
    kanjiWithin.map((kanji) => getKanji(kanji)),
  );

  const kanjiIds = kanjiList.map(({ _id: id }) => id);
  const senses = rawSenses?.map(senseParser).filter((e) => e);
  const newWord = new Word({ japanese, senses, kanjiIds });
  newWord.save();

  return newWord;
});

const fetchJisho = async (word) => {
  const reject = () => Promise.reject(new Error('Failed to fetch Jisho Api'));
  try {
    // ajouter la limite 10 plus tard
    const currentSearch = await Word.find(findWordQuery(new RegExp(`.*${word}|${toKatakana(word)}.*`)));

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

    if (status !== 200) {
      return reject();
    }

    return Promise.resolve(Promise.all(jishoParser(data)));
  } catch (err) {
    return reject();
  }
};

export default fetchJisho;
