const { Sequelize } = require("sequelize");
const dbConfig = require("../config/db.config.js");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: "mysql",
  logging: false,
});

//connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Successfully connected to the database.");
  })
  .catch((err) => {
    console.error("Error connecting to database:", err.message);
  });

module.exports = sequelize;
