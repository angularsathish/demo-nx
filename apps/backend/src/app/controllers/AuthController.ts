import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { validate } from 'class-validator';
import { User } from '../entities/User';
import config from '../configs/config';
import { success, error } from '../utils/response';
import { AppDataSource } from '../../main';

class AuthController {
  static login = async (req: Request, res: Response) => {
    //Check if username and password are set
    const test = req.body;
    console.log('req.body', test);
    const { username, password } = req.body;
    if (!(username && password)) {
      res
        .status(500)
        .json(error('Please Fill the Login Details!.', res.statusCode));
      return;
    }

    //Get user from database
    const userRepository = await AppDataSource.getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail({
        where: [{ userName: username }],
      });
    } catch (err) {
      res.status(500).json(error('Invalid Login Details!.', res.statusCode));
      return;
    }

    //Check if encrypted password match
    if (!user.checkIfUnencryptedPasswordIsValid(password)) {
      res.status(200).send({ status: false, message: 'Incorrect Password!' });
      return;
    }

    //Sing JWT, valid for 1 hour
    const token = jwt.sign(
      { userId: user.id, username: user.userName, role: user.role },
      config.jwtSecret,
      { expiresIn: '3h' }
    );

    //Send the jwt in the response
    res.status(200).json(success('OK', { token: token }, res.statusCode));
  };

  static resetPassword = async (req: Request, res: Response) => {
    //Get ID from JWT
    const { username, password } = req.body;
    if (!(username && password)) {
      res
        .status(500)
        .json(error('Please Fill the Login Details!.', res.statusCode));
    }

    //Get user from the database
    const userRepository = await AppDataSource.getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail({
        where: [{ userName: username }],
      });
    } catch (error) {
      res.status(500).json(error('Invalid Login Details!.', res.statusCode));
      return;
    }

    //Check if old password matchs
    if (user.checkIfUnencryptedPasswordIsValid(password)) {
      res.status(500).json(error('Same Password Entered!.', res.statusCode));
      return;
    }

    user.password = password;

    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    //Hash the new password and save
    user.hashPassword();
    userRepository.save(user);
    res
      .status(200)
      .json(success('OK', { data: 'Password Reset!' }, res.statusCode));
  };

  static changePassword = async (req: Request, res: Response) => {
    //Get ID from JWT
    const id = res.locals.jwtPayload.userId;

    //Get parameters from the body
    const { oldPassword, newPassword } = req.body;
    if (!(oldPassword && newPassword)) {
      res.status(400).send();
    }

    //Get user from the database

    const userRepository = await AppDataSource.getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail(id);
    } catch (id) {
      res.status(401).send();
    }

    //Check if old password matchs
    if (!user.checkIfUnencryptedPasswordIsValid(oldPassword)) {
      res.status(401).send();
      return;
    }

    //Validate de model (password lenght)
    user.password = newPassword;
    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }
    //Hash the new password and save
    user.hashPassword();
    userRepository.save(user);

    res.status(204).send();
  };
}
export default AuthController;
