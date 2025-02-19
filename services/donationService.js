import { Donation, User, Organization } from "../database/index.js";

const getAll = async (orgId) => {
    try {
        const donats = await Donation.findAll({ where: { orgId: orgId } }); // SELECT * FROM users; 
        if (donats.length > 0) {
            return donats;
        }
        return null;
    } catch (error) {
        throw new Error(error);
    }
}

const getAllOfUser = async (userId, orgId) => {
    try {
        const user = await getUserById(userId);
        const org = await getAllbyOrgId(orgId);
        if (user && org) {
            const donats = await Donation.findAll({
                where: {
                    orgId: orgId,
                    userId: userId
                }
            })
            if (donats) {
                return donats
            }
            return null
        } else {
            return null
        }
    } catch (error) {
        console.log('💩' + error);
        throw new Error('💩' + error);
    }
}

const getById = async (id) => {
    try {
        const donat = await Donation.findByPk(id);
        if (donat) {
            return donat;
        }
        return null;
    } catch (error) {
        throw new Error(error);
    }
}

const getUserById = async (id) => {
    try {
        const user = await User.findByPk(id);
        if (user) {
            return user;
        }
        return null;
    } catch (error) {
        throw new Error(error);
    }
}

const getOrgById = async (id) => {
    try {
        const org = await Organization.findByPk(id);
        if (org) {
            return org;
        }
        return null;
    } catch (error) {
        throw new Error(error);
    }
}

const create = async (req) => {
    try {
        const org = await getOrgById(req.body.orgId);
        const user = await getUserById(req.body.userId);
        if (org && user) {
            const donat = await Donation.create(req.body);
            if (donat) return donat
            else return null
        } else return null
    } catch (error) {
        console.log('🤧' + error);
        throw new Error(error);
    }
}

const update = async (id, donatUpdated) => {
    try {
        const donat = await getById(id);
        if (!donat) {
            return null;
        }
        donat.set(donatUpdated);
        await donat.save();
        return donat;
    } catch (error) {
        throw new Error(error);
    }
}

const deleteById = async (id) => {
    try {
        const donat = await getById(id);
        if (!donat) {
            return null;
        }
        await donat.destroy();
        return donat;
    } catch (error) {
        console.log('☠️' + error);
        throw new Error(error);

    }
}

const deleteAll = async () => {
    try {
        const donat = await Donation.destroy({
            where: {},
            truncate: false
        });
        if (donat) {
            return donat;
        }
        return null;
    } catch (error) {
        console.log('🚽' + error);
        throw new Error(error);
    } destroy
}

export default {
    getAll,
    getAllOfUser,
    getById,
    getOrgById,
    getUserById,
    create,
    update,
    deleteById,
    deleteAll,
}