import chalk from 'chalk';
import { createConnection } from 'mongoose';
import 'reflect-metadata';
import { createApp } from './app';
import { mongoDBConfig } from './config/mongoDB';

const port = process.env.PORT || 3000;
const mongoDBPort = process.env.MONGODB_PORT || 27017;
const mongoDBName = process.env.MONGODB_NAME || 'battle-simulator';

createConnection(
  `mongodb://localhost:${mongoDBPort}/${mongoDBName}`,
  mongoDBConfig,
)
  .then(() => {
    createApp().listen(port, () => {
      console.log(chalk.blue(`http://localhost:${port}`));
    });
  })

  .catch(error => console.log(chalk.magenta(error)));
