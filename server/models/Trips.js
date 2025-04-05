const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Users = require("./Users");

const Trips = sequelize.define("Trips", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    nome: { type: DataTypes.STRING, allowNull: false },
    creatore_id: { type: DataTypes.UUID, allowNull: false },
    data_inizio: { type: DataTypes.DATE, allowNull: false },
    data_fine: { type: DataTypes.DATE, allowNull: false },
    destinazione: { type: DataTypes.STRING, allowNull: false }
});

Trips.bekongsTo(Users, { foreignKey: "creatore_id" });

module.exports = Trips;