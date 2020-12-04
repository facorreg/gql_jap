import uniq from 'lodash/uniq';

import { Word } from 'models';
import { getKanjiAlive, getKanjiApi } from './getKanjiApiData';

const getKanji = async (word) => {
  try {
    const kanjiAlive = await getKanjiAlive(word) || {};
    const kanjiApi = await getKanjiApi(word) || {};

    const takeFirstValidValue = (key, obj1 = kanjiAlive, obj2 = kanjiApi) => (
      obj1?.[key] || obj2?.[key]
    );

    const mergeArrays = (key, link, obj1 = kanjiAlive, obj2 = kanjiApi) => (
      uniq([...(obj1?.[key] || []), ...(obj2?.[key] || [])]).join(link)
    );

    const { examples } = kanjiAlive || {};
    const { strokes: kAliveStrokes, radical, video } = kanjiAlive || {};

    const { strokes: kApiStrokes } = kanjiApi || {};

    const merged = {
      type: 'kanji',
      word: takeFirstValidValue('word'),
      meaning: mergeArrays('meaning', ', '),
      onyomi: mergeArrays('onyomi', '、', kanjiAlive, kanjiApi),
      kunyomi: mergeArrays('kunyomi', '、', kanjiAlive, kanjiApi),
      video,
      strokes: {
        ...kAliveStrokes,
        count: takeFirstValidValue('count', kAliveStrokes, kApiStrokes),
      },
      radical,
      references: {
        ...kanjiAlive?.references,
        ...kanjiApi?.references,
      },
      examples,
    };

    return Promise.resolve(merged);
  } catch (error) {
    return Promise.reject(error);
  }
};

const getSingleKanji = async (options, word) => {
  try {
    const kanji = await Word.findOne({ type: 'kanji', word });
    if (kanji) return Promise.resolve(kanji);

    const newKanji = new Word(await getKanji(word));
    newKanji.save();

    return Promise.resolve(newKanji);
  } catch (err) {
    return Promise.reject(err);
  }
};

export default getSingleKanji;
