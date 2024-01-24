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
      foreignKey: "id_marca",
      as: "marca",
    });
  };
  return NomesMarcasVeiculos;
};

module.exports = nomesMarcasVeiculosSchema;
