"use strict";

const { Sequelize } = require('sequelize');
const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("dados_vendas_veiculos", {
      id_marca_: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      data: {
        type: Sequelize.DATEONLY,
      },
      vendas: {
        type: Sequelize.DECIMAL,
      },
      valor_do_veiculo: {
        type: Sequelize.INTEGER,
      },
      nome: {
        type: Sequelize.STRING(11),
      }
    }, {
      tableName: "dados_vendas_veiculos",
      underscored: true,
      timestamps: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("dados_vendas_veiculos");
  },
};
