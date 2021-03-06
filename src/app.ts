import * as express from 'express';
import { router } from './routes';

export const createApp = (): express.Express => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use('/api', router);

  return app;
};
