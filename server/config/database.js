const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(
    "PlanFriendsTrip", 
    "sandro",
    null,
    { host: "localhost",
      dialect: "postgres"}
);

module.exports = sequelize;