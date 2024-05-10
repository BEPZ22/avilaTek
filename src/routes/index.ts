import {Router} from 'express';

import { AuthRouter } from './Auth';
import { ProductRouter } from './Product';
import { RetailRouter } from './Retail';

const routes = Router();

routes.use('/auth', AuthRouter);
routes.use('/product', ProductRouter);
routes.use('/retail', RetailRouter);

export {routes};
