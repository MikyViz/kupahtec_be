import express from 'express';
import OrganizationUserController from '../controllers/organizationUser-controller.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

export default class OrganizationUserRouter {
    constructor() {
        router.get('/', auth, OrganizationUserController.getAll);
        router.get('/:id', auth, OrganizationUserController.geAllByOrgId);
        router.post('/', auth, OrganizationUserController.create);
        router.put('/:id', auth, OrganizationUserController.update);
        router.delete('/:id', auth,OrganizationUserController.delete);
        router.post('/me', auth,OrganizationUserController.me);
    }

    getRouter() {
        return router;
    }
}

