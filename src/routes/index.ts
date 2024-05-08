import {Router} from 'express';

import { AuthRouter } from './Auth';

const routes = Router();

routes.use('/auth', AuthRouter);

export {routes};
