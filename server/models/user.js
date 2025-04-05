const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");  // Riferimento alla connessione
const Trip = require("./trip");

const User = sequelize.define("User", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    nome: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false }
});

// Associazione: Un utente può avere molti viaggi
User.hasMany(Trip, { foreignKey: "creatore_id" });

module.exports = User;
