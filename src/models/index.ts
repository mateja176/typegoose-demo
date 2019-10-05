import { Request as ExpressRequest } from 'express';
import { Army, ArmyDto } from '../entity/Army';

export interface Request<
  Body extends ArmyDto,
  User extends Army | undefined = undefined
> extends ExpressRequest {
  body: Body;
  user: User;
}
