import { Router } from 'express';
const router = Router();

router.get('/', (req, res) => {
  res.send('welcome To School ');
});

router.get('/welcome', (req, res) => {
  res.send('welcome');
});

export default router;
