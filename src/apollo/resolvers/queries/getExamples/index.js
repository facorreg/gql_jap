import { KaExample } from 'models';
import mongoose from 'mongoose';

const getExamples = async (ids) => {
  try {
    const examples = await KaExample.find({
      _id: { $in: ids.map((id) => mongoose.Types.ObjectId(id)) },
    });

    return examples;
  } catch (err) {
    return Promise.reject(err);
  }
};

export default getExamples;
