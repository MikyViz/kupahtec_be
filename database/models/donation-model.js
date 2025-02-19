import { User, Organization } from "../index.js";
import { sequelize } from "../index.js";
import { DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";

const Donation = sequelize.define("Donation", {
    Id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        autoIncrement: false,
        defaultValue: () => uuidv4(),
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    currency: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '₪',
    },
}, {
    timestamps: true,
});

Donation.belongsTo(User, { foreignKey: 'userId' });
Donation.belongsTo(Organization, { foreignKey: 'organizationId' });

export default Donation;