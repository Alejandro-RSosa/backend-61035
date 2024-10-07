import { Router } from 'express';
import { checkAuth } from '../middlewares/authJwt.js';
import UserController from '../controllers/user.controllers.js';
import { checkAdmin } from '../middlewares/checkAdmin.js';
const controller = new UserController();

const router = Router();

router.post('/register', controller.register);

router.post('/login', controller.login);

router.get('/profile', [checkAuth], controller.profile);

router.get('/', [checkAuth, checkAdmin], controller.getAll);

router.put('/delete', [checkAuth, checkAdmin], controller.checkUsersLastConnection);

// router.get('/oauth2/redirect/accounts.google.com', passport.authenticate('google', { assignProperty: 'user' }), googleResponse);

export default router;
