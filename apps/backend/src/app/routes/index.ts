import { Router } from 'express';
import common from './common';
import course from './course';
import user from './user';
import auth from './auth';

const routes = Router();

routes.use('/', common);
routes.use('/course', course);
routes.use('/auth', auth);
routes.use('/user', user);
export default routes;
