import userService from '../services/user-service.js';

export default class UserController {
    static async getAll(req, res) {
        try {
            const users = await userService.getAll();
            if (!users) {
                return res.status(404).json({msg: "Users not found"});
            }
            return res.status(200).json(users);
        } catch (error) {
            return res.status(500).json({msg: error.message});
        }
    }
    static async getAllByManager(req, res) {
        try {
            const orgId = req.params.id
            const users = await userService.getAllByManager(orgId);
            if (!users) {
                return res.status(404).json({msg: "Users not found"});
            }
            return res.status(200).json(users);
        } catch (error) {
            return res.status(500).json({msg: error.message});
        }
    }

    static async getById(req, res) {
        try {
            const user = await userService.getById(req.params.id);
            
            if (!user) {
                return res.status(404).json({msg: "User not found"});
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({msg: error.message});
        }
    }
    static async getAssignedUsers(req, res) {
        try {
            const users = await userService.getAssignedUsers(req.params.id);
            
            if (!users) {
                return res.status(404).json({msg: "😕Users not found"});
            }
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({msg: error.message});
        }
    }

    static async create(req, res) {
        try {
            const user = await userService.create(req.params.orgId);
            if (!user) {
                return res.status(404).json({msg: "User not found"});
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({msg: error.message});
        }
    }

    static async update(req, res) {
        try {
            const user = await userService.update(req.params.id, req.body);
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
            const user = await userService.deleteById(req.params.id);
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
            const user = await userService.login(req.body);
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
            const user = await userService.register(req.body);
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
            const user = await userService.me(req);
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
            const assign = await userService.assignGabbay(req);
    
            if (!assign) {
                return res.status(404).json({ message: 'User or Gabbay not found' });
            }
    
            res.status(200).json({ message: 'User assigned to Gabbay successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error assigning user to Gabbay', error });
        }
    };
};
