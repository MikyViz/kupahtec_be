import express from 'express';
import donationController from '../controllers/donation-controller.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

export default class DonationRauter {
    constructor() {
        router.get('/', auth, donationController.getAll);
        router.get('/manager-contacts/:id', auth, donationController.getAllOfUser);
        router.get('/:id', auth,  donationController.getById);
        router.post('/', auth, donationController.create);
        router.put('/:id', auth,  donationController.update);
        router.delete('/:id', auth, donationController.delete);
    }

    getRouter() {
        return router;
    }
}

