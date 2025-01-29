import User from './user-model.js';
import { sequelize } from "../index.js";
import { DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";

const GabbayUser = sequelize.define('GabbayUser', {
    Id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            autoIncrement: false,
            defaultValue: () => uuidv4(),
        },
    UserId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    GabbayId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  });

  User.belongsToMany(User, {
    as: 'Gabbaim', // Габаи
    through: 'GabbayUser',
    foreignKey: 'UserId',
    otherKey: 'GabbayId',
  });
  
  User.belongsToMany(User, {
    as: 'Users', // Связанные пользователи
    through: 'GabbayUser',
    foreignKey: 'GabbayId',
    otherKey: 'UserId',
  });
  

  export default GabbayUser