import express from 'express';
import userController from '../controllers/user-controller.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

export default class UserRouter {
    constructor() {
        router.get('/', auth, userController.getAll);
        router.get('/manager-contacts/:id', auth, userController.getAllByManager);
        router.get('/me', auth, userController.me);
        router.get('/:id', auth,  userController.getById);
        router.get('/assign-gabbay/:id', auth,  userController.getAssignedUsers);
        router.post('/', auth, userController.create);
        router.put('/:id', auth,  userController.update);
        router.delete('/:id', auth, userController.delete);
        router.post('/login', userController.login);
        router.post('/register', userController.register);
        router.post('/assign-gabbay', auth, userController.assignGabbay);
    }

    getRouter() {
        return router;
    }
}

