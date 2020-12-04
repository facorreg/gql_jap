import mongoose from 'mongoose';

const wordSchema = mongoose.Schema({
  type: String,
  word: String,
  meaning: String,
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
  examples: [mongoose.Schema.Types.ObjectId],
  references: {
    jlpt: Number,
    grade: Number,
    kodansha: String,
    classic_nelson: String,
  },
});

const Word = mongoose.model('Word', wordSchema);

export default Word;
