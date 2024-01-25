const Sequelize = require("sequelize");
const database = require("/home/milene/Desafio-Tecnico-Monks-Media/app.js");

const nomesMarcasVeiculosSchema = (sequelize, DataTypes) => {
  const NomesMarcasVeiculos = database.define(
    "NomesMarcasVeiculos",
    {
      id_marca: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      marca: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "nome_marcas_veiculos",
      underscored: true,
      timestamps: false,
    }
  );
  return NomesMarcasVeiculos;
};

module.exports = nomesMarcasVeiculosSchema;
