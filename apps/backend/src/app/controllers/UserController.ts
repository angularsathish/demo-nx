import { Request, Response } from 'express';
import { validate } from 'class-validator';
import { User } from '../entities/User';
import { RegisterUser } from '@demo-nx/interfaces';
import { success, error } from '../utils/response';
import { userRegister } from '../utils/login';
import { AppDataSource } from '../../main';

class UserController {
  static listAll = async (req: Request, res: Response) => {
    const newRepository = await AppDataSource.getRepository(User);
    // const role: string = res.locals.jwtPayload.role;
    try {
      const list = await newRepository
        .createQueryBuilder('User')
        // .where("User.role = :role", { role })
        .getMany();
      res.status(200).json(success('OK', { data: list }, res.statusCode));
    } catch (err) {
      res.status(500).json(error('Something went wrong.', res.statusCode));
    }
  };

  static getOneById = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id = res.locals.jwtPayload.userId;

    //Get the user from database
    const userRepository = await AppDataSource.getRepository(User);
    try {
      const user = await userRepository.findOneOrFail(id);
      res.send(user);
    } catch (error) {
      res.status(404).send('User not found');
    }
  };

  static newUser = async (req: Request, res: Response) => {
    //Get parameters from the body
    const userDetail: RegisterUser = req.body;
    const userResult = await userRegister(userDetail);
    if (userResult.status) {
      res
        .status(200)
        .json(success('OK', { data: 'User created' }, res.statusCode));
    } else {
      res.status(500).json(error(userResult.data, res.statusCode));
    }
  };

  static editUser = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id = Number(req.params.id);

    //Get values from the body
    const { username, role } = req.body;

    //Try to find user on database
    const userRepository = await AppDataSource.getRepository(User);
    let user;
    try {
      user = await userRepository.findOneByOrFail({
        id: Number(id),
      });
    } catch (error) {
      //If not found, send a 404 response
      res.status(404).send('User not found');
      return;
    }

    //Validate the new values on model
    user.username = username;
    user.role = role;
    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    //Try to safe, if fails, that means username already in use
    try {
      await userRepository.save(user);
    } catch (e) {
      res.status(409).send('username already in use');
      return;
    }
    //After all send a 204 (no content, but accepted) response
    res.status(204).send();
  };

  static deleteUser = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id = req.params.id;

    const userRepository = await AppDataSource.getRepository(User);
    try {
      const user = await userRepository.findOneByOrFail({
        id: Number(id),
      });
      if (user) {
        userRepository.delete(id);
        res.status(200).json(success('OK', { data: user }, res.statusCode));
        return;
      }
    } catch (error) {
      res.status(404).send('User not found');
      return;
    }
    userRepository.delete(id);

    //After all send a 204 (no content, but accepted) response
    res.status(204).send();
  };
}

export default UserController;
