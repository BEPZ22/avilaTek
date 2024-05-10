import { 
	Request, 
	Response, 
	Router 
} from 'express';

import { authGuard } from '../middleware';

import {
    RegisterController,
    registerUseCase
} from '../modules/authentication/useCases/register';

import {
    LoginController,
    loginUseCase
} from '../modules/authentication/useCases/login';

import {
    RefreshTokenController,
    refreshTokenUseCase
} from '../modules/authentication/useCases/refreshToken';

export const AuthRouter = Router();


AuthRouter.post(
    '/register',
	(req: Request, res: Response) => {
        const controller = new RegisterController(registerUseCase);
        controller.execute(req, res);
      }
);


AuthRouter.post(
    '/login',
	(req: Request, res: Response) => {
        const controller = new LoginController(loginUseCase);
        controller.execute(req, res);
      }
);


AuthRouter.post(
    '/refresh/session',
    authGuard,
	(req: Request, res: Response) => {
        const controller = new RefreshTokenController(refreshTokenUseCase);
        controller.execute(req, res);
      }
);