import { ConnectionOptions } from 'mongoose';

export const mongoDBConfig: ConnectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
