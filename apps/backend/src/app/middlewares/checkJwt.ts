import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import config from '../configs/config';

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  //Get the jwt token from the head
  const token = <string>req.headers['auth'];
  let jwtPayload;

  //Try to validate the token and get data
  try {
    jwtPayload = <any>jwt.verify(token, config.jwtSecret);
    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    console.log('error', error);
    //If token is not valid, respond with 401 (unauthorized)
    res.status(401).send('token Expired');
    return;
  }

  //The token is valid for 1 hour
  //We want to send a new token on every request

  const { userId, username, role } = jwtPayload;
  const newToken = jwt.sign({ userId, username, role }, config.jwtSecret, {
    expiresIn: '1h',
  });
  res.setHeader('refreshToken', newToken);

  //Call the next middleware or controller
  next();
};
