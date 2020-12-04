import Koa from 'koa';
import connect from 'mongo/connect';
import KoaRouter from 'koa-router';
import getKanji from './src/queries/getKanji';

const app = new Koa();
const router = new KoaRouter();

connect('jpDb');

router.get('/kanji', async (ctx) => {
  try {
    const body = await getKanji({}, ctx.query.word);
    ctx.body = body;
  } catch (err) {
    ctx.body = { type: 'error', message: err.message };
  }
});

app.use(router.routes())
  .use(router.allowedMethods());

app.listen(4000);
