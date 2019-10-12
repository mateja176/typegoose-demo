import * as passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtSecret } from '../config/jwt';

passport.use(
  new Strategy(
    {
      secretOrKey: jwtSecret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    ({ army }, done): void => {
      if (!army) {
        return done('Invalid payload, army not found');
      }
      return done(null, army);
    },
  ),
);

export const authenticate = passport.authenticate('jwt', { session: false });

