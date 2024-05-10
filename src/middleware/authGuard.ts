import { NextFunction, Request, Response } from "express";

import jsonwebtoken from 'jsonwebtoken';

import { jwtSecret } from "../env";

interface DecodedToken {
    userId: string
};

export async function authGuard(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void | Response> {
    const bearerToken = req.headers.authorization || '';

    if (bearerToken === '') {
        return res.status(403).json({
            timestamp: new Date().getTime(),
            error: 'Token is invalid'
        });
    }

    let accessToken: string;
    try {
        accessToken = bearerToken.split(' ')[1];
    } catch (err) {
        return res.status(403).json({
            timestamp: new Date().getTime(),
            error: 'Token is invalid'
        });
    }

    let decodedToken: DecodedToken;
    try {
        decodedToken = jsonwebtoken.verify(
            accessToken,
            jwtSecret
        ) as DecodedToken;
    } catch (e) {
        let message = `Token has invalid signatured or has been expired`;
        return res.status(403).json({
            timestamp: new Date().getTime(),
            error: message
        });        
    }

    req.body.userId = decodedToken.userId;
    req.body.token = accessToken;
    return next();
}