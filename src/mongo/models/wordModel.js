import mongoose from 'mongoose';
import { getEnv } from 'utils';

const wordSchema = mongoose.Schema({
  type: String,
  ogWord: String,
  word: String,
  meaning: String,
  kanji: [{
    onyomi: String,
    kunyomi: String,
    strokes: {
      count: Number,
      images: [String],
    },
    video: {
      poster: String,
      video: String,
    },
  }],
  examples: [{
    type: String,
    word: String,
    furigana: String,
    meaning: String,
    audio: {
      audio: String,
      format: String,
    },
  }],
});

const Word = mongoose.model('Word', wordSchema);

export default Word;
