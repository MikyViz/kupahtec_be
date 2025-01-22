import { OrganizationUser } from "../database/index.js";

const getAll = async () => {
    try {
        const orgUsers = await OrganizationUser.findAll(); // SELECT * FROM OrganizationUsers; 
        if (orgUsers.length > 0) {
            return orgUsers;
        }
        return null;
    } catch (error) {
        throw new Error(error);
    }        
}
const getAllbyOrgId = async (id) => {
    try {
        const orgUsers = await OrganizationUser.findAll({
            where: {
                OrganizationId:id
            }
          }); // SELECT * FROM OrganizationUsers; 
        if (orgUsers.length > 0) {
            return orgUsers;
        }
        return null;
    } catch (error) {
        throw new Error(error);
    }        
}

const getById = async (id) => {
    try {
        const orgUsers = await OrganizationUser.findByPk(id);
        if (orgUsers) {
            return orgUsers;
        }
        return null;
    } catch (error) {
        throw new Error(error);
    }
}

const create = async (newOrgUsers) => {
    try {
        console.log('Creating OrganizationUser with data:', newOrgUsers)
        const orgUsers = await OrganizationUser.create(newOrgUsers);
        if (orgUsers) {
            return orgUsers;
        }
        return null;
    } catch (error) {
        console.log(error);
        throw new Error(error);
        
    }
}

const update = async (id, OrganizationUserUpdated) => {
    try {
        const orgUsers = await OrganizationUser.getById(id);
        if (!orgUsers) {
            return null;
        }
        OrganizationUser.set(OrganizationUserUpdated);
        await OrganizationUser.save();
        return orgUsers;
    } catch (error) {
        throw new Error(error);
    }
}

const deleteById = async (id) => {
    try {
        const orgUsers = await OrganizationUser.getById(id);

        if (!orgUsers) {
            return null;
        }
        await OrganizationUser.destroy();
        return orgUsers;
    } catch (error) {
        throw new Error(error);
    }
}

const deleteAll = async () => {
    try {
        const orgUsers = await OrganizationUser.destroy({
            where: {},
            truncate: false
        });
        if (orgUsers) {
            return orgUsers;
        }
        return null;
    } catch (error) {
        throw new Error(error);
    }destroy
}

const me = async (orgUsers) => {
    try {
        if (orgUsers) {
            return orgUsers;
        }
        return null;
    } catch (error) {
        throw new Error(error);
    }
}


export default {
    getAll,
    getById,
    getAllbyOrgId,
    create,
    update,
    deleteById,
    deleteAll,
    me
}