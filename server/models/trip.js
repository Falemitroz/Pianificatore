const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");
const User = require("./user");

const Trip = sequelize.define("Trip", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    nome: { type: DataTypes.STRING, allowNull: false },
    creatore_id: { type: DataTypes.UUID, allowNull: false },
    data_inizio: { type: DataTypes.DATE, allowNull: false },
    data_fine: { type: DataTypes.DATE, allowNull: false },
    destinazione: { type: DataTypes.STRING, allowNull: false }
});

// Associazione: Un viaggio appartiene a un utente (il creatore)
Trip.belongsTo(User, { foreignKey: "creatore_id" });

module.exports = Trip;
