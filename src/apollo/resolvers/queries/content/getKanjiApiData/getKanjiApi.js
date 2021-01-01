import {
  getEnv, fetch,
} from 'utils';

const parseKanjiApi = ({
  kanji,
  kun_readings: kunReadings = [],
  on_readings: onReadings = [],
  stroke_count: strokeCount,
  meanings = [],
  jlpt,
  grade,
} = {}) => ({
  word: kanji,
  meaning: meanings.map((meaning) => meaning.replace('-', '')),
  kunyomi: kunReadings,
  onyomi: onReadings,
  strokes: { count: strokeCount },
  references: {
    grade,
    jlpt,
  },
});

const getKanjiApi = async (word) => {
  try {
    const args = {
      url: `${getEnv('KANJI_API_URL', '')}${word}`,
    };
    const response = await fetch(args);

    return Promise.resolve(parseKanjiApi(response));
  } catch (err) {
    return Promise.reject(new Error('Failed to fetch kanjiApi data'));
  }
};

export default getKanjiApi;
