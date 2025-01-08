import { Organization } from "../database/index.js";

const getAll = async () => {
    try {
        const organizations = await Organization.findAll(); // SELECT * FROM Organizations; 
        if (organizations.length > 0) {
            return organizations;
        }
        return null;
    } catch (error) {
        throw new Error(error);
    }        
}

const getById = async (id) => {
    try {
        const organization = await Organization.findByPk(id);
        if (organization) {
            return organization;
        }
        return null;
    } catch (error) {
        throw new Error(error);
    }
}

const create = async (newOrganization) => {
    try {
        console.log('Creating organization with data:', newOrganization)
        const organization = await Organization.create(newOrganization);
        if (organization) {
            return organization;
        }
        return null;
    } catch (error) {
        throw new Error(error);
        console.log(error);
        
    }
}

const update = async (id, organizationUpdated) => {
    try {
        const organization = await Organization.getById(id);
        if (!organization) {
            return null;
        }
        organization.set(organizationUpdated);
        await organization.save();
        return organization;
    } catch (error) {
        throw new Error(error);
    }
}

const deleteById = async (id) => {
    try {
        const organization = await Organization.getById(id);

        if (!organization) {
            return null;
        }
        await organization.destroy();
        return organization;
    } catch (error) {
        throw new Error(error);
    }
}

const deleteAll = async () => {
    try {
        const organization = await Organization.destroy({
            where: {},
            truncate: false
        });
        if (organization) {
            return organization;
        }
        return null;
    } catch (error) {
        throw new Error(error);
    }destroy
}

const me = async (organization) => {
    try {
        if (organization) {
            return organization;
        }
        return null;
    } catch (error) {
        throw new Error(error);
    }
}


export default {
    getAll,
    getById,
    create,
    update,
    deleteById,
    deleteAll,
    me
}