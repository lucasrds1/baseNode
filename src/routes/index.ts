import { Router } from 'express';

import * as HomeController from '../controllers/homeController';

const router = Router();

router.get('/', HomeController.home);
router.post('/saveUser', HomeController.saveUser);
router.get('/:id', HomeController.home);

export default router;