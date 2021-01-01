import queryResolvers from './queries';
import mutationResolvers from './mutations';

export default {
  ...queryResolvers,
  ...mutationResolvers,
};
