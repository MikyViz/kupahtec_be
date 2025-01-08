import express from 'express';
import OrganizationController from '../controllers/organization-controller.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

export default class OrganizationRouter {
    constructor() {
        router.get('/', OrganizationController.getAll);
        router.get('/:id',  OrganizationController.getById);
        router.post('/',  OrganizationController.create);
        router.put('/:id',  OrganizationController.update);
        router.delete('/:id', OrganizationController.delete);
        router.post('/me', OrganizationController.me);
    }

    getRouter() {
        return router;
    }
}

