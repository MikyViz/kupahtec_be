import { where } from "sequelize";
import { User, OrganizationUser } from "../database/index.js";
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
const getOrgById = async (Id) => {
    try {
        const org = await OrganizationUser.findOne({where: {UserId: Id},});
        console.log(org);
        
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
        const orgId = await getOrgById(req.user.Id);
        const user = await User.create(req.body);
        if (user) {
            const orgUserNode = await OrganizationUser.create({ OrganizationId: orgId.OrganizationId, UserId: user.Id});
            console.log(orgUserNode);
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

        if (!user) {
            return null;
        }
        await user.destroy();
        return user;
    } catch (error) {
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
    }destroy
}

const login = async ({email, password}) => {
    try {
        const user = await User.findOne({
            where: {
                email,
            }
        }); // SELECT * FROM users WHERE email = email AND password = password;
        if (user) {
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
            await OrganizationUser.create({ OrganizationId: newUser.OrganizationId, UserId: user.Id});
            return user;
        }
        return null;
    } catch (error) {
        throw new Error(error);
    }
}

const me = async (user) => {    
    try {
        if (user) {
            return user;
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
    login,
    register,
    me
}