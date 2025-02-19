import donationService from '../services/donationService.js';

export default class DonationController {
    static async getAll(req, res) {
        try {
            const donats = await donationService.getAll(req.body.orgId);
            if (!donats) {
                return res.status(404).json({msg: "Donations not found"});
            }
            return res.status(200).json(donats);
        } catch (error) {
            return res.status(500).json({msg: error.message});
        }
    }
    static async getAllOfUser(req, res) {
        try {
            const {userId, orgId} = req.params
            const donats = await donationService.getAllOfUser(userId, orgId);
            if (!donats) {
                return res.status(404).json({msg: "Users not found"});
            }
            return res.status(200).json(users);
        } catch (error) {
            return res.status(500).json({msg: error.message});
        }
    }

    static async getById(req, res) {
        try {
            const donat = await donationService.getById(req.params.id);
            
            if (!donat) {
                return res.status(404).json({msg: "Donation not found"});
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({msg: error.message});
        }
    }

    static async create(req, res) {
        try {
            // const {amount, currency, userId, orgId} = req.body;
            const donat = await donationService.create(req, res);
            if (!donat) {
                return res.status(404).json({msg: "Donatios not found"});
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({msg: error.message});
        }
    }

    static async update(req, res) {
        try {
            const user = await donationService.update(req.params.id, req.body);
            if (!user) {
                return res.status(404).json({msg: "User not found"});
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({msg: error.message});
        }
    }

    static async delete(req, res) {
        try {
            const user = await donationService.deleteById(req.params.id);
            if (!user) {
                return res.status(404).json({msg: "User not found"});
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({msg: error.message});
        }
    }

    static async login(req, res) {
        try {
            const user = await donationService.login(req.body);
            if (!user) {
                return res.status(404).json({msg: "User not found"});
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({msg: error.message});
        }
    }

    static async register(req, res) {
        try {
            const user = await donationService.register(req.body);
            if (!user) {
                return res.status(404).json({msg: "User not found"});
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({msg: error.message});
        }
    }

    static async me(req, res) {
        try {
            const user = await donationService.me(req);
            if (!user) {
                return res.status(404).json({msg: "User not found"});
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({msg: error.message});
        }
    }
    static async assignGabbay (req, res) {
        try {
            const assign = await donationService.assignGabbay(req);
    
            if (!assign) {
                return res.status(404).json({ message: 'User or Gabbay not found' });
            }
    
            res.status(200).json({ message: 'User assigned to Gabbay successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error assigning user to Gabbay', error });
        }
    };
};
