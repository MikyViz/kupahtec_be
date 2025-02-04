import { where } from "sequelize";
import { User, Organization, OrganizationUser, GabbayUser } from "../database/index.js";
import bcrypt from "bcrypt";

const getAll = async () => {
    try {
        const users = await User.findAll(); // SELECT * FROM users; 
        if (users.length > 0) {
            return users;
        }
        return null;
    } catch (error) {
        throw new Error(error);
    }
}
const getAllByManager = async (orgId) => {
    try {
        const organization = await Organization.findByPk(orgId, {
            include: [{
              model: User,
              as: 'Users',
              through: {
                attributes: [] // Исключаем промежуточные атрибуты
              }
            }]
        });

        if (organization.Users.length > 0) {
            return organization.Users;
        }
        return null;
    } catch (error) {
        throw new Error(error);
    }
}

const getById = async (id) => {
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

const getAssignedUsers = async (gabbayId) => {
    try {
        const assignedUsers = await User.findAll({
            include: [{
              model: User,
              as: 'Gabbaim',
              where: { Id: gabbayId },
              through: {
                attributes: []
              }
            }]
          });
        if (assignedUsers) {
            return assignedUsers;
        }
        return null;
    } catch (error) {
        throw new Error(error);
    }
}

const getOrgById = async (Id) => {
    try {
        const org = await OrganizationUser.findOne({ where: { UserId: Id }, });
        // console.log(org);

        if (org) {
            return org;
        }
        return null;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

const create = async (req) => {
    try {
        const org = await getOrgById(req.user.Id);
        if (req.body.isGabbay || req.body.isManager)
            req.body.password = req.body.cellPhone || "password";
        const user = await User.create(req.body);
        if (user) {
            const orgUserNode = await OrganizationUser.create({ OrganizationId: org.OrganizationId, UserId: user.Id });
            if (orgUserNode) {
                return user;
            }
        }
        return null;
    } catch (error) {
        console.log('🤧' + error);

        throw new Error(error);
    }
}

const update = async (id, userUpdated) => {
    try {
        const user = await getById(id);
        if (!user) {
            return null;
        }
        if (userUpdated.isGabbay || userUpdated.isManager)
            {
                if (user.password === null) {
                    userUpdated.password = userUpdated.cellPhone || "password";
                }
                
            }
        user.set(userUpdated);
        await user.save();
        return user;
    } catch (error) {
        throw new Error(error);
    }
}

const deleteById = async (id) => {
    try {
        const user = await getById(id);
        const orgUser = await getOrgById(id);

        if (!user) {
            return null;
        }
        await orgUser.destroy();
        await user.destroy();
        return user;
    } catch (error) {
        console.log(error);
        throw new Error(error);

    }
}

const deleteAll = async () => {
    try {
        const user = await User.destroy({
            where: {},
            truncate: false
        });
        if (user) {
            return user;
        }
        return null;
    } catch (error) {
        throw new Error(error);
    } destroy
}

const login = async ({ email, password }) => {
    try {
        const user = await User.findOne({
            where: {
                email,
            }
        }); // SELECT * FROM users WHERE email = email AND password = password;
        if (user && (user.isGabbay || user.isManager)) {
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                user.token = user.generateJWT();
                await user.save();
                console.log("login is OK👌");
                return user;
            }
        }
        return null;
    } catch (error) {
        throw new Error(error);
    }
}

const register = async (newUser) => {
    try {
        const user = await User.create(newUser);
        if (user) {
            user.token = user.generateJWT();
            await user.save();
            await OrganizationUser.create({ OrganizationId: newUser.OrganizationId, UserId: user.Id });
            return user;
        }
        return null;
    } catch (error) {
        throw new Error(error);
    }
}

const me = async (req) => {
    try {
        const orgId = await getOrgById(req.user.Id);
        // console.log('🫎' + orgId.OrganizationId + '🫎');

        if (req.user && orgId) {
            req.user.setDataValue('orgId', orgId.OrganizationId);
            return req.user;
        }
        return null;
    } catch (error) {
        throw new Error(error);
    }
}

const assignGabbay = async (req) => {
    try {
        const { gabbayId, userId } = req.body;
        const gabbay = await User.findByPk(gabbayId);
        const user = await User.findByPk(userId);

        if (gabbay && user) {
            const assign = await GabbayUser.create({ GabbayId: gabbayId, UserId: userId });
            if (assign) return assign
        }

        return null
    } catch (error) {
        console.log('🤦Error assigning user to Gabbay', error);
        res.status(500).json({ message: '🤦Error assigning user to Gabbay', error });
    }
};


export default {
    getAll,
    getAllByManager,
    getById,
    create,
    update,
    deleteById,
    deleteAll,
    login,
    register,
    me,
    assignGabbay,
    getAssignedUsers
}