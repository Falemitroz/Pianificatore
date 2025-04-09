const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");
const Trip = require("./trip");

const Activity = sequelize.define("Activity", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    tripId: { type: DataTypes.INTEGER, allowNull: false},
    itinerario_id: { type: DataTypes.UUID, allowNull: false },
    nome: { type: DataTypes.STRING, allowNull: false },
    descrizione: { type: DataTypes.TEXT },
    data: { type: DataTypes.DATE, allowNull: false },
    luogo: { type: DataTypes.STRING, allowNull: false }
});

Activity.belongsTo(Trip, { foreignKey: "itinerario_id" });

module.exports = Activity;
