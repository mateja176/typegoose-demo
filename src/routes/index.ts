import * as express from 'express';
import * as HttpStatus from 'http-status-codes';
import * as jwt from 'jsonwebtoken';
import * as MongoQS from 'mongo-querystring';
import { authenticate } from '../auth';
import { jwtSecret } from '../config/jwt';
import { ArmyDto, ArmyModel } from '../entity/Army';
import { Request } from '../models';

const qs = new MongoQS();

export const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello World');
});

router.get('/sse', (req, res) => {
  res.write('Connected');
  res.write('Hello');
  req.on('close', () => {
    console.log('closed');
  });
});

router.post(
  '/join',
  async (req: Request<ArmyDto>, res, next) => {
    const { headers } = req;
    if (!Object.keys(headers).includes('authorization')) {
      const { body: armyDto } = req;

      try {
        const army = await ArmyModel.create({ ...armyDto, active: true });

        const activeArmies = await ArmyModel.find({ active: true });

        const token = jwt.sign({ army }, jwtSecret);
        return res.json({ token, armies: activeArmies });
      } catch (error) {
        res.status(HttpStatus.BAD_REQUEST);

        res.json({ error });
      }
    }

    return next();
  },
  authenticate,
  async (req, res) => {
    const activeArmies = await ArmyModel.find({ active: true });

    return res.json({ armies: activeArmies });
  },
);

router.get('/armies', authenticate, async (req, res) => {
  const query = qs.parse(req.query);

  const armies = await ArmyModel.find(query);

  res.json(armies);
});
