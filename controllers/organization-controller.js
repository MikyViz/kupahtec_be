import organizationService from '../services/organization-service.js';

export default class organizationController {
    static async getAll(req, res) {
        try {
            const orgs = await organizationService.getAll();
            if (!orgs) {
                return res.status(404).json({msg: "orgs not found"});
            }
            return res.status(200).json(orgs);
        } catch (error) {
            return res.status(500).json({msg: error.message});
        }
    }

    static async getById(req, res) {
        try {
            const org = await organizationService.getById(req.params.id);
            if (!org) {
                return res.status(404).json({msg: "org not found"});
            }
            res.status(200).json(org);
        } catch (error) {
            res.status(500).json({msg: error.message});
        }
    }

    static async create(req, res) {
        try {
            const org = await organizationService.create(req.body);
            if (!org) {
                return res.status(404).json({msg: "Organization not found"});
            }
            res.status(200).json(org);
        } catch (error) {
            res.status(500).json({msg: error.message});
        }
    }

    static async update(req, res) {
        try {
            const org = await organizationService.update(req.params.id, req.body);
            if (!org) {
                return res.status(404).json({msg: "org not found"});
            }
            res.status(200).json(org);
        } catch (error) {
            res.status(500).json({msg: error.message});
        }
    }

    static async delete(req, res) {
        try {
            const org = await organizationService.deleteById(req.params.id);
            if (!org) {
                return res.status(404).json({msg: "org not found"});
            }
            res.status(200).json(org);
        } catch (error) {
            res.status(500).json({msg: error.message});
        }
    }


    static async me(req, res) {
        try {
            console.log(req.org);
            const org = await organizationService.me(req.org);
            if (!org) {
                return res.status(404).json({msg: "org not found"});
            }
            res.status(200).json(org);
        } catch (error) {
            res.status(500).json({msg: error.message});
        }
    }
}
