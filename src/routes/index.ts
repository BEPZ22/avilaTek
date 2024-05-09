import {Router} from 'express';

import { AuthRouter } from './Auth';
import { ProductRouter } from './Product';

const routes = Router();

routes.use('/auth', AuthRouter);
routes.use('/product', ProductRouter);

export {routes};
