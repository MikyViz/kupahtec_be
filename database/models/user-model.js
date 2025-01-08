import { sequelize } from "../index.js";
import { DataTypes, literal } from "sequelize";
import jwt from "jsonwebtoken";
// import { UUIDV4 } from "uuid";
import { v4 as uuidv4 } from "uuid";
const User = sequelize.define("User", {
    // Model attributes are defined here
    Id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        autoIncrement: false,
        defaultValue: () => uuidv4(),
    },
    degree: {
        type: DataTypes.STRING
        // allowNull defaults to true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING
        // allowNull defaults to true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
        // allowNull defaults to true
    },
    country: {
        type: DataTypes.STRING
        // allowNull defaults to true
    },
    city: {
        type: DataTypes.STRING
        // allowNull defaults to true
    },
    neighborhood: {
        type: DataTypes.STRING
        // allowNull defaults to true
    },
    street: {
        type: DataTypes.STRING
        // allowNull defaults to true
    },
    houseNum: {
        type: DataTypes.STRING
        // allowNull defaults to true
    },
    apt: { 
        type: DataTypes.STRING
        // allowNull defaults to true
    },
    flore: {
        type: DataTypes.STRING
        // allowNull defaults to true
    },
    cellPhone: {
        type: DataTypes.STRING
        // allowNull defaults to true
    },
    homePhone: {
        type: DataTypes.STRING
        // allowNull defaults to true
    },
    password: {
        type: DataTypes.STRING,
        validate:{
            min: 6
        }
        // allowNull defaults to true
    },
    token: {
        type: DataTypes.STRING
        // allowNull defaults to true
    },
    // ogrId: {
    //     type: DataTypes.UUID
    //     // allowNull defaults to true
    // },
    isGabbay: {
        type: DataTypes.BOOLEAN
        // allowNull defaults to true
    },
    isManager: {
        type: DataTypes.BOOLEAN
        // allowNull defaults to true
    },
    isOwner: {
        type: DataTypes.BOOLEAN
        // allowNull defaults to true
    },
    instructions: {
        type: DataTypes.STRING
        // allowNull defaults to true
    },
    paingProg: {
        type: DataTypes.STRING
        // allowNull defaults to true
    },
    status: {
        type: DataTypes.ENUM("active", "inactive")
        // allowNull defaults to true
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

User.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    delete values.password;
    return values;
}

User.prototype.generateJWT = function () {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);
    return jwt.sign({
        email: this.email,
        id: this.id,
        exp: parseInt(expirationDate.getTime() / 1000, 10),
    }, process.env.JWT_SECRET);
}

User.prototype.toAuthJSON = function () {
    return {
        id: this.id,
        email: this.email,
        token: this.generateJWT(),
    };
};

export default User;