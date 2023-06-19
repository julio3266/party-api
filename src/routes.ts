import { Router } from 'express';
import { UserController } from './Controller/UserController';
import { AuthController } from './Controller/AuthController';
import { AdminMiddlewares, AuthMiddlewares } from './Middlewares/auth';
import { GuestController } from './Controller/GuestController';

export const router = Router();

const usercontroller = new UserController();
const authController = new AuthController();
const guestcontroller = new GuestController();

//USER
router.post('/user/create', usercontroller.create);
router.get('/user/list', AdminMiddlewares, usercontroller.list);

//GUEST
router.post('/guest/create', AuthMiddlewares, guestcontroller.create);
router.get('/guest/list', AuthMiddlewares, guestcontroller.list);
router.put('/guest/update/:id', AuthMiddlewares, guestcontroller.update);
router.delete('/guest/delete/:id', AuthMiddlewares, guestcontroller.delete);

//JWT AUTH
router.post('/auth', authController.auth);
