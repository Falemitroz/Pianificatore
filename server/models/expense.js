const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");
const Trip = require("./trip");
const User = require("./user");

const Expense = sequelize.define("Expense", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    itinerario_id: { type: DataTypes.UUID, allowNull: false },
    importo: { type: DataTypes.FLOAT, allowNull: false },
    pagatore_id: { type: DataTypes.UUID, allowNull: false },
    categoria: { type: DataTypes.STRING, allowNull: true },
});

Expense.belongsTo(Trip, { foreignKey: "itinerario_id" });
Expense.belongsTo(User, { foreignKey: "pagatore_id" });

module.exports = Expense;
