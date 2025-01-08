import { sequelize } from "../index.js";
import { DataTypes, literal } from "sequelize";
// import { UUIDV4 } from "uuid";
// import { v4 as uuidv4 } from "uuid";
import User from './user-model.js'

const Organization = sequelize.define("Organization", {
    // Model attributes are defined here
    Id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        autoIncrement: false,
        // defaultValue: () => uuidv4(),
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    
    createdAt: {
        type: DataTypes.DATE
        // allowNull defaults to true
    },
    updatedAt: {
        type: DataTypes.DATE
        // allowNull defaults to true
    }
}, {
    // Other model options go here
});

Organization.hasMany(User);
User.belongsTo(Organization);
// Organization.prototype.toJSON = function () {
//     const values = Object.assign({}, this.get());
//     delete values.password;
//     return values;
// }

export default Organization;