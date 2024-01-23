const Sequelize = require("sequelize");
const database = require("/home/milene/Desafio-Tecnico-Monks-Media/app.js");
const DadosVendasVeiculos = require("/home/milene/Desafio-Tecnico-Monks-Media/Model/DadosVendasVeiculos.js");

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

  NomesMarcasVeiculos.associate = (models) => {
    NomesMarcasVeiculos.hasMany(models.DadosVendasVeiculos, {
      foreignKey: "id_marca_",
      as: "marca",
    });
  };
  return NomesMarcasVeiculos;
};

module.exports = nomesMarcasVeiculosSchema;
