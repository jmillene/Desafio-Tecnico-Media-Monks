const Sequelize = require("sequelize");
const database = require("/home/milene/Desafio-Tecnico-Monks-Media/app.js");

const NomeMarcaVeiculos = database.define(
  "NomeMarcaVeiculos",
  {
    id_marca: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    nome: {
      type: Sequelize.STRING,
    },
  },
  {
    tableName: "nome_marcas_veiculos",
    underscored: true,
    timestamps: false,
  }
);

module.exports = { NomeMarcaVeiculos, database };
