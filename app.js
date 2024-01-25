const Sequelize = require('sequelize');

let sequelize;

try {
  sequelize = new Sequelize("bd_veiculos", "root", "root", {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
  });
  console.log("Conexão com o banco bem-sucedida");
} catch (error) {
  console.log("Não foi possível estabelecer uma conexão:", error);
}

module.exports = sequelize;