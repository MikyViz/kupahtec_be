import { where } from 'sequelize';
import organizationUserService from '../services/organizationUser-service.js';

export default class organizationUserController {
    static async getAll(req, res) {
        try {
            const orgs = await organizationUserService.getAll();
            if (!orgs) {
                return res.status(404).json({msg: "orgs not found"});
            }
            return res.status(200).json(orgs);
        } catch (error) {
            return res.status(500).json({msg: error.message});
        }
    }

    static async geAllByOrgId(req, res) {
        try {
            const orgMembers = await organizationUserService.getAllbyOrgId(req.params.id);
            // const org = await organizationUserService.getById(req.params.id);
            if (!orgMembers) {
                return res.status(404).json({msg: "org not found"});
            }
            res.status(200).json(orgMembers);
        } catch (error) {
            res.status(500).json({msg: error.message});
        }
    }

    static async create(req, res) {
        try {
            const org = await organizationUserService.create(req.body);
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
            const org = await organizationUserService.update(req.params.id, req.body);
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
            const org = await organizationUserService.deleteById(req.params.id);
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
            const org = await organizationUserService.me(req.org);
            if (!org) {
                return res.status(404).json({msg: "org not found"});
            }
            res.status(200).json(org);
        } catch (error) {
            res.status(500).json({msg: error.message});
        }
    }
}
