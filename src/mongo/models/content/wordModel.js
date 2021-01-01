import mongoose from 'mongoose';

const wordSchema = mongoose.Schema({
  japanese: [{ word: String, reading: String }],
  senses: [{
    definitions: String,
    partsOfSpeech: String,
    tags: String,
    examples: [mongoose.Schema.Types.ObjectId],
  }],
  kanjiIds: [mongoose.Schema.Types.ObjectId],
});

const Word = mongoose.model('Word', wordSchema);

export default Word;
