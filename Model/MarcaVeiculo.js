const Sequelize = require('sequelize');
const database = require('/home/milene/Desafio-Tecnico-Monks-Media/app.js');

const MarcaVeiculo = database.define(
  "MarcaVeiculo",
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
    tableName: "marca_veiculo",
    underscored: true,
    timestamps: false,
  }
);

module.exports =  {MarcaVeiculo};
