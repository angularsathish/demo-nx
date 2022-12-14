import { Router } from 'express';
import UserController from '../controllers/UserController';
import { checkJwt } from '../middlewares/checkJwt';
import { checkRole } from '../middlewares/checkRole';

const router = Router();

//Get all users
router.get('/', [checkJwt, checkRole(['ADMIN'])], UserController.listAll);

//Get all users
router.get('/all', UserController.listAll);

// Get one user
router.get('/single', [checkJwt], UserController.getOneById);

//Create a new user
router.post('/register', UserController.newUser);

//Edit one user
router.patch(
  '/:id([0-9]+)',
  [checkJwt, checkRole(['ADMIN'])],
  UserController.editUser
);

//Delete one user
router.delete(
  '/:id([0-9]+)',
  [checkJwt, checkRole(['ADMIN'])],
  UserController.deleteUser
);

export default router;
