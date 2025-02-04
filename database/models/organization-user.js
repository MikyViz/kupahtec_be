import { sequelize } from "../index.js";
import { DataTypes, literal } from "sequelize";
import User from './user-model.js';
import Organization from './organization-model.js';

const OrganizationUser = sequelize.define("OrganizationUser", {
    OrganizationId: { type: DataTypes.UUID, references: { model: Organization, key: 'Id' } },
    UserId: { type: DataTypes.UUID, references: { model: User, key: 'Id' } },
    // donationAmount: { type: DataTypes.FLOAT, allowNull: true } }, 
},
    { timestamps: false }
);
// Определение связей 
Organization.belongsToMany(User, {
    as: 'Users',
    through: OrganizationUser,
    foreignKey: 'OrganizationId',
    otherKey: 'UserId',
});
User.belongsToMany(Organization, {
    through: OrganizationUser,
    foreignKey: 'UserId',
    otherKey: 'OrganizationId',
    as: 'Organizations',
});

// OrganizationUser.belongsTo(Organization, { foreignKey: 'OrganizationId' });
// OrganizationUser.belongsTo(User, { foreignKey: 'UserId' });
// Organization.hasMany(OrganizationUser, { foreignKey: 'OrganizationId' });
// User.hasMany(OrganizationUser, { foreignKey: 'UserId' });

export default OrganizationUser