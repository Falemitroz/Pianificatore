const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Expenses = sequelize.define("Expenses", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    itinerario_id: { type: DataTypes.UUID, allowNull: false },
    importo: { type: DataTypes.FLOAT, allowNull: false },
    pagatore_id: { type: DataTypes.UUID, allowNull: false },
    categoria: { type: DataTypes.STRING, allowNull: true },
});

Expenses.belongsTo(Trips, { foreignKey: "itinerario_id" });
Expenses.belongsTo(User, { foreignKey: "pagatore_id" });

module.exports = Expenses;